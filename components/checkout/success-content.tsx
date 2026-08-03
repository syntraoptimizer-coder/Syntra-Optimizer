'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Crown, Wrench } from 'lucide-react'
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

interface SuccessContentProps {
  user: any
  plan: string
}

export function SuccessContent({ user, plan }: SuccessContentProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(true)
  const [roleUpdated, setRoleUpdated] = useState(false)
  const supabase = createClient()

  const selectedPlan = PLANS[plan as keyof typeof PLANS] || PLANS.premium
  const Icon = selectedPlan.icon

  useEffect(() => {
    const updateRole = async () => {
      try {
        // Update user role in database
        const { error } = await supabase
          .from('user_roles')
          .update({ 
            role: plan === 'service' ? 'service' : 'premium',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)

        if (!error) {
          setRoleUpdated(true)
        }
      } catch (error) {
        console.error('Error updating role:', error)
      } finally {
        setIsUpdating(false)
      }
    }

    updateRole()
  }, [user.id, plan, supabase])

  const handleGoToDashboard = () => {
    router.push('/dashboard')
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

        {isUpdating ? (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Setting up your account...
          </div>
        ) : roleUpdated ? (
          <div className="mt-6 rounded-lg bg-primary/10 p-4 text-center">
            <p className="text-sm font-medium text-primary">
              ✓ Your account has been upgraded successfully
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-lg bg-destructive/10 p-4 text-center">
            <p className="text-sm text-destructive">
              There was an issue updating your account. Please contact support.
            </p>
          </div>
        )}

        <Button
          onClick={handleGoToDashboard}
          size="lg"
          className="mt-8 w-full h-12 text-base"
          disabled={isUpdating}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
