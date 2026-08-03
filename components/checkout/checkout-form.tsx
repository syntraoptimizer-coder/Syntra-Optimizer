'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, Crown, Wrench } from 'lucide-react'

const PLANS = {
  premium: {
    name: 'Syntra Optimizer Premium',
    price: '$15',
    tagline: 'One-time payment',
    description: 'Full app license. Run every optimization yourself, whenever you want.',
    url: 'https://buy.stripe.com/fZuaEX5q2gV80b29Ny6AM00',
    icon: Crown,
    perks: [
      'Full Syntra Optimizer license',
      'All modules unlocked',
      'Unlimited optimizations',
      'Lifetime updates',
      'Community support',
    ],
  },
  service: {
    name: 'Syntra Optimizer Services',
    price: '$6',
    tagline: 'Per session',
    description: 'A Syntra expert optimizes your PC remotely. Nothing to install on your end.',
    url: 'https://buy.stripe.com/dRm14n05I48m2jagbW6AM01',
    icon: Wrench,
    perks: [
      'Personal remote optimization',
      'No install required',
      'Expert-tuned game settings',
      'Live before/after score report',
      'Priority chat support',
    ],
  },
}

interface CheckoutFormProps {
  user: any
  plan: string
}

export function CheckoutForm({ user, plan }: CheckoutFormProps) {
  const router = useRouter()
  const selectedPlan = PLANS[plan as keyof typeof PLANS] || PLANS.premium
  const Icon = selectedPlan.icon

  const handleCheckout = () => {
    window.location.href = selectedPlan.url
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Complete Your Purchase</h1>
        <p className="mt-4 text-muted-foreground">
          You are signed in as <span className="font-medium text-foreground">{user.email}</span>
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{selectedPlan.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedPlan.tagline}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold">{selectedPlan.price}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{selectedPlan.description}</p>

        <ul className="mt-6 space-y-3">
          {selectedPlan.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleCheckout}
          size="lg"
          className="mt-8 w-full h-12 text-base"
        >
          Proceed to Payment
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You will be redirected to Stripe to complete your payment securely.
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
