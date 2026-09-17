import { Github, Linkedin, Mail } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { PhotoFrame } from '../components/ui/PhotoFrame'
import { TEAM_MEMBERS, TEAM_META, TEAM_NAME } from '../data/team'
import { PHOTOS } from '../data/media'

const STREAM_SHORT: Record<string, string> = {
  'Mechanical Engineering': 'MECH',
  'Computer Engineering': 'COMP',
  'Electronics & Telecommunication': 'ENTC',
}

export default function Team() {
  const lead = TEAM_MEMBERS.find((m) => m.role === 'Team Lead')
  const streams = [...new Set(TEAM_MEMBERS.map((m) => m.stream))]

  return (
    <PageTransition>
      {/* ------------------------------------------------------------ HERO */}
      <section className="section pb-10" aria-labelledby="team-heading">
        <div className="shell grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              as="h1"
              eyebrow="The team"
              title={<span id="team-heading">{TEAM_NAME}</span>}
              description={`Six engineers across mechanical, computer and electronics streams at ${TEAM_META.institute}, building VISTASpace end to end — perception, edge deployment, and the crew-facing interface.`}
            />
          </div>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-5 border-t border-hairline pt-6 lg:border-t-0 lg:pt-0">
              <img
                src={TEAM_META.crest}
                alt={`${TEAM_META.institute} crest`}
                className="h-20 w-auto shrink-0"
              />
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold leading-snug text-ink">
                  {TEAM_META.institute}
                </span>
                <span className="text-[13px] leading-snug text-ink-muted">{TEAM_META.location}</span>
                <span className="micro mt-1">{TEAM_META.motto}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- QUICK FACTS */}
      <section className="pb-16" aria-label="Team at a glance">
        <div className="shell">
          <dl className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: 'Members', v: String(TEAM_MEMBERS.length) },
              { k: 'Streams', v: String(streams.length) },
              { k: 'Team lead', v: lead?.name ?? '—' },
              { k: 'Affiliation', v: 'SPPU' },
            ].map((s) => (
              <div key={s.k} className="border-t border-hairline py-5">
                <dt className="micro mb-2">{s.k}</dt>
                <dd className="text-[17px] font-semibold tracking-tight text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ ROSTER */}
      <section className="pb-20" aria-label="Team members">
        <div className="shell">
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((m, i) => (
              <li key={m.id}>
                <Reveal delay={i * 0.05}>
                  <article className="flex h-full flex-col gap-5 border-t border-hairline py-8">
                    <PhotoFrame
                      src={m.photo}
                      alt={`${m.name}, ${m.focus}`}
                      hint={`Portrait of ${m.name} — square crop`}
                      kind="portrait"
                      className="aspect-square w-full"
                      rounded="rounded-lg"
                    />

                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="text-[19px] font-bold tracking-tight text-ink">{m.name}</h2>
                        {m.role === 'Team Lead' && (
                          <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper">
                            Lead
                          </span>
                        )}
                      </div>
                      <span className="micro">
                        {STREAM_SHORT[m.stream]} · {m.yearLabel}
                      </span>
                    </div>

                    <p className="flex-1 text-[14.5px] leading-snug text-ink-muted">{m.focus}</p>

                    <div className="flex flex-col gap-3">
                      <span className="break-all font-mono text-[11px] text-ink-faint">{m.stream}</span>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${m.email}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-ink hover:text-ink"
                          aria-label={`Email ${m.name}`}
                        >
                          <Mail className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                        {m.links?.github && (
                          <a
                            href={m.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-ink hover:text-ink"
                            aria-label={`${m.name} on GitHub`}
                          >
                            <Github className="h-4 w-4" strokeWidth={1.5} />
                          </a>
                        )}
                        {m.links?.linkedin && (
                          <a
                            href={m.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-ink hover:text-ink"
                            aria-label={`${m.name} on LinkedIn`}
                          >
                            <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- GROUP SHOT */}
      <section className="section rule" aria-labelledby="group-heading">
        <div className="shell flex flex-col gap-10">
          <SectionHeading
            eyebrow="Together"
            title={<span id="group-heading">{TEAM_NAME}, in one frame</span>}
          />
          <Reveal>
            <PhotoFrame
              src={PHOTOS.teamGroup.src}
              alt={PHOTOS.teamGroup.alt}
              hint={PHOTOS.teamGroup.hint}
              className="aspect-[16/9] w-full"
            />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
