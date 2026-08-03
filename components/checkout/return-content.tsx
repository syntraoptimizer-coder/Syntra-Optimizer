'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Crown, Wrench, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PLANS = {
  premium: {
    name: 'Premium',
    icon: Crown,
    badge: 'Premium',
  },
  service: {
    name: 'Service',
    icon: Wrench,
    badge: 'Service',
  },
}

interface ReturnContentProps {
  user: any
  plan: string
}

export function ReturnContent({ user, plan }: ReturnContentProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const selectedPlan = PLANS[plan as keyof typeof PLANS] || PLANS.premium
  const Icon = selectedPlan.icon

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Simulate payment verification (in production, this would be handled by webhooks)
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Update user role
        const { error } = await supabase
          .from('user_roles')
          .update({ 
            role: plan === 'service' ? 'service' : 'premium',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)

        if (error) {
          throw error
        }

        setIsSuccess(true)
      } catch (err) {
        console.error('Error processing payment:', err)
        setError('There was an issue processing your payment. Please contact support.')
      } finally {
        setIsProcessing(false)
      }
    }

    processPayment()
  }, [user.id, plan, supabase])

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  if (isProcessing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <Loader2 className="mx-auto size-12 animate-spin text-primary" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Processing Payment</h1>
          <p className="mt-4 text-muted-foreground">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <CheckCircle2 className="size-8 text-destructive" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Payment Error</h1>
          <p className="mt-4 text-muted-foreground">{error}</p>
          <Button onClick={handleGoToDashboard} className="mt-8">
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-8 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Payment Successful!</h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your purchase, {user.email}
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">You now have {selectedPlan.name} access</h2>
            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Icon className="size-3" />
              {selectedPlan.badge}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-primary/10 p-4 text-center">
          <p className="text-sm font-medium text-primary">
            ✓ Your account has been upgraded successfully
          </p>
        </div>

        <Button
          onClick={handleGoToDashboard}
          size="lg"
          className="mt-8 w-full h-12 text-base"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
