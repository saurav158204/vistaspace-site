import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  /** Seconds of delay, used to stagger siblings. */
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/**
 * Scroll-reveal wrapper. Under prefers-reduced-motion the content renders
 * immediately at its resting position with no transform.
 */
export function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  step?: number
}

/** Container that staggers its immediate <Reveal> children by index. */
export function Stagger({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>
}
