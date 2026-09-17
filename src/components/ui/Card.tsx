import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Hairline darkens on hover. Off for static reference panels. */
  interactive?: boolean
  as?: 'div' | 'li' | 'article'
}

/** Flat and print-like: paper fill, 1px hairline, no blur, no shadow. */
export function Card({ children, className = '', interactive = true, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={`rounded-xl border border-hairline bg-paper-raised ${
        interactive ? 'transition-colors duration-300 hover:border-ink/30' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
