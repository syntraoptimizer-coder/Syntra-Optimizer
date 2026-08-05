import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

let b2Cache: {
  authorizationToken: string
  apiUrl: string
  downloadUrl: string
  expiresAt: number
} | null = null

async function getB2Token() {
  if (b2Cache && Date.now() < b2Cache.expiresAt) return b2Cache

  const keyId = process.env.B2_KEY_ID
  const appKey = process.env.B2_APPLICATION_KEY

  if (!keyId || !appKey) throw new Error('B2 credentials missing')

  const credentials = Buffer.from(`${keyId}:${appKey}`).toString('base64')

  const res = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    headers: { Authorization: `Basic ${credentials}` },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`B2 auth failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  const apiUrl = data.apiInfo?.storageApi?.apiUrl ?? data.apiUrl
  const downloadUrl = data.downloadUrl

  if (!apiUrl || !downloadUrl) throw new Error(`B2 missing fields: ${JSON.stringify(data)}`)

  b2Cache = {
    authorizationToken: data.authorizationToken,
    apiUrl,
    downloadUrl,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000,
  }

  return b2Cache
}

export async function GET(_req: NextRequest) {
  try {
    console.log('[download] step 1: get supabase user')
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) throw new Error(`Supabase getUser error: ${userError.message}`)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    console.log('[download] step 2: check role for', user.id)
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()

    if (roleError) throw new Error(`Role query error: ${roleError.message}`)

    const role = roleData?.role || 'free'
    console.log('[download] role:', role)

    if (role !== 'premium' && role !== 'service') {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    console.log('[download] step 3: get B2 token')
    const { authorizationToken, apiUrl, downloadUrl } = await getB2Token()

    const bucketId = process.env.B2_BUCKET_ID
    const bucketName = process.env.B2_BUCKET_NAME
    const filePath = process.env.B2_FILE_PATH || 'Syntra Optimizer Setup 1.0.0.exe'

    if (!bucketId || !bucketName) throw new Error('B2 bucket config missing')

    console.log('[download] step 4: get download auth, file:', filePath)
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
      const text = await authRes.text()
      throw new Error(`B2 download auth failed: ${authRes.status} ${text}`)
    }

    const { authorizationToken: dlToken } = await authRes.json()
    const encodedPath = filePath.split('/').map(encodeURIComponent).join('/')
    const signedUrl = `${downloadUrl}/file/${bucketName}/${encodedPath}?Authorization=${dlToken}`

    console.log('[download] step 5: redirecting')
    return NextResponse.redirect(signedUrl, { status: 302 })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[download] ERROR:', msg)
    return NextResponse.json({ error: 'Download unavailable', detail: msg }, { status: 500 })
  }
}
