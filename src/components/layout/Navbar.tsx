import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../../data/content'
import { useUIStore } from '../../store/useUIStore'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { navOpen, setNavOpen } = useUIStore()
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname, setNavOpen])

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [navOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-colors duration-300 ${
        scrolled || navOpen ? 'border-b border-hairline' : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-[72px] items-center justify-between gap-6" aria-label="Main">
        {/* Wordmark */}
        <Link to="/" className="flex shrink-0 items-baseline gap-0.5" aria-label={`${BRAND.name} home`}>
          <span className="text-[17px] font-extrabold tracking-tighter text-ink">{BRAND.mark}</span>
          <span className="font-mono text-[9px] text-ink-muted" aria-hidden="true">
            ®
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `whitespace-nowrap text-[14px] transition-colors duration-200 ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/prototype"
            className="hidden whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-soft sm:inline-flex"
          >
            View Prototype
          </Link>

          <button
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong text-ink transition-colors hover:border-ink lg:hidden"
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
          >
            {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-hairline bg-paper lg:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {NAV_LINKS.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between border-b border-hairline py-3.5 text-[15px] transition-colors ${
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                      }`
                    }
                  >
                    {link.label}
                    <span className="micro">{(i + 1).toString().padStart(2, '0')}</span>
                  </NavLink>
                </li>
              ))}
              <li className="pt-5">
                <Link
                  to="/prototype"
                  className="flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper"
                >
                  View Prototype
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
