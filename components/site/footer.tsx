import Link from 'next/link'
import { Logo } from '@/components/site/logo'

const NAV = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Benchmarks', href: '#benchmarks' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Download', href: '/checkout?plan=premium' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Security', href: '#' },
  ],
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.9a.07.07 0 0 0-.08.03c-.2.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.44 0c-.16-.39-.4-.87-.6-1.25a.08.08 0 0 0-.09-.03A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.29 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.01-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.54-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.36)', fontWeight: 300 }}
            >
              Optimize your PC. Instantly. Faster boots, higher FPS, and a cleaner Windows — in one click.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { label: 'Join our Discord', Icon: DiscordIcon },
                { label: 'Follow us on X', Icon: XIcon },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full transition-all duration-200 hover:bg-white/8"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light transition-colors duration-200 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 pt-6 text-xs sm:flex-row"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 300,
          }}
        >
          <p>© {new Date().getFullYear()} Syntra Optimizer. All rights reserved.</p>
          <p>Made for Windows 10 &amp; 11.</p>
        </div>
      </div>
    </footer>
  )
}
