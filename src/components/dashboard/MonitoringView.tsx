import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const DETECTIONS = [
  { id: 'cartridge_a', label: 'cartridge_a', conf: 0.94, x: 17, y: 30, w: 26, h: 30 },
  { id: 'manifold', label: 'manifold', conf: 0.89, x: 54, y: 46, w: 30, h: 26 },
  { id: 'hand_r', label: 'hand_r', conf: 0.97, x: 38, y: 23, w: 16, h: 16 },
]

const JOINTS: Record<string, [number, number]> = {
  head: [50, 16],
  neck: [50, 26],
  shoulderL: [40, 30],
  shoulderR: [60, 30],
  elbowL: [33, 42],
  elbowR: [67, 41],
  wristL: [40, 50],
  wristR: [60, 52],
  hip: [50, 54],
  kneeL: [43, 72],
  kneeR: [58, 71],
}

const BONES: [string, string][] = [
  ['head', 'neck'],
  ['neck', 'shoulderL'],
  ['neck', 'shoulderR'],
  ['shoulderL', 'elbowL'],
  ['elbowL', 'wristL'],
  ['shoulderR', 'elbowR'],
  ['elbowR', 'wristR'],
  ['neck', 'hip'],
  ['hip', 'kneeL'],
  ['hip', 'kneeR'],
]

/** Mock camera feed rendered as a halftone plate, with ink detection overlays. */
export function MonitoringView() {
  const reduced = useReducedMotion()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setFrame((f) => f + 1), 110)
    return () => window.clearInterval(id)
  }, [reduced])

  const j = (seed: number) => (reduced ? 0 : Math.sin((frame + seed * 7) * 0.12) * 0.55)

  return (
    <section className="flex flex-col" aria-label="Live experiment monitoring view">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <span className="micro">Live monitoring · CAM-02</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" aria-hidden="true" />
          Rec
        </span>
      </div>

      <div className="relative aspect-video w-full overflow-hidden bg-paper-sunk">
        {/* halftone plate standing in for the camera image */}
        <div className="dotscreen absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 60% at 45% 55%, #111 0%, transparent 70%), radial-gradient(ellipse 30% 40% at 78% 40%, #111 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        {/* rack structure */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-x-0 top-[22%] h-px bg-ink/10" />
          <div className="absolute inset-x-0 top-[58%] h-px bg-ink/10" />
          <div className="absolute inset-y-0 left-[14%] w-px bg-ink/10" />
          <div className="absolute inset-y-0 right-[16%] w-px bg-ink/10" />
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Mock camera feed with object-detection boxes and a tracked skeleton overlay"
        >
          {DETECTIONS.map((d, i) => (
            <g key={d.id}>
              <rect
                x={d.x + j(i)}
                y={d.y + j(i + 2)}
                width={d.w}
                height={d.h}
                fill="none"
                stroke="#111"
                strokeWidth="1"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
                opacity="0.8"
              />
            </g>
          ))}

          {BONES.map(([a, b], i) => {
            const [x1, y1] = JOINTS[a]
            const [x2, y2] = JOINTS[b]
            return (
              <line
                key={`${a}-${b}`}
                x1={x1 + j(i)}
                y1={y1 + j(i + 1)}
                x2={x2 + j(i + 3)}
                y2={y2 + j(i + 4)}
                stroke="#111"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}

          {Object.entries(JOINTS).map(([key, [x, y]], i) => (
            <circle
              key={key}
              cx={x + j(i)}
              cy={y + j(i + 1)}
              r="1"
              fill="#F4F1EA"
              stroke="#111"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {DETECTIONS.map((d) => (
          <span
            key={d.id}
            className="absolute rounded-sm bg-ink px-1.5 py-px font-mono text-[9px] leading-tight text-paper"
            style={{ left: `${d.x}%`, top: `calc(${d.y}% - 14px)` }}
          >
            {d.label} {d.conf.toFixed(2)}
          </span>
        ))}

        <div className="absolute bottom-3 left-4 flex gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
          <span>YOLO · 3 objects</span>
          <span>MediaPipe · 11 keypoints</span>
        </div>
        <div className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
          rack-relative
        </div>
      </div>
    </section>
  )
}
