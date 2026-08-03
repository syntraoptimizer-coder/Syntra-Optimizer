import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2 font-semibold tracking-tight', className)}
      aria-label="Syntra Optimizer home"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <path
            d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-lg">
        Syntra<span className="text-primary">.</span>
      </span>
    </Link>
  )
}
