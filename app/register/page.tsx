import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Create account — Syntra Optimizer',
  description: 'Create your Syntra Optimizer account and start optimizing your PC.',
}

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Get started in seconds — optimize your PC or book an expert."
    >
      <RegisterForm />
    </AuthShell>
  )
}
