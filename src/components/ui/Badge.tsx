import type { ReactNode } from 'react'

type Tone = 'default' | 'solid' | 'signal'

const tones: Record<Tone, string> = {
  default: 'border-hairline-strong text-ink-muted',
  solid: 'border-ink bg-ink text-paper',
  // Reserved for live status inside the dashboard only.
  signal: 'border-signal/40 text-signal',
}

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
  dot?: boolean
}

export function Badge({ children, tone = 'default', className = '', dot = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${tones[tone]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-current" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}
