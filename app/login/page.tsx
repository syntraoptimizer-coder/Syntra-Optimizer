import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Log in — Syntra Optimizer',
  description: 'Sign in to your Syntra Optimizer account.',
}

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to keep your PC running at its best.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  )
}
