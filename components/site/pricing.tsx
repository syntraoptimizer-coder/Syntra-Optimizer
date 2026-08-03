import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    name: 'Self-Service',
    price: 15,
    tagline: 'One-time payment',
    description: 'Full app license. Run every optimization yourself, whenever you want.',
    cta: 'Buy license',
    href: '/checkout?plan=premium',
    featured: false,
    perks: [
      'Full Syntra Optimizer license',
      'All modules unlocked',
      'Unlimited optimizations',
      'Lifetime updates',
      'Community support',
    ],
  },
  {
    name: 'Done-For-You',
    price: 6,
    tagline: 'Per session',
    description: 'A Syntra expert optimizes your PC remotely. Nothing to install on your end.',
    cta: 'Book an expert',
    href: '/checkout?plan=service',
    featured: true,
    perks: [
      'Personal remote optimization',
      'No install required',
      'Expert-tuned game settings',
      'Live before/after score report',
      'Priority chat support',
    ],
  },
]

const COMPARISON: { feature: string; self: boolean; dfy: boolean }[] = [
  { feature: 'All optimization modules', self: true, dfy: true },
  { feature: 'Run optimizations yourself', self: true, dfy: false },
  { feature: 'Done by a human expert', self: false, dfy: true },
  { feature: 'No installation needed', self: false, dfy: true },
  { feature: 'Lifetime updates', self: true, dfy: false },
  { feature: 'Priority support', self: false, dfy: true },
  { feature: 'Before/after score report', self: true, dfy: true },
]

function Cell({ ok }: { ok: boolean }) {
  return ok ? (
    <Check className="mx-auto size-4 text-primary" aria-label="Included" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Not included" />
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Simple pricing"
          title="Do it yourself, or let us do it"
          description="Pick a one-time license and optimize on your own, or have a Syntra expert handle everything remotely."
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-6',
                plan.featured ? 'border-primary shadow-lg shadow-primary/10' : 'border-border',
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-medium">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-semibold">${plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.tagline}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: plan.featured ? 'default' : 'outline',
                    size: 'lg',
                  }),
                  'mt-6 h-11 text-base inline-flex items-center justify-center',
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <caption className="sr-only">Feature comparison between Self-Service and Done-For-You plans</caption>
            <thead>
              <tr className="border-b border-border bg-card/60">
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  Feature
                </th>
                <th scope="col" className="px-4 py-3 text-center font-medium">
                  Self-Service
                </th>
                <th scope="col" className="px-4 py-3 text-center font-medium text-primary">
                  Done-For-You
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn('border-b border-border/60 last:border-0', i % 2 === 1 && 'bg-card/30')}
                >
                  <td className="px-4 py-3 text-muted-foreground">{row.feature}</td>
                  <td className="px-4 py-3">
                    <Cell ok={row.self} />
                  </td>
                  <td className="px-4 py-3">
                    <Cell ok={row.dfy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
