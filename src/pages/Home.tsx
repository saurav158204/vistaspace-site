import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StatCounter } from '../components/ui/StatCounter'
import { PillButton } from '../components/ui/PillButton'
import { Card } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import {
  BRAND,
  CHALLENGES,
  FEATURES,
  HERO,
  HERO_BADGES,
  HOME_BANNER,
  HOME_STATS,
  SCOPE,
} from '../data/content'

const HalftoneHero = lazy(() =>
  import('../components/three/HalftoneHero').then((m) => ({ default: m.HalftoneHero })),
)

export default function Home() {
  return (
    <PageTransition>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden pt-16 sm:pt-20" aria-labelledby="hero-heading">
        <div className="shell flex flex-col items-center gap-7 text-center">
          <Reveal>
            <span className="micro">{HERO.eyebrow}</span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              id="hero-heading"
              className="display text-[42px] leading-[0.94] sm:text-[64px] lg:text-[80px]"
            >
              {HERO.line1}
              <br />
              {HERO.line2}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="lede mx-auto max-w-prose">{HERO.sub}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <PillButton to={HERO.cta.to}>{HERO.cta.label}</PillButton>
              <PillButton to={HERO.secondary.to} variant="ghost" arrow={false}>
                {HERO.secondary.label}
              </PillButton>
            </div>
          </Reveal>
        </div>

        {/* Full-bleed halftone visual */}
        <div className="relative mt-10 sm:mt-14">
          <Suspense fallback={<div className="h-[340px] w-full sm:h-[440px]" />}>
            <HalftoneHero className="h-[340px] sm:h-[420px] lg:h-[480px]" />
          </Suspense>
        </div>

        {/* Built on / validated against */}
        <div className="shell">
          <div className="flex flex-col items-center gap-6 border-t border-hairline pt-9">
            <span className="micro">{HERO_BADGES.label}</span>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {HERO_BADGES.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- STATS */}
      <section className="section" aria-label="Key figures">
        <div className="shell">
          <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {HOME_STATS.map((stat, i) => (
              <div key={stat.label} className="border-t border-hairline pt-6 lg:pt-7">
                <StatCounter stat={stat} index={i} />
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------- WHAT IT DOES */}
      <section className="section rule" aria-labelledby="overview-heading">
        <div className="shell flex flex-col gap-14">
          <SectionHeading
            eyebrow="Overview"
            title={<span id="overview-heading">A validation layer for work done in orbit</span>}
            description={BRAND.tagline}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card className="flex h-full flex-col gap-7 p-7 sm:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="micro">01 · The challenge</span>
                    <h3 className="text-[24px] font-bold tracking-tight">What gets in the way</h3>
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint">05</span>
                </div>

                <ul className="flex flex-col">
                  {CHALLENGES.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-3.5 border-t border-hairline py-3 last:border-b"
                    >
                      <Icon name={c.icon} className="h-4 w-4 shrink-0 text-ink-muted" />
                      <span className="text-[14.5px] text-ink-soft">{c.title}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/problem"
                  className="mt-auto inline-flex w-fit items-center gap-1.5 text-[14px] text-ink underline decoration-hairline-strong underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Read the challenges ↗
                </Link>
              </Card>
            </Reveal>

            <Reveal delay={0.08}>
              <Card className="flex h-full flex-col gap-7 p-7 sm:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="micro">02 · The system</span>
                    <h3 className="text-[24px] font-bold tracking-tight">Five AI modules</h3>
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint">05</span>
                </div>

                <ul className="flex flex-col">
                  {FEATURES.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center gap-3.5 border-t border-hairline py-3 last:border-b"
                    >
                      <Icon name={f.icon} className="h-4 w-4 shrink-0 text-ink-muted" />
                      <span className="text-[14.5px] text-ink-soft">{f.title}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/solution"
                  className="mt-auto inline-flex w-fit items-center gap-1.5 text-[14px] text-ink underline decoration-hairline-strong underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Explore the system ↗
                </Link>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- SCOPE */}
      <section className="section rule" aria-labelledby="scope-heading">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={SCOPE.eyebrow}
              title={<span id="scope-heading">{SCOPE.heading}</span>}
              description={SCOPE.intro}
            />
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-1">
              <span className="micro mb-4">In scope</span>
              <ul className="flex flex-col">
                {SCOPE.inScope.map((s) => (
                  <li key={s.title} className="border-t border-hairline py-5 last:border-b">
                    <h3 className="mb-1.5 text-[17px] font-semibold tracking-tight">{s.title}</h3>
                    <p className="max-w-[60ch] text-[15px] text-ink-muted">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <span className="micro mb-4">Deliberately out of scope</span>
              <ul className="flex flex-col">
                {SCOPE.outOfScope.map((s) => (
                  <li key={s.title} className="border-t border-hairline py-5 last:border-b">
                    <h3 className="mb-1.5 text-[17px] font-semibold tracking-tight text-ink-muted">
                      {s.title}
                    </h3>
                    <p className="max-w-[60ch] text-[15px] text-ink-muted">{s.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CTA BANNER */}
      <section className="section rule" aria-labelledby="cta-heading">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-center gap-6 py-6 text-center">
              <span className="micro">{HOME_BANNER.eyebrow}</span>
              <h2 id="cta-heading" className="display max-w-[20ch] text-[34px] sm:text-[48px]">
                {HOME_BANNER.heading}
              </h2>
              <p className="lede max-w-prose">{HOME_BANNER.body}</p>
              <div className="pt-2">
                <PillButton to={HOME_BANNER.cta.to}>{HOME_BANNER.cta.label}</PillButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
