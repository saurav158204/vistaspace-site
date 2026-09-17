import { Reveal } from './Reveal'
import type { MethodologyStatus } from '../../data/content'
import { Check } from 'lucide-react'

export interface TimelineItem {
  n?: number
  title: string
  body: string
  meta?: string
  status?: MethodologyStatus
}

interface TimelineProps {
  items: TimelineItem[]
  showStatus?: boolean
  className?: string
}

const statusLabel: Record<MethodologyStatus, string> = {
  complete: 'Complete',
  'in-progress': 'In progress',
  next: 'Next',
  planned: 'Planned',
}

export function Timeline({ items, showStatus = false, className = '' }: TimelineProps) {
  return (
    <ol className={`flex flex-col ${className}`}>
      {items.map((item, i) => {
        const status = item.status ?? 'planned'
        const done = status === 'complete'
        const next = status === 'next'

        return (
          <li key={item.title} className="border-t border-hairline last:border-b">
            <Reveal delay={i * 0.04}>
              <div className="grid gap-x-6 gap-y-2 py-6 sm:grid-cols-[52px_1fr_auto]">
                <span className="micro pt-1">{(item.n ?? i + 1).toString().padStart(2, '0')}</span>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[18px] font-semibold tracking-tight text-ink">{item.title}</h3>
                  {item.meta && <span className="micro">{item.meta}</span>}
                  <p className="max-w-[62ch] text-[15px] text-ink-muted">{item.body}</p>
                </div>

                {showStatus && (
                  <span
                    className={`flex h-fit items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] sm:mt-1 ${
                      done
                        ? 'border-ink bg-ink text-paper'
                        : next
                          ? 'border-ink text-ink'
                          : 'border-hairline-strong text-ink-faint'
                    }`}
                  >
                    {done && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
                    {statusLabel[status]}
                  </span>
                )}
              </div>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
