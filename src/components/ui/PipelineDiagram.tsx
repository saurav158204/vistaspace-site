import { motion } from 'framer-motion'
import { PIPELINE } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Perception → Step Recognition → Sequence Validation → Voice Guidance → Logging. */
export function PipelineDiagram() {
  const reduced = useReducedMotion()

  return (
    <div>
      {/* Desktop: horizontal chain */}
      <ol className="hidden items-stretch lg:flex">
        {PIPELINE.map((stage, i) => (
          <li key={stage.id} className="flex flex-1 items-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="flex min-h-[132px] flex-1 flex-col justify-between rounded-xl border border-hairline bg-paper-raised p-5 transition-colors duration-300 hover:border-ink/30"
            >
              <span className="micro">{(i + 1).toString().padStart(2, '0')}</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[15px] font-semibold leading-tight tracking-tight text-ink">
                  {stage.label}
                </span>
                <span className="font-mono text-[10px] text-ink-muted">{stage.detail}</span>
              </div>
            </motion.div>

            {i < PIPELINE.length - 1 && (
              <span
                className="mx-3 flex shrink-0 items-center font-mono text-[13px] text-ink-faint"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Mobile / tablet: stacked */}
      <ol className="flex flex-col lg:hidden">
        {PIPELINE.map((stage, i) => (
          <li key={stage.id} className="border-t border-hairline last:border-b">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-[52px_1fr] items-baseline gap-4 py-5"
            >
              <span className="micro">{(i + 1).toString().padStart(2, '0')}</span>
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold tracking-tight text-ink">{stage.label}</span>
                <span className="font-mono text-[10px] text-ink-muted">{stage.detail}</span>
              </div>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  )
}
