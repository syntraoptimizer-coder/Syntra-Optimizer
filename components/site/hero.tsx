'use client'

import Link from 'next/link'
import { Download, ShieldCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

function Speck({ style }: { style: React.CSSProperties }) {
  return <div className="speck" style={style} aria-hidden="true" />
}

const SPECKS = [
  { top: '22%', left: '14%', opacity: 0.45 },
  { top: '38%', left: '8%', opacity: 0.3 },
  { top: '18%', right: '12%', opacity: 0.5 },
  { top: '52%', right: '18%', opacity: 0.28 },
  { top: '64%', left: '22%', opacity: 0.35 },
  { top: '74%', right: '9%', opacity: 0.4 },
  { top: '42%', left: '44%', opacity: 0.22 },
  { top: '28%', right: '34%', opacity: 0.3 },
]

export function Hero() {
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const badge = badgeRef.current
    if (!badge) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = (now - start) / 3000
      const x = Math.sin(t * 1.3) * 6
      const y = Math.cos(t * 0.9) * 3
      badge.style.transform = `translate(${x}px, ${y}px)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
      {/* ── Background glows ── */}
      <div
        aria-hidden="true"
        className="glow glow-white"
        style={{ left: '50%', top: '-2%', width: 900, height: 620, opacity: 0.38 }}
      />
      <div
        aria-hidden="true"
        className="glow glow-soft"
        style={{ left: '18%', top: '35%', width: 480, height: 680, opacity: 0.28 }}
      />
      <div
        aria-hidden="true"
        className="glow glow-soft"
        style={{ left: '82%', top: '28%', width: 380, height: 520, opacity: 0.22 }}
      />

      {/* ── Hero grid ── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── Speck particles ── */}
      {SPECKS.map((s, i) => (
        <Speck key={i} style={s} />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-0 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
              willChange: 'transform',
            }}
          >
            <span
              className="size-1.5 rounded-full bg-white"
              style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.7)' }}
            />
            Now optimizing Windows 10 &amp; 11
          </span>

          {/* Headline */}
          <h1
            className="mt-8 text-pretty tracking-tight"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.6rem)',
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: '-0.028em',
              color: 'transparent',
              backgroundImage:
                'radial-gradient(110% 130% at 50% 80%, #ffffff 0%, rgba(255,255,255,0.88) 28%, rgba(200,200,200,0.74) 68%, rgba(140,140,140,0.55) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Optimize your PC.<br />
            <span style={{ opacity: 0.92 }}>Instantly.</span>
          </h1>

          {/* Sub */}
          <p
            className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed sm:text-lg"
            style={{ color: 'rgba(255,255,255,0.52)', fontWeight: 300 }}
          >
            Syntra scans, fixes, and fine-tunes your Windows machine in one click — debloating,
            tuning your network, and squeezing every last frame out of your games.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/checkout?plan=premium"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.92)',
                color: '#080808',
                boxShadow: '0 0 32px -6px rgba(255,255,255,0.55)',
              }}
            >
              <Download className="size-4" />
              Get Started
            </Link>
            <a
              href="#pricing"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.78)',
              }}
            >
              View Pricing
            </a>
          </div>

          {/* Trust line */}
          <p
            className="mt-5 inline-flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            <ShieldCheck className="size-3.5" style={{ color: 'rgba(255,255,255,0.6)' }} />
            Safe, reversible changes · No account required to scan
          </p>
        </div>
      </div>

      {/* ── Planet dome at bottom of hero ── */}
      <div
        aria-hidden="true"
        className="planet"
        style={{
          top: 'calc(92vh - 8vw)',
          width: '260vw',
          height: '260vw',
          zIndex: 2,
        }}
      />
      <div
        aria-hidden="true"
        className="planet-rim"
        style={{
          top: 'calc(92vh - 8vw)',
          width: '260vw',
          height: '260vw',
          zIndex: 3,
        }}
      />
    </section>
  )
}
