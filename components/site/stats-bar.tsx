'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = {
  label: string
  value: number
  suffix?: string
  decimals?: number
}

const STATS: Stat[] = [
  { label: 'Utilisateurs', value: 100, suffix: '+' },
  { label: 'Average rating', value: 4.8, suffix: '/5', decimals: 1 },
  { label: 'Avg optimization score', value: 92 },
  { label: 'Avg boot time saved', value: 41, suffix: '%' },
]

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const display = useCountUp(stat.value, active, stat.decimals ?? 0)
  return (
    <div className="text-center">
      <div className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {display}
        {stat.suffix ?? ''}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
    </div>
  )
}

export function StatsBar() {
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
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  )
}
