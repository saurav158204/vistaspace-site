import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { LoadingScreen } from './components/layout/LoadingScreen'
import { InkFlow } from './components/visual/InkFlow'
import { useUIStore } from './store/useUIStore'

/* Route-level code splitting. */
const Home = lazy(() => import('./pages/Home'))
const Problem = lazy(() => import('./pages/Problem'))
const Solution = lazy(() => import('./pages/Solution'))
const Technology = lazy(() => import('./pages/Technology'))
const Feasibility = lazy(() => import('./pages/Feasibility'))
const Impact = lazy(() => import('./pages/Impact'))
const Prototype = lazy(() => import('./pages/Prototype'))
const Research = lazy(() => import('./pages/Research'))
const Team = lazy(() => import('./pages/Team'))
const NotFound = lazy(() => import('./pages/NotFound'))

const TITLES: Record<string, string> = {
  '/': 'VISTASpace — Visual Intelligent Sequence Tracking & Alert Assistant',
  '/problem': 'The Challenge — VISTASpace',
  '/solution': 'Solution & Features — VISTASpace',
  '/technology': 'Technology & Architecture — VISTASpace',
  '/feasibility': 'Feasibility & Viability — VISTASpace',
  '/impact': 'Benefits & Impact — VISTASpace',
  '/prototype': 'Prototype Status — VISTASpace',
  '/research': 'Research & References — VISTASpace',
  '/team': 'Team — VISTASpace',
}

function useDocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'VISTASpace'
  }, [pathname])
}

export default function App() {
  const location = useLocation()
  const booting = useUIStore((s) => s.booting)
  const finishBoot = useUIStore((s) => s.finishBoot)
  useDocumentTitle()

  useEffect(() => {
    const t = window.setTimeout(finishBoot, 650)
    return () => window.clearTimeout(t)
  }, [finishBoot])

  return (
    <div className="grain relative flex min-h-screen flex-col">
      {booting && <LoadingScreen />}

      {/* No background on the wrapper — `body` paints the paper ground, which lets
          this fixed -z-10 canvas sit between it and the page content. */}
      <InkFlow />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />
      <ScrollToTop />

      <div className="flex flex-1 flex-col pt-[72px]">
        <Suspense fallback={<LoadingScreen fullscreen={false} label="Loading" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/problem" element={<Problem />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/feasibility" element={<Feasibility />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/prototype" element={<Prototype />} />
              <Route path="/research" element={<Research />} />
              <Route path="/team" element={<Team />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>

      <Footer />
    </div>
  )
}
