import { useEffect, useState } from 'react'
import { DASHBOARD, SEQUENCE_STEPS } from '../../data/content'
import type { SequenceState } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TAG_STYLES: Record<SequenceState, string> = {
  Confirmed: 'border-ink bg-ink text-paper',
  'In Progress': 'border-ink text-ink',
  'Next Step': 'border-hairline-strong text-ink-soft',
  Queued: 'border-hairline text-ink-faint',
}

function stateFor(index: number, active: number): SequenceState {
  if (index < active) return 'Confirmed'
  if (index === active) return 'In Progress'
  if (index === active + 1) return 'Next Step'
  return 'Queued'
}

export function SequencePanel() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(2)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % SEQUENCE_STEPS.length)
    }, 3600)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <section className="flex flex-col gap-4 p-5" aria-label="Experiment status and sequence">
      <div className="flex flex-col gap-1.5">
        <span className="micro">Active experiment</span>
        <h3 className="font-mono text-[14px] text-ink">{DASHBOARD.activeExperiment}</h3>
      </div>

      <ol className="flex flex-col">
        {SEQUENCE_STEPS.map((step, i) => {
          const state = stateFor(i, active)
          return (
            <li
              key={step.n}
              className={`flex items-center gap-3 border-t border-hairline py-3 last:border-b ${
                state === 'In Progress' ? 'bg-paper-sunk/50' : ''
              }`}
            >
              <span className="micro w-5 shrink-0" aria-hidden="true">
                {step.n.toString().padStart(2, '0')}
              </span>

              <span className="min-w-0 flex-1 text-[13.5px] leading-snug text-ink-soft">
                {step.label}
              </span>

              <span className="hidden shrink-0 font-mono text-[10px] text-ink-faint xl:inline">
                {step.object}
              </span>

              <span
                className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-500 ${TAG_STYLES[state]}`}
              >
                {state}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
