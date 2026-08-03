'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Field } from '@/components/auth/field'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { createClient } from '@/lib/supabase/client'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = { email?: string; password?: string; form?: string }

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function validate(): Errors {
    const next: Errors = {}
    if (!values.email) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.password) next.password = 'Password is required.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setStatus('idle')
      setErrors({ form: error.message })
      return
    }

    setStatus('success')
    const destination = searchParams.get('next') || '/dashboard'
    router.push(destination)
    router.refresh()
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
        <CheckCircle2 className="mx-auto size-8 text-primary" />
        <h2 className="mt-3 font-medium">You&apos;re signed in</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Redirecting you to your dashboard…
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <OAuthButtons />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <span className="h-px flex-1 bg-border" />
      </div>

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
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          labelAction={
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          }
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}
