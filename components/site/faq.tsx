'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Is Syntra safe to use on my PC?',
    a: 'Yes. Every change Syntra makes is reversible, and the app creates a restore point before optimizing. You can review and undo any tweak at any time.',
  },
  {
    q: 'Which versions of Windows are supported?',
    a: 'Syntra fully supports Windows 10 and Windows 11 (64-bit). Older versions are not supported, and a Windows-native build is required.',
  },
  {
    q: 'What is your refund policy?',
    a: 'If Syntra does not improve your system, contact us within 14 days of purchase for a full refund — no questions asked.',
  },
  {
    q: 'How does the Done-For-You service work?',
    a: 'After booking, a Syntra expert schedules a session and connects to your PC through a secure, permission-based remote tool. They run the full optimization while you watch, then share a before/after report.',
  },
  {
    q: 'Is remote access safe for the Done-For-You plan?',
    a: 'Absolutely. Sessions use encrypted, one-time access that you approve and can end instantly. Our experts never store credentials, and access is revoked the moment the session finishes.',
  },
  {
    q: 'Will optimizing affect my warranty or files?',
    a: 'No. Syntra only adjusts software settings and clears temporary data — it never touches your personal files or hardware warranty.',
  },
]

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium transition-colors hover:text-primary"
        >
          {q}
          <ChevronDown
            className={cn('size-5 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180 text-primary')}
          />
        </button>
      </h3>
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300',
          isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-16">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
