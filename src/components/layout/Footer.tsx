import { Link } from 'react-router-dom'
import { BRAND, FOOTER_TECH_BADGES, NAV_LINKS } from '../../data/content'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline bg-paper">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-baseline gap-0.5" aria-label={`${BRAND.name} home`}>
              <span className="text-[17px] font-extrabold tracking-tighter text-ink">{BRAND.mark}</span>
              <span className="font-mono text-[9px] text-ink-muted" aria-hidden="true">
                ®
              </span>
            </Link>
            <p className="max-w-sm text-[15px] text-ink-soft">{BRAND.expansion}</p>
            <p className="max-w-sm text-[15px] text-ink-muted">{BRAND.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="micro mb-5">Navigate</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[14px] text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5">
            <h2 className="micro">Built with</h2>
            <ul className="flex flex-wrap gap-1.5">
              {FOOTER_TECH_BADGES.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/research"
              className="inline-flex w-fit items-center gap-1.5 text-[14px] text-ink underline decoration-hairline-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              Research &amp; references ↗
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro">
            {BRAND.name} — {BRAND.short}
          </p>
          <p className="font-mono text-[10px] text-ink-faint">
            Visual Intelligent Sequence Tracking &amp; Alert Assistant
          </p>
        </div>
      </div>
    </footer>
  )
}
