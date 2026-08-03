'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const BEFORE = 68
const AFTER = 92

function Gauge({
  value,
  active,
  variant,
  label,
}: {
  value: number
  active: boolean
  variant: 'before' | 'after'
  label: string
}) {
  const [display, setDisplay] = useState(0)
  const size = 200
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const color = variant === 'after' ? 'var(--primary)' : 'var(--muted-foreground)'

  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const duration = 1600
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, active])

  const offset = circumference - (display / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-5xl font-semibold tabular-nums">{display}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className="mt-4 text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

export function ScoreComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Measurable results"
          title="Watch your system score climb"
          description="Syntra grades your system health before and after optimization so you can see exactly what changed."
        />
        <div
          ref={ref}
          className="mt-14 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12"
        >
          <Gauge value={BEFORE} active={active} variant="before" label="Before" />
          <ArrowRight className="size-8 rotate-90 text-primary sm:rotate-0" aria-hidden="true" />
          <Gauge value={AFTER} active={active} variant="after" label="After Syntra" />
        </div>
        <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <TrendingUp className="size-4" />
          +{AFTER - BEFORE} point improvement on average
        </div>
      </div>
    </section>
  )
}
