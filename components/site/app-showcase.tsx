'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const SLIDES = [
  {
    image: '/images/app-dashboard.png',
    label: 'Live Dashboard',
    title: 'Real-time PC performance',
    description: 'Monitor CPU, RAM, Disk and Network usage live. See your system score and get AI-powered recommendations to optimize instantly.',
    tag: 'Dashboard',
  },
  {
    image: '/images/app-login.png',
    label: 'Quick Access',
    title: 'Sign in and start optimizing',
    description: 'Get started in seconds with Google or Discord. Your optimization history and settings are saved to your account.',
    tag: 'Login',
  },
  {
    image: '/images/app-updates.png',
    label: 'Always up to date',
    title: 'New optimizations every update',
    description: 'Each release brings new performance tweaks, stability fixes, and advanced tools. Stay ahead with automatic update notifications.',
    tag: 'Updates',
  },
]

export function AppShowcase() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 250)
  }, [animating])

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])

  // Auto-advance every 4s
  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="glow glow-soft"
        style={{ left: '50%', top: '40%', width: 700, height: 500, opacity: 0.15 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="See it in action"
          title="Built for performance, designed for you"
          description="A powerful Windows optimizer with a clean interface. Everything you need to get the most out of your PC."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left — image */}
          <div className="relative">
            {/* Glow behind image */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '24px',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />

            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 80px -20px rgba(0,0,0,0.8)',
                opacity: animating ? 0 : 1,
                transform: animating ? 'scale(0.98)' : 'scale(1)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <Image
                src={slide.image}
                alt={slide.label}
                width={1024}
                height={640}
                className="w-full"
                priority
              />
              {/* Subtle overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.4) 100%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Tag */}
              <div
                className="absolute bottom-4 left-4 rounded-lg px-2.5 py-1 text-xs font-medium"
                style={{
                  background: 'rgba(8,8,8,0.75)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {slide.tag}
              </div>
            </div>

            {/* Arrow buttons */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full transition-all duration-200 hover:-translate-y-[calc(50%+2px)]"
              style={{
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full transition-all duration-200 hover:-translate-y-[calc(50%+2px)]"
              style={{
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label="Next"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Right — text */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {slide.label}
            </span>
            <h3
              className="mt-3 tracking-tight"
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '-0.024em',
                lineHeight: 1.15,
                color: 'transparent',
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              {slide.title}
            </h3>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.44)', fontWeight: 300, fontSize: '0.95rem' }}
            >
              {slide.description}
            </p>

            {/* Dot navigation */}
            <div className="mt-8 flex items-center gap-3">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    background: i === current
                      ? 'rgba(255,255,255,0.85)'
                      : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Slide count */}
            <p
              className="mt-4 text-xs"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              {current + 1} / {SLIDES.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
