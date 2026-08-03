'use client'

import { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'

export function DevBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      className="relative z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-center text-sm"
      style={{
        background: 'rgba(255,200,50,0.08)',
        borderBottom: '1px solid rgba(255,200,50,0.2)',
      }}
    >
      <AlertTriangle
        className="size-4 shrink-0"
        style={{ color: 'rgba(255,200,50,0.85)' }}
      />
      <p style={{ color: 'rgba(255,200,50,0.85)', fontWeight: 300 }}>
        <span className="font-medium">Site en cours de développement</span>
        {' '}— Merci de ne pas effectuer d'achat pour le moment.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 grid size-6 place-items-center rounded-full transition-all duration-150 hover:bg-white/10"
        style={{ color: 'rgba(255,200,50,0.6)' }}
        aria-label="Fermer"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
