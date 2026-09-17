import { Suspense, lazy } from 'react'
import { StatusIndicator } from './StatusIndicator'
import { SequencePanel } from './SequencePanel'
import { MonitoringView } from './MonitoringView'
import { LogTable } from './LogTable'
import { GuidanceBar } from './GuidanceBar'
import { LoadingScreen } from '../layout/LoadingScreen'

const DashboardPoseViewer = lazy(() =>
  import('../three/DashboardPoseViewer').then((m) => ({ default: m.DashboardPoseViewer })),
)

interface DashboardProps {
  title?: string
  className?: string
}

export function Dashboard({ title, className = '' }: DashboardProps) {
  return (
    <div className={className}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="micro">{title}</h3>
          <span className="font-mono text-[10px] text-ink-faint">VISTASpace console · mock data</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-hairline bg-paper-raised">
        <StatusIndicator />

        {/* Upper deck: the camera view, beside where the crew is in the procedure. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr]">
          <div className="flex min-w-0 flex-col">
            <MonitoringView />
          </div>
          <div className="flex min-w-0 flex-col border-hairline lg:border-l">
            <SequencePanel />
          </div>
        </div>

        {/* Lower deck: the automated log, beside the rack-relative 3D view.
            Splits at xl, not lg — the five-column log needs the width. */}
        <div className="grid grid-cols-1 border-t border-hairline xl:grid-cols-[1.35fr_1fr]">
          <div className="flex min-w-0 flex-col">
            <LogTable />
          </div>

          <div className="flex min-w-0 flex-col border-t border-hairline xl:border-l xl:border-t-0">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
              <span className="micro">3D structure · rack-relative</span>
              <span className="font-mono text-[10px] text-ink-faint">drag to orbit</span>
            </div>
            <Suspense fallback={<LoadingScreen fullscreen={false} label="Loading 3D view" />}>
              <DashboardPoseViewer className="h-[260px] w-full flex-1" />
            </Suspense>
          </div>
        </div>

        <GuidanceBar />
      </div>
    </div>
  )
}
