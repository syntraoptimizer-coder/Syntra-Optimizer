import {
  Wrench,
  Trash2,
  Wifi,
  Gamepad2,
  HardDrive,
  Cpu,
} from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const FEATURES = [
  {
    icon: Wrench,
    title: 'Automatic Fixes',
    description:
      'Detects and repairs registry issues, broken services, and misconfigurations that quietly slow your PC down.',
  },
  {
    icon: Trash2,
    title: 'Debloat',
    description:
      'Removes pre-installed junk, telemetry, and background apps you never asked for — safely and reversibly.',
  },
  {
    icon: Wifi,
    title: 'Network Optimization',
    description:
      'Tunes DNS, TCP, and latency settings to cut ping and stabilize your connection during downloads and matches.',
  },
  {
    icon: Gamepad2,
    title: 'Game Optimizer',
    description:
      'Prioritizes GPU and CPU resources per title, disables interruptions, and unlocks smoother, higher FPS.',
  },
  {
    icon: HardDrive,
    title: 'RAM & Disk Cleanup',
    description:
      'Frees trapped memory and clears gigabytes of cache and temp files without touching what matters.',
  },
  {
    icon: Cpu,
    title: 'BIOS Tools',
    description:
      'Guided, safe tweaks for power plans, resizable BAR, and boot settings to get the most from your hardware.',
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Everything in one app"
          title="A full optimization toolkit"
          description="Six powerful modules that work together to make your PC faster, cleaner, and game-ready."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
