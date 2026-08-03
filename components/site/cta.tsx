import Link from 'next/link'
import { Download } from 'lucide-react'

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-12"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Big glow behind content */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background:
              'radial-gradient(65% 110% at 50% 0%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 72%)',
            pointerEvents: 'none',
          }}
        />

        {/* White glow orb */}
        <div
          aria-hidden="true"
          className="glow glow-white"
          style={{
            position: 'absolute',
            left: '50%',
            top: '-10%',
            width: 700,
            height: 400,
            opacity: 0.22,
            zIndex: 0,
          }}
        />

        {/* Speck particles */}
        <div className="speck" style={{ position: 'absolute', top: '20%', left: '8%', opacity: 0.4 }} aria-hidden="true" />
        <div className="speck" style={{ position: 'absolute', top: '65%', left: '14%', opacity: 0.3 }} aria-hidden="true" />
        <div className="speck" style={{ position: 'absolute', top: '30%', right: '10%', opacity: 0.45 }} aria-hidden="true" />
        <div className="speck" style={{ position: 'absolute', top: '72%', right: '18%', opacity: 0.28 }} aria-hidden="true" />

        <div className="relative z-10">
          <h2
            className="text-balance tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 300,
              letterSpacing: '-0.026em',
              lineHeight: 1.08,
              color: 'transparent',
              backgroundImage:
                'radial-gradient(110% 130% at 50% 85%, #ffffff 0%, rgba(255,255,255,0.85) 30%, rgba(195,195,195,0.7) 70%, rgba(130,130,130,0.52) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Your PC has more to give.
          </h2>

          <p
            className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.44)', fontWeight: 300 }}
          >
            Join 100+ gamers and creators running faster, cleaner machines. Optimize in
            minutes — or let an expert do it for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/checkout?plan=premium"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.92)',
                color: '#080808',
                boxShadow: '0 0 36px -8px rgba(255,255,255,0.5)',
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
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              Compare plans
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
