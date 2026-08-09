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

  if (!res.ok) throw new Error('B2 auth failed')

  const data = await res.json()
  const apiUrl = data.apiInfo?.storageApi?.apiUrl
  const downloadUrl = data.apiInfo?.storageApi?.downloadUrl
  if (!apiUrl || !downloadUrl) throw new Error('B2 missing fields')

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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role, service_count')
      .eq('user_id', user.id)
      .maybeSingle()

    const role = roleData?.role || 'free'
    const serviceCount = roleData?.service_count || 0

    if (role !== 'premium' && serviceCount === 0) {
      return NextResponse.json({ error: 'Premium required' }, { status: 403 })
    }

    const { authorizationToken, downloadUrl } = await getB2Token()

    const bucketName = process.env.B2_BUCKET_NAME
    const filePath = process.env.B2_FILE_PATH || 'Syntra Optimizer Setup 1.0.0.exe'

    if (!bucketName) throw new Error('B2 bucket config missing')

    const encodedPath = filePath.split('/').map(encodeURIComponent).join('/')
    const fileRes = await fetch(
      `${downloadUrl}/file/${bucketName}/${encodedPath}`,
      { headers: { Authorization: authorizationToken } }
    )

    if (!fileRes.ok) throw new Error(`B2 fetch failed: ${fileRes.status}`)

    // Use the original filename from B2 headers
    const b2ContentDisposition = fileRes.headers.get('Content-Disposition')
    const b2FileName = filePath.split('/').pop() || 'SyntraOptimizer-Setup.exe'
    const contentDisposition = b2ContentDisposition || `attachment; filename="${b2FileName}"`

    return new Response(fileRes.body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': contentDisposition,
        'Content-Length': fileRes.headers.get('Content-Length') || '',
      },
    })

  } catch (err) {
    console.error('[download]', err)
    return NextResponse.json({ error: 'Download unavailable', detail: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
