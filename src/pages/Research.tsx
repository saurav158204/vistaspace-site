import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { RESEARCH_TIMELINE } from '../data/content'
import { REFERENCE_GROUPS } from '../data/references'

export default function Research() {
  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="research-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Research & references"
            title={<span id="research-heading">The evidence behind the build</span>}
            description="Published work that establishes both the problem and the methods VISTASpace relies on."
          />
        </div>
      </section>

      {/* -------------------------------------------------------- TIMELINE */}
      <section className="pb-8" aria-labelledby="timeline-heading">
        <div className="shell flex flex-col gap-12">
          <SectionHeading eyebrow="Timeline" title={<span id="timeline-heading">How the ground shifted</span>} />

          <ol className="flex flex-col">
            {RESEARCH_TIMELINE.map((entry, i) => (
              <li key={entry.id} className="border-t border-hairline last:border-b">
                <Reveal delay={i * 0.05}>
                  <div className="grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[110px_1fr]">
                    <span className="micro pt-1.5">{entry.year}</span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[19px] font-bold tracking-tight">{entry.title}</h3>
                      <p className="max-w-[64ch] text-[15px] text-ink-muted">{entry.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------ REFERENCES */}
      <section className="section rule" aria-labelledby="refs-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Source list"
            title={<span id="refs-heading">References</span>}
            description="Grouped by what each source supports. External links open in a new tab."
          />

          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
            {REFERENCE_GROUPS.map((group, gi) => (
              <Reveal key={group.id} delay={gi * 0.06}>
                <div className="flex h-full flex-col gap-5 border-t border-hairline pt-6">
                  <div className="flex items-center gap-3">
                    <Icon name={group.icon} className="h-5 w-5 text-ink-muted" />
                    <h3 className="text-[18px] font-bold tracking-tight">{group.title}</h3>
                  </div>

                  <p className="text-[14.5px] text-ink-muted">{group.description}</p>

                  <ul className="flex flex-col">
                    {group.items.map((ref) => (
                      <li key={ref.id} className="border-t border-hairline last:border-b">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-1 py-3.5"
                        >
                          <span className="text-[14.5px] font-medium text-ink transition-colors group-hover:text-ink-muted">
                            {ref.title}{' '}
                            <span aria-hidden="true" className="text-ink-faint">
                              ↗
                            </span>
                          </span>
                          <span className="text-[13px] leading-snug text-ink-muted">{ref.detail}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
