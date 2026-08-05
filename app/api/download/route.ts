import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// URL where the actual .exe is hosted (GitHub Releases or any CDN)
// Keep this private — it's never exposed to the client
const DOWNLOAD_URL = process.env.DOWNLOAD_SECRET_URL!

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Must be logged in
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Must have premium or service role
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  const role = roleData?.role || 'free'

  if (role !== 'premium' && role !== 'service') {
    return NextResponse.json({ error: 'Premium required' }, { status: 403 })
  }

  if (!DOWNLOAD_URL) {
    return NextResponse.json({ error: 'Download not configured' }, { status: 500 })
  }

  // Redirect to the real file — URL stays hidden from the client
  return NextResponse.redirect(DOWNLOAD_URL)
}
