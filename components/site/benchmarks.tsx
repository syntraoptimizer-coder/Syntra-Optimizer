'use client'

import { useEffect, useRef, useState } from 'react'
import { Cpu, MonitorCog, MemoryStick } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

type Benchmark = {
  game: string
  cpu: string
  gpu: string
  ram: string
  before: number
  after: number
}

const BENCHMARKS: Benchmark[] = [
  { game: 'Fortnite', cpu: 'Ryzen 5 5600', gpu: 'RTX 3060', ram: '16GB DDR4', before: 142, after: 168 },
  { game: 'Valorant', cpu: 'Core i5-12400F', gpu: 'RTX 3060 Ti', ram: '16GB DDR4', before: 288, after: 341 },
  { game: 'CS2', cpu: 'Ryzen 7 5800X', gpu: 'RTX 4070', ram: '32GB DDR4', before: 246, after: 302 },
  { game: 'Warzone', cpu: 'Core i7-13700K', gpu: 'RTX 4070 Ti', ram: '32GB DDR5', before: 118, after: 139 },
]

function BenchmarkCard({ data, active }: { data: Benchmark; active: boolean }) {
  const improvement = Math.round(((data.after - data.before) / data.before) * 100)
  const maxFps = Math.max(data.before, data.after)
  const beforePct = (data.before / maxFps) * 100
  const afterPct = (data.after / maxFps) * 100

  return (
    <div className="eco-card glass-card rounded-2xl p-6 overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <h3
          className="text-base font-medium"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          {data.game}
        </h3>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          +{improvement}% FPS
        </span>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
        <div className="inline-flex items-center gap-1.5">
          <Cpu className="size-3.5" />
          {data.cpu}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <MonitorCog className="size-3.5" />
          {data.gpu}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <MemoryStick className="size-3.5" />
          {data.ram}
        </div>
      </dl>

      <div className="mt-6 space-y-4">
        {/* Before */}
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Before</span>
            <span
              className="font-mono tabular-nums"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {data.before} FPS
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-1000 ease-out"
              style={{
                width: active ? `${beforePct}%` : '0%',
                background: 'rgba(255,255,255,0.22)',
              }}
            />
          </div>
        </div>

        {/* After */}
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>After</span>
            <span
              className="font-mono font-medium tabular-nums"
              style={{ color: '#ffffff', textShadow: '0 0 12px rgba(255,255,255,0.5)' }}
            >
              {data.after} FPS
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              className="h-full rounded-full transition-[width] delay-200 duration-1000 ease-out"
              style={{
                width: active ? `${afterPct}%` : '0%',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.92) 100%)',
                boxShadow: '0 0 10px rgba(255,255,255,0.3)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Benchmarks() {
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
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="benchmarks" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Real hardware, real gains"
          title="Game benchmark: before vs after"
          description="Average 1% low and mean FPS measured on real PC configurations, before and after running Syntra's Game Optimizer."
        />
        <div ref={ref} className="mt-14 grid gap-4 sm:grid-cols-2">
          {BENCHMARKS.map((data) => (
            <BenchmarkCard key={data.game} data={data} active={active} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Results vary by hardware, drivers, and in-game settings. Figures shown are representative averages.
        </p>
      </div>
    </section>
  )
}
