import { useEffect, useState } from 'react'

/**
 * True when the viewer has asked for reduced motion.
 * Every animated or 3D surface checks this and renders a static fallback instead.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Coarse capability check. Small screens and low-core devices get a static
 * gradient panel instead of a live WebGL canvas.
 */
export function useLowPowerDevice(): boolean {
  const [low, setLow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const evaluate = () => {
      const narrow = window.innerWidth < 640
      const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency
      const fewCores = typeof cores === 'number' && cores > 0 && cores <= 4
      const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
      setLow(narrow && (fewCores || coarse))
    }

    evaluate()
    window.addEventListener('resize', evaluate)
    return () => window.removeEventListener('resize', evaluate)
  }, [])

  return low
}
