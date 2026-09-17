import { motion } from 'framer-motion'
import { BRAND } from '../../data/content'

interface LoadingScreenProps {
  label?: string
  fullscreen?: boolean
}

export function LoadingScreen({ label = 'Loading', fullscreen = true }: LoadingScreenProps) {
  return (
    <div
      className={
        fullscreen
          ? 'fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-paper'
          : 'flex min-h-[260px] w-full flex-col items-center justify-center gap-6'
      }
      role="status"
      aria-live="polite"
    >
      <span className="text-[17px] font-extrabold tracking-tighter text-ink">{BRAND.mark}</span>

      <div className="h-px w-40 overflow-hidden bg-hairline">
        <motion.span
          className="block h-full w-1/3 bg-ink"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <span className="micro">{label}</span>
    </div>
  )
}
