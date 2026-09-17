import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { ROADMAP, ROADMAP_SUMMARY, VIABILITY } from '../data/content'

export default function Feasibility() {
  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="feasibility-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Feasibility & viability"
            title={<span id="feasibility-heading">Deployable on hardware that already flies</span>}
            description="Every component is off-the-shelf and open-source. The constraint that matters is power and compute per rack — and that budget is already met."
          />
        </div>
      </section>

      {/* ------------------------------------------------------- QUADRANTS */}
      <section className="pb-8" aria-label="Viability">
        <div className="shell">
          <div className="grid gap-x-8 sm:grid-cols-2">
            {VIABILITY.map((q, i) => (
              <Reveal key={q.id} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-5 border-t border-hairline py-8">
                  <div className="flex items-center gap-3">
                    <Icon name={q.icon} className="h-5 w-5 text-ink-muted" />
                    <h2 className="text-[19px] font-bold tracking-tight">{q.title}</h2>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {q.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink"
                          aria-hidden="true"
                        />
                        <span className="text-[15px] text-ink-muted">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- ROADMAP */}
      <section className="section rule" aria-labelledby="roadmap-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Strategic roadmap"
            title={<span id="roadmap-heading">Overcoming the challenges</span>}
            description="Each known obstacle is paired with the decision that answers it."
          />

          <div className="flex flex-col gap-14">
            {ROADMAP.map((group, gi) => (
              <Reveal key={group.id} delay={gi * 0.05}>
                <div className="flex flex-col gap-5">
                  <h3 className="flex items-center gap-3 text-[19px] font-bold tracking-tight">
                    <Icon name={group.icon} className="h-5 w-5 text-ink-muted" />
                    {group.title}
                  </h3>

                  <ul className="flex flex-col">
                    {group.items.map((item) => (
                      <li
                        key={item.challenge}
                        className="grid gap-1.5 border-t border-hairline py-4 last:border-b sm:grid-cols-[1fr_28px_1.2fr] sm:items-baseline sm:gap-4"
                      >
                        <span className="text-[15px] text-ink-muted">{item.challenge}</span>
                        <span
                          className="hidden font-mono text-[13px] text-ink-faint sm:block"
                          aria-hidden="true"
                        >
                          →
                        </span>
                        <span className="text-[15px] font-medium text-ink">{item.resolution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.08}>
              <div className="border-t border-hairline pt-8">
                <h3 className="mb-2.5 text-[19px] font-bold tracking-tight">{ROADMAP_SUMMARY.title}</h3>
                <p className="max-w-[62ch] text-[17px] text-ink-soft">{ROADMAP_SUMMARY.body}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
