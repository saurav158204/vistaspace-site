import { useEffect, useState } from 'react'
import { DASHBOARD, GUIDANCE_MESSAGES } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TYPE_MS = 28
const HOLD_MS = 2600

export function GuidanceBar() {
  const reduced = useReducedMotion()
  const [msgIndex, setMsgIndex] = useState(0)
  const [typed, setTyped] = useState(reduced ? GUIDANCE_MESSAGES[0] : '')
  const [confidence, setConfidence] = useState(reduced ? 92 : 0)

  useEffect(() => {
    if (reduced) {
      setTyped(GUIDANCE_MESSAGES[0])
      return
    }

    const full = GUIDANCE_MESSAGES[msgIndex]
    let char = 0
    setTyped('')

    const typer = window.setInterval(() => {
      char += 1
      setTyped(full.slice(0, char))
      if (char >= full.length) {
        window.clearInterval(typer)
        window.setTimeout(() => setMsgIndex((i) => (i + 1) % GUIDANCE_MESSAGES.length), HOLD_MS)
      }
    }, TYPE_MS)

    return () => window.clearInterval(typer)
  }, [msgIndex, reduced])

  useEffect(() => {
    if (reduced) return

    let raf = 0
    let start = performance.now()
    const cycle = 5200

    const tick = (now: number) => {
      const t = ((now - start) % cycle) / cycle
      const eased = 1 - Math.pow(1 - Math.min(t * 1.35, 1), 3)
      setConfidence(Math.round(eased * 92))
      if (t > 0.999) start = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const overThreshold = confidence >= DASHBOARD.confidenceThreshold
  const isAlert = GUIDANCE_MESSAGES[msgIndex].startsWith('Alert')

  return (
    <section
      className="flex flex-col gap-4 border-t border-hairline px-5 py-4"
      aria-label="AI guidance"
    >
      <div className="flex flex-col gap-1.5">
        <span className="micro">AI guidance · text-to-speech</span>
        <p
          className={`font-mono text-[13px] leading-snug ${isAlert ? 'text-signal' : 'text-ink'}`}
          aria-live="polite"
        >
          {typed}
          {!reduced && (
            <span className="ml-0.5 inline-block h-3.5 w-[6px] -translate-y-px animate-pulse-dot bg-ink align-middle" />
          )}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="text-ink-muted">Step confidence</span>
          <span className={overThreshold ? 'text-ink' : 'text-ink-muted'}>
            <span className="tnum">{confidence}</span>% / {DASHBOARD.confidenceThreshold}% threshold
          </span>
        </div>

        <div
          className="relative h-1.5 w-full overflow-hidden rounded-full bg-paper-sunk"
          role="meter"
          aria-valuenow={confidence}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Step confidence ${confidence} percent against an ${DASHBOARD.confidenceThreshold} percent alert threshold`}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-150 ${
              overThreshold ? 'bg-signal' : 'bg-ink/35'
            }`}
            style={{ width: `${confidence}%` }}
          />
          <span
            className="absolute inset-y-0 w-px bg-ink"
            style={{ left: `${DASHBOARD.confidenceThreshold}%` }}
            aria-hidden="true"
          />
        </div>

        <p className="font-mono text-[10px] text-ink-faint">
          {overThreshold
            ? 'Confidence cleared — step committed to the log.'
            : `Below ${DASHBOARD.confidenceThreshold}% — no alert fired, awaiting more frames.`}
        </p>
      </div>
    </section>
  )
}
