import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const TESTIMONIALS = [
  {
    name: 'Da1ko',
    role: 'PC Gamer',
    quote:
      'Huge thanks for your optimization it\'s absolutely incredible! My PC feels much faster, everything is smoother, and I noticed the improvement right away. I highly recommend Syntra Optimizer to anyone looking to get the most out of their Windows PC. Great work!',
    rating: 5,
  },
  {
    name: 'Crinok',
    role: 'FPS Player',
    quote:
      'I honestly didn\'t expect such a huge improvement. My PC boots much faster, games run noticeably smoother, and I\'ve gained several FPS. The interface is simple to use, and the optimization only takes a few clicks. I highly recommend Syntra Optimizer to anyone looking to boost their PC\'s performance!',
    rating: 5,
  },
  {
    name: 'NovalPusl',
    role: 'PC Enthusiast',
    quote:
      'I\'ve tried several PC optimization tools before, but this one genuinely stands out. My system feels much more responsive, loading times are shorter, and gaming performance has noticeably improved. It\'s easy to use, fast, and delivers real results. Definitely worth it!',
    rating: 5,
  },
  {
    name: 'Zenitud',
    role: 'Casual Gamer',
    quote:
      'I was surprised by how much of a difference this made. My PC runs smoother, applications open faster, and I no longer experience the small stutters I used to have while gaming. The optimization process was quick and straightforward. Great software and definitely worth trying!',
    rating: 5,
  },
  {
    name: 'Kevin12',
    role: 'PC Gamer',
    quote:
      'I wasn\'t expecting such a noticeable improvement, but Syntra Optimizer exceeded my expectations. My system is faster, multitasking is smoother, and my games run with better stability. The one-click optimization is incredibly convenient, and everything worked exactly as advertised. Excellent software!',
    rating: 5,
  },
  {
    name: 'Min12_',
    role: 'Daily User',
    quote:
      'I\'ve been using Syntra Optimizer for a few days now, and the difference is clear. Boot times are shorter, my games feel smoother, and overall system performance has improved. It\'s simple to use, reliable, and does exactly what it promises. Great job!',
    rating: 5,
  },
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2)
}

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="eco-tiles" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Loved by 100+ users"
          title="What players are saying"
          description="From ranked grinders to first-time PC owners, Syntra keeps machines fast."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="eco-card glass-card rounded-2xl p-6 overflow-hidden"
            >
              {/* Stars */}
              <div
                className="flex items-center gap-0.5"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5"
                    style={{
                      fill: i < t.rating ? 'rgba(255,255,255,0.85)' : 'transparent',
                      color: i < t.rating ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>

              <blockquote
                className="mt-4 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
              >
                "{t.quote}"
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {initials(t.name)}
                </span>
                <span className="text-sm">
                  <span
                    className="block font-medium"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="block text-xs font-light"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
