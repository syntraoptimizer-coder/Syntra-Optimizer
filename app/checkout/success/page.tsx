import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { SuccessContent } from '@/components/checkout/success-content'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { plan?: string }
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const plan = searchParams.plan || 'premium'

  return (
    <div className="min-h-dvh">
      <Suspense fallback={<div className="flex items-center justify-center py-20">Loading...</div>}>
        <SuccessContent user={user} plan={plan} />
      </Suspense>
    </div>
  )
}
