import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Download, Gauge, PackageCheck, User, Crown, Wrench } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Logo } from '@/components/site/logo'
import { SignOutButton } from '@/components/dashboard/sign-out'
import { UpdateTimeline } from '@/components/dashboard/update-timeline'
import { AccountSettings } from '@/components/dashboard/account-settings'
import { WelcomeToast } from '@/components/dashboard/welcome-toast'

export const metadata = {
  title: 'Dashboard — Syntra Optimizer',
  description: 'Your Syntra Optimizer dashboard.',
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles').select('id, full_name, email, avatar_url')
    .eq('id', user.id).maybeSingle()

  const { data: userRole } = await supabase
    .from('user_roles').select('role, has_service').eq('user_id', user.id).maybeSingle()

  const { data: updates } = await supabase
    .from('updates').select('id, version, title, body, category, published_at')
    .order('published_at', { ascending: false }).limit(10)

  const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]
  const email = profile?.email || user.email
  const role = userRole?.role || 'free'
  const hasService = userRole?.has_service || false
  const initials = name.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()

  const roleBadge = () => (
    <div className="flex items-center gap-2">
      {role === 'premium' && (
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.8)' }}>
          <Crown className="size-3" /> Premium
        </div>
      )}
      {hasService && (
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: 'rgba(88,101,242,0.12)', border: '1px solid rgba(88,101,242,0.25)', color: 'rgba(180,185,255,0.9)' }}>
          <Wrench className="size-3" /> Service
        </div>
      )}
      {role === 'free' && !hasService && (
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.38)' }}>
          Free
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-dvh" style={{ background: '#080808' }}>
      <WelcomeToast name={name.split(' ')[0]} />
      {/* Glow halo top */}
      <div aria-hidden="true" style={{
        position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 44%, transparent 74%)',
        filter: 'blur(56px)', mixBlendMode: 'screen',
      }} />

      {/* Header */}
      <header
        className="sticky top-0 z-20 flex justify-center px-4 pt-4 pb-2"
        style={{ backdropFilter: 'blur(0px)' }}
      >
        <div className="flex h-13 w-full max-w-5xl items-center justify-between rounded-2xl px-4"
          style={{ background: 'rgba(8,8,8,0.7)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}>
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-sm sm:block" style={{ color: 'rgba(255,255,255,0.25)' }}>/ Dashboard</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/"
              className="inline-flex h-8 items-center rounded-full px-3 text-sm transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              Home
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Welcome */}
        <div className="flex flex-col gap-2">
          <h1 className="tracking-tight" style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.024em',
            color: 'transparent',
            backgroundImage: 'radial-gradient(110% 130% at 50% 80%, #ffffff 0%, rgba(255,255,255,0.82) 32%, rgba(190,190,190,0.65) 72%, rgba(130,130,130,0.5) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
          }}>
            Welcome back, {name.split(' ')[0]}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>
            Your system is up to date. Here's what's new in Syntra Optimizer.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Updates timeline */}
          <section className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="grid size-8 place-items-center rounded-lg"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
                <PackageCheck className="size-4" />
              </div>
              <h2 className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>Syntra Optimizer Updates</h2>
            </div>
            <UpdateTimeline updates={updates ?? []} />
          </section>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Download */}
            <section className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="grid size-8 place-items-center rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
                  <Download className="size-4" />
                </div>
                <h2 className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>Download</h2>
              </div>
              {role === 'free' ? (
                <div className="text-center">
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>
                    Upgrade to Premium to download Syntra Optimizer
                  </p>
                  <Link href="/checkout?plan=premium"
                    className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                    style={{ background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 24px -6px rgba(255,255,255,0.4)' }}>
                    <Crown className="size-4" /> Upgrade to Premium
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>
                    Get the latest Syntra Optimizer for Windows 10/11.
                  </p>
                  <a href="/api/download"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
                    style={{ background: 'rgba(255,255,255,0.92)', color: '#080808', boxShadow: '0 0 24px -6px rgba(255,255,255,0.4)' }}>
                    <Download className="size-4" /> Download v1.3.0
                  </a>
                  <p className="mt-2 text-center text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    v1.3.0 — Windows 10/11 · 4.8 MB
                  </p>
                </>
              )}
            </section>

            {/* System score */}
            <section className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="grid size-8 place-items-center rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
                  <Gauge className="size-4" />
                </div>
                <h2 className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>System score</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative grid size-16 place-items-center rounded-full"
                  style={{ border: '3px solid rgba(255,255,255,0.15)', boxShadow: '0 0 24px -8px rgba(255,255,255,0.3)' }}>
                  <span className="text-xl font-light" style={{ color: '#ffffff' }}>92</span>
                </div>
                <div className="text-sm">
                  <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <span className="font-medium">+24 pts</span>{' '}
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>since last scan</span>
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                    Better than 87% of users
                  </p>
                </div>
              </div>
            </section>

            {/* Profile */}
            <section className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="grid size-8 place-items-center rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
                  <User className="size-4" />
                </div>
                <h2 className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>Your profile</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-medium"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
                  {initials || 'SY'}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{name}</p>
                  <p className="truncate text-xs" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>{email}</p>
                </div>
              </div>
              <div className="mt-3">{roleBadge()}</div>
              <dl className="mt-4 space-y-2 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem' }}>
                <div className="flex items-center justify-between">
                  <dt style={{ color: 'rgba(255,255,255,0.38)' }}>Member since</dt>
                  <dd style={{ color: 'rgba(255,255,255,0.7)' }}>{formatDate(user.created_at)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt style={{ color: 'rgba(255,255,255,0.38)' }}>Email verified</dt>
                  <dd style={{ color: user.email_confirmed_at ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
                    {user.email_confirmed_at ? 'Yes' : 'No'}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Account settings — change password + link discord */}
            <AccountSettings />
          </div>
        </div>
      </main>
    </div>
  )
}
