import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Stat } from '../../data/content'

interface StatCounterProps {
  stat: Stat
  index?: number
}

export function StatCounter({ stat, index = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? stat.value : 0)

  useEffect(() => {
    if (reduced) {
      setN(stat.value)
      return
    }
    if (!inView) return

    const duration = 1300
    const start = performance.now() + index * 80
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const t = Math.min(elapsed / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setN(Math.round(eased * stat.value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, stat.value, index])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="tnum display text-[40px] text-ink sm:text-[52px]">
        {reduced ? stat.display : `${stat.prefix ?? ''}${n}${stat.suffix ?? ''}`}
      </span>
      <p className="max-w-[26ch] text-[14px] leading-snug text-ink-muted">{stat.label}</p>
    </div>
  )
}
