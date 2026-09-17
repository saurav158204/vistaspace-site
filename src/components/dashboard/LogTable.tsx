import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LOG_SEED, LOG_STREAM } from '../../data/content'
import type { LogRow } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const STATUS_STYLES: Record<LogRow['status'], string> = {
  Confirmed: 'border-ink bg-ink text-paper',
  Pending: 'border-hairline-strong text-ink-muted',
  Alert: 'border-signal text-signal',
}

export function LogTable() {
  const reduced = useReducedMotion()
  const [rows, setRows] = useState<LogRow[]>(reduced ? [...LOG_SEED, ...LOG_STREAM] : LOG_SEED)
  const nextIndex = useRef(0)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return

    const id = window.setInterval(() => {
      const row = LOG_STREAM[nextIndex.current % LOG_STREAM.length]
      nextIndex.current += 1
      setRows((prev) => {
        const next = [...prev, row]
        return next.length > 9 ? next.slice(next.length - 9) : next
      })
    }, 4200)

    return () => window.clearInterval(id)
  }, [reduced])

  useEffect(() => {
    if (reduced || !scroller.current) return
    scroller.current.scrollTop = scroller.current.scrollHeight
  }, [rows, reduced])

  return (
    <section className="flex min-h-0 flex-col" aria-label="Automated experiment log">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <span className="micro">Automated experiment log</span>
        <span className="font-mono text-[10px] text-ink-faint">structured JSON · downlink-ready</span>
      </div>

      <div ref={scroller} className="max-h-[272px] overflow-y-auto overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-paper-raised">
            <tr>
              {['Timestamp', 'Action', 'Detected Object', 'Status', 'Notes'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="border-b border-hairline px-4 py-2.5 font-mono text-[9.5px] font-normal uppercase tracking-[0.16em] text-ink-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((row, i) => (
                <motion.tr
                  key={`${row.timestamp}-${row.action}-${i}`}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="border-b border-hairline last:border-0"
                >
                  <td className="tnum whitespace-nowrap px-4 py-3 font-mono text-[11px] text-ink-muted">
                    {row.timestamp}
                  </td>
                  <td className="px-4 py-3 text-[12.5px] leading-snug text-ink">{row.action}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-ink-muted">
                    {row.object}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${STATUS_STYLES[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11.5px] leading-snug text-ink-muted">{row.notes}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </section>
  )
}
