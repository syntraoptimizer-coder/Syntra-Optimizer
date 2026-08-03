import Link from 'next/link'
import { Download, ShieldCheck, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Now optimizing Windows 10 &amp; 11
          </span>
          <h1 className="mt-6 text-pretty text-4xl font-semibold tracking-tight sm:text-6xl">
            Optimize your PC. <span className="text-primary">Instantly.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Syntra scans, fixes, and fine-tunes your Windows machine in one click — debloating,
            tuning your network, and squeezing every last frame out of your games.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/checkout?plan=premium" className={buttonVariants({ size: 'lg', className: 'h-11 px-6 text-base' })}>
              <Download className="size-4" />
              Get Started
            </Link>
            <a href="#pricing" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-11 px-6 text-base' })}>
              View Pricing
            </a>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Safe, reversible changes · No account required to scan
          </p>
        </div>
      </div>
    </section>
  )
}
