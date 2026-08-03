import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5', className)}
      aria-label="Syntra Optimizer home"
    >
      {/* Icon mark */}
      <span
        className="grid size-8 place-items-center rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 0 20px -4px rgba(255,255,255,0.4)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-4.5"
          aria-hidden="true"
        >
          <path
            d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
            fill="#080808"
          />
        </svg>
      </span>

      {/* Wordmark */}
      <span
        className="text-base font-medium tracking-tight"
        style={{ color: 'rgba(255,255,255,0.9)' }}
      >
        Syntra
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
      </span>
    </Link>
  )
}
