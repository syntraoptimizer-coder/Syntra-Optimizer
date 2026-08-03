import Link from 'next/link'
import { ArrowLeft, Gauge, ShieldCheck, Zap } from 'lucide-react'
import { Logo } from '@/components/site/logo'

const HIGHLIGHTS = [
  { icon: Zap, text: 'One-click optimization for Windows 10 & 11' },
  { icon: Gauge, text: 'Average system score jump from 68 to 92' },
  { icon: ShieldCheck, text: 'Safe, fully reversible changes' },
]

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-border bg-card/40 lg:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_20%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]"
        />
        <div className="relative flex h-full flex-col justify-center px-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Syntra Optimizer
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight">
            Optimize your PC. <span className="text-primary">Instantly.</span>
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Join 100+ gamers and creators running faster, cleaner machines.
          </p>
          <ul className="mt-10 space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4.5" />
                </span>
                <span className="text-sm text-foreground/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
