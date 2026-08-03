'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Field } from '@/components/auth/field'
import { createClient } from '@/lib/supabase/client'

type Errors = { password?: string; confirmPassword?: string; form?: string }

export function ResetPasswordForm() {
  const router = useRouter()
  const [values, setValues] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'no-session'>('idle')
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    // Check if user has a valid session (from the reset email link)
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setHasSession(true)
      } else {
        setStatus('no-session')
      }
    }
    checkSession()
  }, [])

  if (!hasSession && status === 'idle') {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.password) next.password = 'Password is required.'
    else if (values.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!values.confirmPassword) next.confirmPassword = 'Please confirm your password.'
    else if (values.password !== values.confirmPassword) next.confirmPassword = 'Passwords do not match.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('submitting')
    const supabase = createClient()
    
    // Update the password using the current session
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    })

    if (error) {
      setStatus('idle')
      setErrors({ form: error.message })
      return
    }

    setStatus('success')
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }

  if (status === 'no-session') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
          <h2 className="font-medium text-destructive">Invalid reset link</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        </div>

        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Request new reset link
        </Link>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
          <CheckCircle2 className="mx-auto size-8 text-primary" />
          <h2 className="mt-3 font-medium">Password updated</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your password has been successfully reset. Redirecting you to sign in…
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Go to sign in
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
          label="New password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.password}
          error={errors.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        />
        <Field
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))}
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {status === 'submitting' && <Loader2 className="size-4 animate-spin" />}
          {status === 'submitting' ? 'Updating password…' : 'Update password'}
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
