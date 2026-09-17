import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

/** Restrained fade with a slight upward drift — no glow, no slide. */
export function PageTransition({ children }: PageTransitionProps) {
  const reduced = useReducedMotion()

  if (reduced) return <main id="main">{children}</main>

  return (
    <motion.main
      id="main"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
