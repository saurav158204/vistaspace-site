import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { Timeline } from '../components/ui/Timeline'
import { TechIcon } from '../components/ui/TechIcon'
import { PhotoFrame } from '../components/ui/PhotoFrame'
import { Dashboard } from '../components/dashboard/Dashboard'
import { INNOVATION, JETSON, METHODOLOGY, TECH_GROUPS, TECH_STACK } from '../data/content'
import { PHOTOS } from '../data/media'

export default function Technology() {
  return (
    <PageTransition>
      <section className="section pb-12" aria-labelledby="tech-heading">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Technology & architecture"
            title={<span id="tech-heading">Built for a station, not a server room</span>}
            description="A hybrid of deterministic rules and learned confidence, deployed to edge hardware that assumes no connection to Earth."
          />
        </div>
      </section>

      {/* ---------------------------------------------- INNOVATION COLUMNS */}
      <section className="section rule" aria-labelledby="innovation-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Innovation & uniqueness"
            title={<span id="innovation-heading">What makes this different</span>}
          />

          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
            {INNOVATION.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.07}>
                <div className="flex h-full flex-col gap-6 border-t border-hairline pt-6">
                  <div className="flex items-center gap-3">
                    <Icon name={col.icon} className="h-5 w-5 text-ink-muted" />
                    <h3 className="text-[19px] font-bold tracking-tight">{col.heading}</h3>
                  </div>

                  <ul className="flex flex-col gap-6">
                    {col.points.map((p) => (
                      <li key={p.title} className="flex flex-col gap-1.5">
                        <h4 className="text-[15px] font-semibold text-ink">{p.title}</h4>
                        <p className="text-[14.5px] text-ink-muted">{p.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- JETSON / EDGE */}
      <section className="section rule" aria-labelledby="jetson-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow={JETSON.eyebrow}
            title={<span id="jetson-heading">{JETSON.heading}</span>}
            description={JETSON.intro}
          />

          {/* the hardware itself */}
          <Reveal>
            <figure className="flex flex-col gap-4">
              {/* Hardware shots run desaturated so product colour doesn't fight the
                  monochrome palette. Drop `[&_img]:grayscale` for full colour. */}
              <div className="grid gap-4 sm:grid-cols-3">
                <PhotoFrame
                  src={PHOTOS.jetsonKit.src}
                  alt={PHOTOS.jetsonKit.alt}
                  hint={PHOTOS.jetsonKit.hint}
                  className="aspect-[16/10] w-full [&_img]:grayscale sm:col-span-2"
                />
                <PhotoFrame
                  src={PHOTOS.jetson.src}
                  alt={PHOTOS.jetson.alt}
                  hint={PHOTOS.jetson.hint}
                  className="aspect-[16/10] w-full [&_img]:grayscale sm:aspect-auto"
                />
              </div>
              <figcaption className="micro">
                NVIDIA Jetson — the module the full pipeline is compiled onto
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {JETSON.points.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 border-t border-hairline py-7">
                  <div className="flex items-center justify-between gap-3">
                    <Icon name={p.icon} className="h-5 w-5 text-ink-muted" />
                    <span className="micro">{p.n}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-[14.5px] text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ METHODOLOGY */}
      <section className="section rule" aria-labelledby="methodology-heading">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Methodology"
              title={<span id="methodology-heading">Ten stages, idea to prototype</span>}
              description="Each stage produces something testable — the pipeline is assembled in the order that keeps it verifiable."
            />
          </div>

          <Timeline items={METHODOLOGY.map((s) => ({ n: s.n, title: s.title, body: s.body }))} />
        </div>
      </section>

      {/* ------------------------------------------------------- TECH STACK */}
      <section className="section rule" aria-labelledby="stack-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Tech stack"
            title={<span id="stack-heading">Open-source end to end</span>}
            description="No proprietary licences anywhere in the pipeline — from training through to the edge runtime."
          />

          <div className="flex flex-col gap-10">
            {TECH_GROUPS.map((group, gi) => (
              <Reveal key={group} delay={gi * 0.05}>
                <div className="flex flex-col gap-5 border-t border-hairline pt-6">
                  <h3 className="micro">{group}</h3>

                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {TECH_STACK.filter((t) => t.group === group).map((t) => (
                      <li key={t.name}>
                        <div className="flex items-center gap-3 rounded-lg border border-hairline px-3.5 py-3 transition-colors duration-300 hover:border-ink/30">
                          <span className="text-ink-muted">
                            <TechIcon slug={t.slug} name={t.name} className="h-[18px] w-[18px]" />
                          </span>
                          <span className="truncate font-mono text-[11px] text-ink-soft">{t.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- DASHBOARD */}
      <section className="section rule" aria-labelledby="dashboard-heading">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Interactive dashboard"
            title={<span id="dashboard-heading">The operator console</span>}
            description="A working recreation of the VISTASpace operator view: detection overlays, sequence state, rack-relative 3D tracking, the automated log, and spoken guidance gated behind the 85% confidence threshold. Drag the 3D panel to orbit it."
          />

          <Reveal>
            <Dashboard />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
