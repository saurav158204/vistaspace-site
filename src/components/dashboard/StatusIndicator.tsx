import { DASHBOARD } from '../../data/content'

/** Console header. The orange dot is the one piece of colour on the page. */
export function StatusIndicator() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-hairline px-5 py-4">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-signal" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </span>
        <span className="font-mono text-[12px] text-ink">{DASHBOARD.systemStatus}</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="micro">Jetson · TensorRT INT8</span>
        <span className="micro">No ground uplink</span>
        <span className="micro">Local stream active</span>
      </div>
    </div>
  )
}
