'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
import { Field } from '@/components/auth/field'
import { createClient } from '@/lib/supabase/client'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = { email?: string; form?: string }

export function ForgotPasswordForm() {
  const [values, setValues] = useState({ email: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function validate(): Errors {
    const next: Errors = {}
    if (!values.email) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setStatus('idle')
      setErrors({ form: error.message })
      return
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
          <CheckCircle2 className="mx-auto size-8 text-primary" />
          <h2 className="mt-3 font-medium">Check your email</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a password reset link to {values.email}. Click the link to reset your password.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.form}
          </p>
        )}
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Sending reset link…' : 'Send reset link'}
        </button>
      </form>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </div>
  )
}
