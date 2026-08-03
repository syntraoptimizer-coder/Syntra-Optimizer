'use client'

import { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  labelAction?: React.ReactNode
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, labelAction, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
        {labelAction}
      </div>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40',
          error && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  )
})
