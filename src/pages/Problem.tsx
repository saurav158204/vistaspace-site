import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { CHALLENGES, PROBLEM_EVIDENCE } from '../data/content'

export default function Problem() {
  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="problem-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="The challenge"
            title={<span id="problem-heading">Why this is hard in orbit</span>}
            description="Monitoring a science experiment on an orbital station breaks four assumptions that ground-based computer vision takes for granted — and starves the model of the data it would normally learn from."
          />
        </div>
      </section>

      {/* ------------------------------------------------- CHALLENGE LIST */}
      <section className="pb-8" aria-label="The five core challenges">
        <div className="shell">
          <ol className="flex flex-col">
            {CHALLENGES.map((c, i) => (
              <li key={c.id} className="border-t border-hairline last:border-b">
                <Reveal delay={i * 0.05}>
                  <article className="grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[64px_1fr] lg:grid-cols-[64px_0.85fr_1.15fr]">
                    <span className="micro pt-1.5">{(i + 1).toString().padStart(2, '0')}</span>

                    <div className="flex items-start gap-4">
                      <Icon name={c.icon} className="mt-1 h-5 w-5 shrink-0 text-ink-muted" />
                      <h2 className="text-[21px] font-bold leading-tight tracking-tight sm:text-[24px]">
                        {c.title}
                      </h2>
                    </div>

                    <p className="max-w-[58ch] text-[15.5px] text-ink-muted sm:col-start-2 lg:col-start-3">
                      {c.body}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------- EVIDENCE STRIP */}
      <section className="section rule" aria-labelledby="evidence-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Validation"
            title={<span id="evidence-heading">This is measured, not assumed</span>}
            description="Published spaceflight research already quantifies the error risk VISTASpace is built to catch."
          />

          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {PROBLEM_EVIDENCE.map((e, i) => (
              <Reveal key={e.source + e.stat} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-4 border-t border-hairline pt-6">
                  <span className="display text-[40px] sm:text-[46px]">{e.stat}</span>
                  <p className="flex-1 text-[15px] text-ink-soft">{e.body}</p>
                  <span className="micro">{e.source}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-[14px] text-ink-muted">
              Full citations on the{' '}
              <a href="/research" className="text-ink underline decoration-hairline-strong underline-offset-4 hover:decoration-ink">
                Research &amp; References
              </a>{' '}
              page.
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
