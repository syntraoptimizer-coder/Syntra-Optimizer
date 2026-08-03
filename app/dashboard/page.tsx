import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Download, FileCode2, Gauge, PackageCheck, User, Crown, Wrench } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Logo } from '@/components/site/logo'
import { SignOutButton } from '@/components/dashboard/sign-out'
import { UpdateTimeline } from '@/components/dashboard/update-timeline'

export const metadata = {
  title: 'Dashboard — Syntra Optimizer',
  description: 'Your Syntra Optimizer dashboard: updates, download and profile.',
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, email, avatar_url')
    .eq('id', user.id)
    .maybeSingle()

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  const { data: updates } = await supabase
    .from('updates')
    .select('id, version, title, body, category, published_at')
    .order('published_at', { ascending: false })
    .limit(10)

  const name = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]
  const email = profile?.email || user.email
  const role = userRole?.role || 'free'
  const initials = name
    .split(' ')
    .map((part: string) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const getRoleBadge = () => {
    switch (role) {
      case 'premium':
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Crown className="size-3" />
            Premium
          </div>
        )
      case 'service':
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
            <Wrench className="size-3" />
            Service
          </div>
        )
      default:
        return (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Free
          </div>
        )
    }
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-sm text-muted-foreground sm:block">/ Dashboard</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Home
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, <span className="text-primary">{name.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground">
            Your system is up to date. Here&apos;s what&apos;s new in Syntra Optimizer.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <PackageCheck className="size-5 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight">Mini updates</h2>
            </div>
            <UpdateTimeline updates={updates ?? []} />
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2">
                <Download className="size-5 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Download</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Get the latest Syntra Optimizer for Windows 10/11 and boost your PC in one click.
              </p>
              <a
                href="/downloads/syntra-optimizer-setup.exe"
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="size-4" />
                Download v1.3.0
              </a>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                v1.3.0 — Windows 10/11 · 4.8 MB
              </p>
            </section>

            <section className="rounded-xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2">
                <Gauge className="size-5 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">System score</h2>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-full border-4 border-primary/30">
                  <span className="text-xl font-semibold text-primary">92</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">+24 pts</span> since last scan
                  </p>
                  <p className="mt-1">Better than 87% of users</p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2">
                <User className="size-5 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Your profile</h2>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {initials || 'SY'}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{name}</p>
                  <p className="truncate text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
              <div className="mt-3">{getRoleBadge()}</div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Member since</dt>
                  <dd>{formatDate(user.created_at)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email verified</dt>
                  <dd className={user.email_confirmed_at ? 'text-primary' : 'text-muted-foreground'}>
                    {user.email_confirmed_at ? 'Yes' : 'No'}
                  </dd>
                </div>
              </dl>
            </section>

            <p className="flex items-start gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
              <FileCode2 className="mt-0.5 size-4 shrink-0" />
              Updates are fetched live from your Supabase <code className="font-mono">updates</code>{' '}
              table.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
