import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { CheckoutForm } from '@/components/checkout/checkout-form'

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string }
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?next=/checkout?plan=' + (searchParams.plan || 'premium'))
  }

  const plan = searchParams.plan || 'premium'

  return (
    <div className="min-h-dvh">
      <Suspense fallback={<div className="flex items-center justify-center py-20">Loading...</div>}>
        <CheckoutForm user={user} plan={plan} />
      </Suspense>
    </div>
  )
}
