import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5', className)}
      aria-label="Syntra Optimizer home"
    >
      <Image
        src="/syntra-logo.png"
        alt="Syntra"
        width={32}
        height={32}
        className="rounded-xl"
        style={{ boxShadow: '0 0 16px -4px rgba(120,100,255,0.5)' }}
        priority
      />
      <span
        className="text-base font-medium tracking-tight"
        style={{ color: 'rgba(255,255,255,0.9)' }}
      >
        Syntra<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
      </span>
    </Link>
  )
}
