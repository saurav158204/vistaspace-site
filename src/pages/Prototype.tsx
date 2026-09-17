import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Timeline } from '../components/ui/Timeline'
import { PhotoFrame } from '../components/ui/PhotoFrame'
import { Dashboard } from '../components/dashboard/Dashboard'
import { PrototypeAnalysis } from '../components/analysis/PrototypeAnalysis'
import { ANALYSIS_INTRO } from '../data/analysis'
import { METHODOLOGY, PROTOTYPE_MILESTONE } from '../data/content'
import { PHOTOS } from '../data/media'

export default function Prototype() {
  const complete = METHODOLOGY.filter((s) => s.status === 'complete').length
  const next = METHODOLOGY.filter((s) => s.status === 'next').length
  const planned = METHODOLOGY.filter((s) => s.status === 'planned').length
  const pct = Math.round((complete / METHODOLOGY.length) * 100)

  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="prototype-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Prototype status"
            title={<span id="prototype-heading">Where the build stands today</span>}
          />
        </div>
      </section>

      {/* -------------------------------------------------------- MILESTONE */}
      <section className="pb-16" aria-label="Current milestone">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 border-t border-hairline pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div className="flex flex-col gap-8">
                <span className="micro">Current milestone</span>

                <p className="max-w-[44ch] text-[22px] font-medium leading-[1.35] tracking-tight text-ink sm:text-[26px]">
                  {PROTOTYPE_MILESTONE}
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    <span>Pipeline progress</span>
                    <span className="text-ink">
                      <span className="tnum">{complete}</span> / {METHODOLOGY.length} stages complete
                    </span>
                  </div>

                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-paper-sunk"
                    role="meter"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${pct} percent of development stages complete`}
                  >
                    <div className="h-full rounded-full bg-ink" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="flex flex-wrap gap-x-7 gap-y-2 pt-1">
                    <span className="micro-ink">{complete} complete</span>
                    <span className="micro">{next} next</span>
                    <span className="micro">{planned} planned</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* The rig shot stays in full colour — it is the one photograph of
                    the actual workspace, and desaturating it would flatten it into
                    the diagrams. */}
                <PhotoFrame
                  src={PHOTOS.rig.src}
                  alt={PHOTOS.rig.alt}
                  hint={PHOTOS.rig.hint}
                  className="col-span-2 aspect-[16/9] w-full"
                />
                <PhotoFrame
                  src={PHOTOS.jetson.src}
                  alt={PHOTOS.jetson.alt}
                  hint={PHOTOS.jetson.hint}
                  className="aspect-[4/3] w-full [&_img]:grayscale"
                />
                <PhotoFrame
                  src={PHOTOS.jetsonBoard.src}
                  alt={PHOTOS.jetsonBoard.alt}
                  hint={PHOTOS.jetsonBoard.hint}
                  className="aspect-[4/3] w-full [&_img]:grayscale"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- ANALYSIS EXPERIENCE */}
      <section className="section rule" aria-labelledby="analysis-heading">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow={ANALYSIS_INTRO.eyebrow}
            title={<span id="analysis-heading">{ANALYSIS_INTRO.title}</span>}
            description={ANALYSIS_INTRO.body}
          />

          <Reveal>
            <PrototypeAnalysis />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- TRACKER */}
      <section className="section rule" aria-labelledby="tracker-heading">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Development tracker"
              title={<span id="tracker-heading">Ten stages, marked honestly</span>}
              description="Analysis, dataset, perception and the integration pipeline are done. The LSTM confidence layer and Jetson edge deployment are the next milestones."
            />
          </div>

          <Timeline
            showStatus
            items={METHODOLOGY.map((s) => ({
              n: s.n,
              title: s.title,
              body: s.body,
              status: s.status,
            }))}
          />
        </div>
      </section>

      {/* ------------------------------------------------------- LIVE DEMO */}
      <section className="section rule" aria-labelledby="demo-heading">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Operator console"
            title={<span id="demo-heading">What the crew sees</span>}
            description="The same console recreated on the Technology page, driven by mock data. It shows how the perception layer, sequence state and automated log present during a run."
          />

          <Reveal>
            <Dashboard />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
