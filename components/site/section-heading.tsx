export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <span
            className="size-1 rounded-full bg-white/70"
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      )}
      <h2
        className="mt-5 text-balance tracking-tight"
        style={{
          fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
          fontWeight: 300,
          letterSpacing: '-0.024em',
          lineHeight: 1.1,
          color: 'transparent',
          backgroundImage:
            'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-pretty text-base leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.44)', fontWeight: 300 }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
