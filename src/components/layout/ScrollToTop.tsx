import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Router pages keep the previous scroll offset by default; reset it on navigation. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
