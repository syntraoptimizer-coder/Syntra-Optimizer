import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'
import { ReturnContent } from '@/components/checkout/return-content'

export default async function CheckoutReturnPage({
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
        <ReturnContent user={user} plan={plan} />
      </Suspense>
    </div>
  )
}
