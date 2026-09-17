import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PillButtonProps {
  to?: string
  href?: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
  /** Trailing ↗ glyph, as on the reference buttons. */
  arrow?: boolean
  onClick?: () => void
}

const variants = {
  solid: 'bg-ink text-paper hover:bg-ink-soft',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'border border-hairline-strong text-ink hover:border-ink',
}

export function PillButton({
  to,
  href,
  children,
  variant = 'solid',
  className = '',
  arrow = true,
  onClick,
}: PillButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-colors duration-300 ${variants[variant]} ${className}`

  const inner = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="translate-y-px text-[13px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  )
}
