import Link from 'next/link'
import { Download } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)]"
        />
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Your PC has more to give.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Join 100+ gamers and creators running faster, cleaner machines. Optimize in
          minutes — or let an expert do it for you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/checkout?plan=premium" className={buttonVariants({ size: 'lg', className: 'h-11 px-6 text-base' })}>
            <Download className="size-4" />
            Get Started
          </Link>
          <a href="#pricing" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-11 px-6 text-base' })}>
            Compare plans
          </a>
        </div>
      </div>
    </section>
  )
}
