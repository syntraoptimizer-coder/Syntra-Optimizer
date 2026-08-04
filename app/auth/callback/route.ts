import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data?.user) {
      const user = data.user

      // Ensure user_roles row exists — preserve any existing paid role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!existingRole) {
        // New row only if none exists — default to free
        await supabase.from('user_roles').insert({
          user_id: user.id,
          role: 'free',
          updated_at: new Date().toISOString(),
        })

        // Mark as new user so dashboard can show welcome message
        const redirectUrl = new URL(`${origin}${next}`)
        redirectUrl.searchParams.set('welcome', '1')

        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        if (!isLocalEnv && forwardedHost) {
          redirectUrl.hostname = forwardedHost
          redirectUrl.protocol = 'https:'
        }
        return NextResponse.redirect(redirectUrl.toString())
      }
      // If row exists, never downgrade — leave role as-is

      // Password recovery redirect
      if (data?.user?.recovery_sent_at || searchParams.get('type') === 'recovery') {
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        if (!isLocalEnv && forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}/reset-password`)
        }
        return NextResponse.redirect(`${origin}/reset-password`)
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (!isLocalEnv && forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
