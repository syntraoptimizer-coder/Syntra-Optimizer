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
  {
    game: 'Fortnite',
    cpu: 'Ryzen 5 5600',
    gpu: 'RTX 3060',
    ram: '16GB DDR4',
    before: 142,
    after: 168,
  },
  {
    game: 'Valorant',
    cpu: 'Core i5-12400F',
    gpu: 'RTX 3060 Ti',
    ram: '16GB DDR4',
    before: 288,
    after: 341,
  },
  {
    game: 'CS2',
    cpu: 'Ryzen 7 5800X',
    gpu: 'RTX 4070',
    ram: '32GB DDR4',
    before: 246,
    after: 302,
  },
  {
    game: 'Warzone',
    cpu: 'Core i7-13700K',
    gpu: 'RTX 4070 Ti',
    ram: '32GB DDR5',
    before: 118,
    after: 139,
  },
]

function BenchmarkCard({ data, active }: { data: Benchmark; active: boolean }) {
  const improvement = Math.round(((data.after - data.before) / data.before) * 100)
  const maxFps = Math.max(data.before, data.after)
  const beforePct = (data.before / maxFps) * 100
  const afterPct = (data.after / maxFps) * 100

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium">{data.game}</h3>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
          +{improvement}% FPS
        </span>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
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
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Before</span>
            <span className="font-mono tabular-nums text-muted-foreground">{data.before} FPS</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-muted-foreground/50 transition-[width] duration-1000 ease-out"
              style={{ width: active ? `${beforePct}%` : '0%' }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">After</span>
            <span className="font-mono font-medium tabular-nums text-primary">{data.after} FPS</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] delay-200 duration-1000 ease-out"
              style={{ width: active ? `${afterPct}%` : '0%' }}
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
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Real hardware, real gains"
          title="Game benchmark: before vs after"
          description="Average 1% low and mean FPS measured on real PC configurations, before and after running Syntra's Game Optimizer."
        />
        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2">
          {BENCHMARKS.map((data) => (
            <BenchmarkCard key={data.game} data={data} active={active} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Results vary by hardware, drivers, and in-game settings. Figures shown are representative
          averages.
        </p>
      </div>
    </section>
  )
}
