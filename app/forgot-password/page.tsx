import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot Password — Syntra Optimizer',
  description: 'Reset your Syntra Optimizer password.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Forgot password" subtitle="Enter your email to receive a password reset link.">
      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    </AuthShell>
  )
}
