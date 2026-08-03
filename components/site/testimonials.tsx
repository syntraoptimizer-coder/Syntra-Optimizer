import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'

const TESTIMONIALS = [
  {
    name: 'Marcus Reyes',
    role: 'Competitive FPS player',
    quote:
      'Ping dropped and my 1% lows got way more stable. Valorant feels completely different now — worth it just for the network tuning.',
    rating: 5,
  },
  {
    name: 'Priya Natarajan',
    role: 'Streamer',
    quote:
      'My laptop came loaded with junk. Syntra debloated it in one pass and boot times are almost half what they were.',
    rating: 5,
  },
  {
    name: 'Dylan Brooks',
    role: 'PC builder',
    quote:
      'I was skeptical, but the before/after score is real. The BIOS guidance alone saved me an afternoon of research.',
    rating: 4,
  },
  {
    name: 'Sofia Almeida',
    role: 'Casual gamer',
    quote:
      'I went with the Done-For-You plan and an expert handled everything remotely. Smooth, safe, and my games run great.',
    rating: 5,
  },
  {
    name: 'Kenji Watanabe',
    role: 'Software engineer',
    quote:
      'Cleared 12GB of cache and freed up trapped RAM. Everything from Chrome to my IDE just feels snappier.',
    rating: 5,
  },
  {
    name: 'Hannah Cole',
    role: 'Content creator',
    quote:
      'Render exports are faster and my system score jumped from the 60s into the 90s. Easiest optimization I have done.',
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
              className="glass-card glass-card-hover rounded-2xl p-6"
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
