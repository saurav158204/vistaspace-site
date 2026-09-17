import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { ANALYSIS_CHAPTERS, ANALYSIS_INTRO } from '../../data/analysis'
import type { PlateId } from '../../data/analysis'
import { PLATES } from './AnalysisPlates'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const LOOP_MS = 6200

/**
 * Playback phase, isolated in its own hook so the ~60fps tick only re-renders the
 * leaf that needs it. Keeping it in the parent re-rendered the whole section every
 * frame, which starved AnimatePresence's exit and left the copy on the old chapter.
 */
function usePhase(playing: boolean, reduced: boolean) {
  const [t, setT] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) {
      setT(1)
      return
    }
    if (!playing) return

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      setT(((now - start) % LOOP_MS) / LOOP_MS)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, reduced])

  return t
}

/** The ticking plate. Remounts per chapter, so its phase restarts with the stage. */
function AnimatedPlate({
  plate,
  playing,
  reduced,
}: {
  plate: PlateId
  playing: boolean
  reduced: boolean
}) {
  const t = usePhase(playing, reduced)
  const Plate = PLATES[plate]
  return <Plate t={t} />
}

/** Confidence climbs toward the 85% gate — its own ticker, for the same reason. */
function LiveConfidence({ playing, reduced }: { playing: boolean; reduced: boolean }) {
  const t = usePhase(playing, reduced)
  return <>{Math.min(92, Math.round(t * 92))}%</>
}

export function PrototypeAnalysis() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [activeAnn, setActiveAnn] = useState<string | null>(null)

  const chapter = ANALYSIS_CHAPTERS[index]

  const go = useCallback((next: number) => {
    const n = (next + ANALYSIS_CHAPTERS.length) % ANALYSIS_CHAPTERS.length
    setIndex(n)
    setActiveAnn(null)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    }
  }

  const active = chapter.annotations.find((a) => a.id === activeAnn) ?? null

  return (
    <div className="flex flex-col gap-8">
      {/* ------------------------------------------------ chapter rail */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-hairline pb-5">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
          {ANALYSIS_CHAPTERS.map((c, i) => {
            const on = i === index
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={on ? 'step' : undefined}
                  className={`flex items-baseline gap-2 rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    on ? 'bg-ink text-paper' : 'text-ink-muted hover:bg-paper-sunk hover:text-ink'
                  }`}
                >
                  <span>{c.n}</span>
                  <span className="hidden sm:inline">{c.stage}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="flex items-center gap-4">
          <span className="micro hidden md:inline">{ANALYSIS_INTRO.disclaimer}</span>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-strong text-ink transition-colors hover:border-ink"
              aria-label={playing ? 'Pause the walkthrough animation' : 'Play the walkthrough animation'}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* --------------------------------------------------- main body */}
      <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
        {/* copy */}
        <div className="flex flex-col gap-5">
          {/* Keyed remount gives a drift on change. Deliberately never animates
              opacity from 0: if rAF is throttled (background tab, hidden window)
              a stalled animation must not be able to hide the copy. */}
          <motion.div
            key={chapter.id}
            initial={reduced ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-baseline gap-3">
              <span className="display text-[40px] leading-none">{chapter.n}</span>
              <span className="micro">{chapter.stage}</span>
            </div>

            <h3 className="display max-w-[16ch] text-[24px] sm:text-[28px]">{chapter.title}</h3>
            <p className="max-w-[46ch] text-[15px] text-ink-muted">{chapter.body}</p>
          </motion.div>

          {/* readouts */}
          <dl className="mt-1 flex flex-col">
            {chapter.readouts.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-4 border-t border-hairline py-2.5 last:border-b"
              >
                <dt className="micro">{r.label}</dt>
                <dd className="flex items-center gap-2 font-mono text-[12px] text-ink">
                  {r.live && !reduced && (
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" aria-hidden="true" />
                  )}
                  {r.label === 'Confidence' ? (
                    <LiveConfidence playing={playing} reduced={reduced} />
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-strong font-mono text-[13px] text-ink transition-colors hover:border-ink"
              aria-label="Previous stage"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-strong font-mono text-[13px] text-ink transition-colors hover:border-ink"
              aria-label="Next stage"
            >
              →
            </button>
            <span className="micro ml-2">
              {chapter.n} / {String(ANALYSIS_CHAPTERS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* plate */}
        <div
          className="relative"
          role="group"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label={`Prototype analysis, stage ${chapter.n}: ${chapter.stage}. Use left and right arrow keys to change stage.`}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-hairline bg-paper-raised">
            <div className="dotscreen absolute inset-0" aria-hidden="true" />

            <motion.div
              key={chapter.id}
              initial={reduced ? false : { scale: 0.985 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 p-2 sm:p-4"
            >
              <AnimatedPlate plate={chapter.plate} playing={playing} reduced={reduced} />
            </motion.div>

            {/* annotation hotspots */}
            {chapter.annotations.map((a, i) => {
              const on = activeAnn === a.id
              const flip = a.x > 56
              return (
                <div key={a.id} className="absolute z-10" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveAnn(a.id)}
                    onMouseLeave={() => setActiveAnn(null)}
                    onFocus={() => setActiveAnn(a.id)}
                    onBlur={() => setActiveAnn(null)}
                    onClick={() => setActiveAnn(on ? null : a.id)}
                    aria-label={a.text}
                    className={`relative -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[9px] transition-colors duration-200 ${
                      on ? 'border-ink bg-ink text-paper' : 'border-ink bg-paper text-ink hover:bg-ink hover:text-paper'
                    }`}
                  >
                    {!on && !reduced && (
                      <span
                        className="absolute inset-0 animate-pulse-dot rounded-full border border-ink"
                        aria-hidden="true"
                      />
                    )}
                    {i + 1}
                  </button>

                  {on && (
                    <div
                      className={`pointer-events-none absolute top-1/2 hidden w-[230px] -translate-y-1/2 rounded-lg border border-ink bg-paper px-3.5 py-2.5 text-[12.5px] leading-snug text-ink shadow-[0_2px_0_0_rgba(17,17,17,1)] lg:block ${
                        flip ? 'right-5' : 'left-5'
                      }`}
                    >
                      {a.text}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* caption list — the accessible / small-screen path */}
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:hidden">
            {chapter.annotations.map((a, i) => (
              <li key={a.id} className="flex items-start gap-3 border-t border-hairline py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink font-mono text-[9px]">
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-snug text-ink-muted">{a.text}</span>
              </li>
            ))}
          </ul>

          {/* fixed-height line so hovering never shifts the layout */}
          <p className="mt-4 hidden min-h-[20px] text-[13px] text-ink-muted lg:block">
            {active ? active.text : `Hover a marker to read the annotation · ${ANALYSIS_INTRO.hint}`}
          </p>
        </div>
      </div>
    </div>
  )
}
