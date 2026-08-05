import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ── B2 token cache (valid 24h, reused across requests) ──────────
let b2Cache: {
  authorizationToken: string
  apiUrl: string
  downloadUrl: string
  expiresAt: number
} | null = null

async function getB2Token() {
  // Return cached token if still valid (with 5min buffer)
  if (b2Cache && Date.now() < b2Cache.expiresAt) {
    return b2Cache
  }

  const keyId = process.env.B2_KEY_ID!
  const appKey = process.env.B2_APPLICATION_KEY!
  const credentials = Buffer.from(`${keyId}:${appKey}`).toString('base64')

  const res = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    headers: { Authorization: `Basic ${credentials}` },
  })

  if (!res.ok) {
    throw new Error('B2 auth failed')
  }

  const data = await res.json()

  b2Cache = {
    authorizationToken: data.authorizationToken,
    apiUrl: data.apiInfo.storageApi.apiUrl,
    downloadUrl: data.downloadUrl,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000, // 23h
  }

  return b2Cache
}

export async function GET(_req: NextRequest) {
  try {
    // ── 1. Verify Supabase session ──────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── 2. Check premium role ───────────────────────────────────
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()

    const role = roleData?.role || 'free'

    if (role !== 'premium' && role !== 'service') {
      return NextResponse.json(
        { error: 'Premium required. Upgrade your plan to download Syntra Optimizer.' },
        { status: 403 }
      )
    }

    // ── 3. Get B2 token (cached) ────────────────────────────────
    const { authorizationToken, apiUrl, downloadUrl } = await getB2Token()

    const bucketId = process.env.B2_BUCKET_ID!
    const bucketName = process.env.B2_BUCKET_NAME!
    const filePath = process.env.B2_FILE_PATH || 'Syntra Optimizer Setup 1.0.0.exe'

    // ── 4. Get download authorization (signed URL, 60s) ─────────
    const authRes = await fetch(`${apiUrl}/b2api/v3/b2_get_download_authorization`, {
      method: 'POST',
      headers: {
        Authorization: authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bucketId,
        fileNamePrefix: filePath,
        validDurationInSeconds: 60,
        b2ContentDisposition: 'attachment; filename="SyntraOptimizer-Setup.exe"',
      }),
    })

    if (!authRes.ok) {
      console.error('B2 download auth failed:', await authRes.text())
      return NextResponse.json({ error: 'Download unavailable' }, { status: 500 })
    }

    const { authorizationToken: dlToken } = await authRes.json()

    // ── 5. Build signed URL and redirect ───────────────────────
    const encodedPath = encodeURIComponent(filePath)
    const signedUrl = `${downloadUrl}/file/${bucketName}/${encodedPath}?Authorization=${dlToken}`

    return NextResponse.redirect(signedUrl, { status: 302 })

  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Download unavailable' }, { status: 500 })
  }
}
