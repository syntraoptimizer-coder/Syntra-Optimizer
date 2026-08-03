'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, Crown, Wrench } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<'free' | 'premium' | 'service'>('free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      
      if (session?.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle()
        setUserRole(roleData?.role || 'free')
      }
      
      setLoading(false)

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user || null)
        if (session?.user) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle()
          setUserRole(roleData?.role || 'free')
        } else {
          setUserRole('free')
        }
      })

      return () => subscription.unsubscribe()
    }

    checkUser()
  }, [])

  const getRoleBadge = () => {
    switch (userRole) {
      case 'premium':
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Crown className="size-3" />
            Premium
          </div>
        )
      case 'service':
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500">
            <Wrench className="size-3" />
            Service
          </div>
        )
      default:
        return null
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <div className="h-10 w-20 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <div className="flex items-center gap-2">
              {getRoleBadge()}
              <Link href="/dashboard" className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
                <User className="mr-2 size-4" />
                Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
                Log in
              </Link>
              <Link href="/checkout?plan=premium" className={buttonVariants({ size: 'lg' })}>
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {loading ? (
                <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
              ) : user ? (
                <div className="flex flex-col gap-2">
                  {getRoleBadge()}
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ variant: 'outline', size: 'lg' })}
                  >
                    <User className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ variant: 'outline', size: 'lg' })}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/checkout?plan=premium"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ size: 'lg' })}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
