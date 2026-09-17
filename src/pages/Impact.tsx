import { useState } from 'react'
import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { AUDIENCE_IMPACT, BENEFITS } from '../data/content'

const RADIUS = 208

export default function Impact() {
  const [active, setActive] = useState(0)

  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="impact-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Benefits & impact"
            title={<span id="impact-heading">What changes when the station can check itself</span>}
            description="Five categories of benefit radiate from one capability: verified execution, on-board, without an uplink."
          />
        </div>
      </section>

      {/* ------------------------------------------------------ ORBIT VIEW */}
      <section className="pb-8" aria-label="Benefit categories">
        <div className="shell">
          {/* Desktop: radial diagram */}
          <div className="relative mx-auto hidden h-[560px] w-full max-w-[640px] lg:block">
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {[1, 0.72, 0.44].map((s) => (
                <div
                  key={s}
                  className="absolute rounded-full border border-hairline"
                  style={{ width: RADIUS * 2 * s, height: RADIUS * 2 * s }}
                />
              ))}
            </div>

            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              {BENEFITS.map((b, i) => {
                const angle = (i / BENEFITS.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + (Math.cos(angle) * RADIUS * 100) / 640
                const y = 50 + (Math.sin(angle) * RADIUS * 100) / 560
                return (
                  <line
                    key={b.id}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={i === active ? '#111111' : '#DEDAD1'}
                    strokeWidth="1"
                    className="transition-colors duration-500"
                  />
                )
              })}
            </svg>

            {/* hub */}
            <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-full border border-ink bg-paper text-center">
              <span className="text-[14px] font-extrabold tracking-tighter">VISTASPACE</span>
              <span className="px-5 font-mono text-[8.5px] uppercase leading-tight tracking-[0.12em] text-ink-muted">
                verified execution on-board
              </span>
            </div>

            {/* nodes */}
            {BENEFITS.map((b, i) => {
              const angle = (i / BENEFITS.length) * Math.PI * 2 - Math.PI / 2
              const x = Math.cos(angle) * RADIUS
              const y = Math.sin(angle) * RADIUS
              const isActive = i === active

              return (
                <button
                  key={b.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`absolute left-1/2 top-1/2 flex w-[152px] flex-col items-center gap-2.5 rounded-xl border bg-paper p-4 text-center transition-colors duration-300 ${
                    isActive ? 'border-ink' : 'border-hairline hover:border-ink/40'
                  }`}
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  <Icon name={b.icon} className={`h-5 w-5 ${isActive ? 'text-ink' : 'text-ink-muted'}`} />
                  <span
                    className={`text-[14px] font-semibold tracking-tight ${isActive ? 'text-ink' : 'text-ink-muted'}`}
                  >
                    {b.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active readout (desktop) */}
          <div className="mx-auto mt-10 hidden max-w-[560px] lg:block">
            <div className="border-t border-hairline pt-6">
              <h2 className="mb-3 text-[19px] font-bold tracking-tight">{BENEFITS[active].title}</h2>
              <ul className="flex flex-col gap-2">
                {BENEFITS[active].points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-ink-muted">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile / tablet */}
          <div className="grid gap-x-8 sm:grid-cols-2 lg:hidden">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-4 border-t border-hairline py-7">
                  <div className="flex items-center gap-3">
                    <Icon name={b.icon} className="h-5 w-5 text-ink-muted" />
                    <h2 className="text-[17px] font-bold tracking-tight">{b.title}</h2>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px] text-ink-muted">
                        <span
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink"
                          aria-hidden="true"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- AUDIENCE */}
      <section className="section rule" aria-labelledby="audience-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Who it serves"
            title={<span id="audience-heading">Impact by audience</span>}
          />

          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE_IMPACT.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-4 border-t border-hairline py-7">
                  <Icon name={a.icon} className="h-5 w-5 text-ink-muted" />
                  <h3 className="text-[17px] font-bold leading-snug tracking-tight">{a.audience}</h3>
                  <p className="text-[15px] text-ink-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
