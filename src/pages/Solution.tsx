import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { PillButton } from '../components/ui/PillButton'
import { PipelineDiagram } from '../components/ui/PipelineDiagram'
import { FEATURES } from '../data/content'

export default function Solution() {
  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="solution-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="The system"
            title={<span id="solution-heading">Five modules, one closed loop</span>}
            description="Perception, step recognition, validation, guidance and logging run together on a single edge board — each stage feeding the next without a round trip to Earth."
          />
        </div>
      </section>

      {/* ------------------------------------------------------- FEATURES */}
      <section aria-label="Solution features">
        <div className="shell flex flex-col">
          {FEATURES.map((f, i) => {
            const flipped = i % 2 === 1
            return (
              <article key={f.id} className="border-t border-hairline last:border-b">
                <Reveal delay={0.04}>
                  <div
                    className={`grid items-center gap-8 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20 ${
                      flipped ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    {/* copy */}
                    <div className="flex flex-col items-start gap-5">
                      <span className="micro">Module {f.index}</span>
                      <h2 className="display max-w-[16ch] text-[28px] sm:text-[36px]">{f.title}</h2>
                      <p className="max-w-[54ch] text-[16px] text-ink-muted">{f.body}</p>
                      <ul className="flex flex-wrap gap-2 pt-1">
                        {f.chips.map((chip) => (
                          <li
                            key={chip}
                            className="rounded-full border border-hairline-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
                          >
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* visual plate */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline bg-paper-raised">
                      <div className="dotscreen absolute inset-0" aria-hidden="true" />

                      <div className="relative flex h-full flex-col items-center justify-center gap-7 p-8">
                        <Icon name={f.icon} className="h-12 w-12 text-ink" strokeWidth={1} />

                        <div className="w-full max-w-[260px] rounded-lg border border-hairline bg-paper p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="micro">module {f.index}</span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                              active
                            </span>
                          </div>
                          <div className="flex flex-col gap-2">
                            {f.chips.map((chip, k) => (
                              <div key={chip} className="flex items-center gap-2.5">
                                <span className="font-mono text-[10px] text-ink-muted">{chip}</span>
                                <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
                                <span
                                  className="h-[3px] rounded-full bg-ink/70"
                                  style={{ width: `${36 - k * 9}px` }}
                                  aria-hidden="true"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------- PIPELINE */}
      <section className="section" aria-labelledby="pipeline-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Pipeline flow"
            title={<span id="pipeline-heading">From pixels to spoken guidance</span>}
            description="Each stage hands off to the next in a single pass on the edge device. Nothing leaves the station to complete the loop."
          />

          <PipelineDiagram />

          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <PillButton to="/technology">See the architecture</PillButton>
              <PillButton to="/prototype" variant="ghost" arrow={false}>
                Prototype status
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
