'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = {
  label: string
  value: number
  suffix?: string
  decimals?: number
}

const STATS: Stat[] = [
  { label: 'Users', value: 100, suffix: '+' },
  { label: 'Average rating', value: 4.8, suffix: '/5', decimals: 1 },
  { label: 'Avg optimization score', value: 92 },
  { label: 'Avg boot time saved', value: 41, suffix: '%' },
]

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
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
      <div
        className="font-mono tracking-tight tabular-nums"
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
          fontWeight: 300,
          color: 'transparent',
          backgroundImage:
            'radial-gradient(110% 130% at 50% 80%, #ffffff 0%, rgba(255,255,255,0.82) 32%, rgba(190,190,190,0.65) 72%, rgba(130,130,130,0.5) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {display}
        {stat.suffix ?? ''}
      </div>
      <div
        className="mt-1.5 text-sm font-light"
        style={{ color: 'rgba(255,255,255,0.38)' }}
      >
        {stat.label}
      </div>
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
    <section
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Glow behind numbers */}
      <div className="num-light" aria-hidden="true" />

      <div
        ref={ref}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  )
}
