/**
 * Technical plates for the prototype-analysis walkthrough.
 * Each is a 800×450 line drawing in the site's print language: ink on paper,
 * hairline strokes, no fills except paper. `t` is a 0–1 playback phase supplied
 * by the parent; at t = 0 every plate is already fully legible.
 */

const INK = '#111111'
const PAPER = '#F4F1EA'
const MUTED = '#6B6B66'
const HAIR = '#DEDAD1'
const SIGNAL = '#FF6A00'

interface PlateProps {
  t: number
}

const baseProps = {
  viewBox: '0 0 800 450',
  className: 'h-full w-full',
  preserveAspectRatio: 'xMidYMid meet',
} as const

/* ------------------------------------------------------------------ 01 */

export function PerceptionPlate({ t }: PlateProps) {
  const j = Math.sin(t * Math.PI * 2) * 2

  // 21-landmark hand, laid out reaching left
  const hand: [number, number][] = [
    [660, 250],
    [636, 268],
    [610, 280],
    [588, 285],
    [568, 284],
    [598, 222],
    [556, 210],
    [524, 204],
    [492, 200],
    [600, 240],
    [556, 236],
    [540, 254],
    [556, 268],
    [604, 258],
    [566, 258],
    [554, 274],
    [568, 284],
    [610, 274],
    [580, 280],
    [572, 294],
    [586, 300],
  ]
  const bones: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17],
  ]

  return (
    <svg {...baseProps} role="img" aria-label="Camera frame with object-detection boxes and a 21-point hand skeleton, tracked against the payload rack">
      <rect x="40" y="30" width="720" height="390" fill={PAPER} stroke={HAIR} />

      {/* rack structure */}
      <g stroke={HAIR} strokeWidth="1">
        <line x1="40" y1="130" x2="760" y2="130" />
        <line x1="40" y1="300" x2="760" y2="300" />
        <line x1="180" y1="30" x2="180" y2="420" />
        <line x1="620" y1="30" x2="620" y2="420" />
      </g>

      {/* body pose skeleton */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85">
        <circle cx="300" cy="180" r="18" />
        <line x1="300" y1="198" x2="300" y2="280" />
        <line x1="300" y1="215" x2="248" y2="255" />
        <line x1="248" y1="255" x2="232" y2="305" />
        <line x1="300" y1="215" x2="352" y2="250" />
        <line x1="352" y1="250" x2="404" y2="268" />
        <line x1="300" y1="280" x2="272" y2="356" />
        <line x1="300" y1="280" x2="332" y2="352" />
      </g>
      {([[300, 198], [300, 215], [248, 255], [232, 305], [352, 250], [404, 268], [300, 280], [272, 356], [332, 352]] as [number, number][]).map(
        ([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill={INK} />,
      )}

      {/* detection boxes */}
      {[
        { x: 196, y: 136, w: 132, h: 118, label: 'cartridge_a', conf: '0.94' },
        { x: 372, y: 216, w: 148, h: 112, label: 'manifold', conf: '0.89' },
      ].map((d) => (
        <g key={d.label}>
          <rect x={d.x + j} y={d.y} width={d.w} height={d.h} fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="7 5" />
          <rect x={d.x + j} y={d.y - 20} width={d.label.length * 7.6 + 34} height="18" fill={INK} />
          <text x={d.x + j + 6} y={d.y - 7} fill={PAPER} fontFamily="monospace" fontSize="11">
            {d.label} {d.conf}
          </text>
        </g>
      ))}

      {/* hand skeleton */}
      <g>
        <rect x="462" y="176" width="220" height="140" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="7 5" />
        <rect x="462" y="156" width="104" height="18" fill={INK} />
        <text x="468" y="169" fill={PAPER} fontFamily="monospace" fontSize="11">hand_r 0.97</text>
        {bones.map(([a, b], i) => (
          <line key={i} x1={hand[a][0]} y1={hand[a][1]} x2={hand[b][0]} y2={hand[b][1]} stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        ))}
        {hand.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 8 ? 5 : 3.2} fill={PAPER} stroke={INK} strokeWidth="1.4" />
        ))}
      </g>

      {/* rack origin marker */}
      <g stroke={INK} strokeWidth="1.4">
        <line x1="690" y1="356" x2="738" y2="356" />
        <line x1="690" y1="356" x2="690" y2="308" />
        <circle cx="690" cy="356" r="4" fill={INK} />
      </g>
      <text x="698" y="374" fill={MUTED} fontFamily="monospace" fontSize="10">RACK ORIGIN</text>

      {/* corner reticles */}
      {([[40, 30, 1, 1], [760, 30, -1, 1], [40, 420, 1, -1], [760, 420, -1, -1]] as [number, number, number, number][]).map(
        ([x, y, dx, dy], i) => (
          <g key={i} stroke={INK} strokeWidth="2">
            <line x1={x} y1={y} x2={x + dx * 22} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + dy * 22} />
          </g>
        ),
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ 02 */

export function FsmPlate({ t }: PlateProps) {
  const nodes = [110, 265, 400, 535, 690]
  const activeIdx = 2
  const pulse = 44 + Math.sin(t * Math.PI * 2) * 5

  return (
    <svg {...baseProps} role="img" aria-label="Finite state machine of five procedure steps with an LSTM confidence lane beneath">
      {/* proximity ring on the active node */}
      <circle cx={nodes[activeIdx]} cy="150" r={pulse} fill="none" stroke={INK} strokeWidth="1" strokeDasharray="4 5" opacity="0.55" />

      {/* transitions */}
      {nodes.slice(0, -1).map((x, i) => (
        <g key={i} stroke={i < activeIdx ? INK : HAIR} strokeWidth="1.5">
          <line x1={x + 28} y1="150" x2={nodes[i + 1] - 34} y2="150" />
          <path
            d={`M ${nodes[i + 1] - 34} 150 l -8 -5 l 0 10 z`}
            fill={i < activeIdx ? INK : HAIR}
            stroke="none"
          />
        </g>
      ))}

      {/* state nodes */}
      {nodes.map((x, i) => {
        const done = i < activeIdx
        const active = i === activeIdx
        return (
          <g key={i}>
            <circle cx={x} cy="150" r="26" fill={done || active ? INK : PAPER} stroke={INK} strokeWidth="1.6" />
            <text
              x={x}
              y="156"
              textAnchor="middle"
              fill={done || active ? PAPER : MUTED}
              fontFamily="monospace"
              fontSize="14"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={x} y="202" textAnchor="middle" fill={MUTED} fontFamily="monospace" fontSize="10">
              {['LATCH', 'RETRIEVE', 'SEAT', 'CONNECT', 'VERIFY'][i]}
            </text>
          </g>
        )
      })}

      <text x="110" y="92" textAnchor="middle" fill={MUTED} fontFamily="monospace" fontSize="10">FSM · DETERMINISTIC</text>

      {/* bracket linking the active node down to the model lane */}
      <path
        d={`M ${nodes[activeIdx]} 196 L ${nodes[activeIdx]} 256`}
        stroke={INK}
        strokeWidth="1.2"
        strokeDasharray="3 4"
        fill="none"
      />

      {/* LSTM confidence lane */}
      <line x1="60" y1="300" x2="740" y2="300" stroke={HAIR} />
      <text x="60" y="288" fill={MUTED} fontFamily="monospace" fontSize="10">LSTM / GRU · MOTION WINDOW</text>

      {Array.from({ length: 30 }).map((_, i) => {
        const x = 62 + i * 23
        const phase = (t * 30 + i) % 30
        const h = 10 + Math.abs(Math.sin((i * 0.6) + t * Math.PI * 2)) * 54
        const near = Math.abs(phase - 15) < 6
        return (
          <rect
            key={i}
            x={x}
            y={300 - h}
            width="12"
            height={h}
            fill={near ? INK : HAIR}
          />
        )
      })}

      {/* agreement gate */}
      <g>
        <rect x="592" y="336" width="148" height="56" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="666" y="360" textAnchor="middle" fill={INK} fontFamily="monospace" fontSize="11">AGREEMENT</text>
        <text x="666" y="378" textAnchor="middle" fill={MUTED} fontFamily="monospace" fontSize="10">FSM ∧ LSTM</text>
      </g>
      <path d="M 560 364 L 586 364 l -8 -5 l 0 10 l 8 -5" stroke={INK} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ 03 */

export function ValidationPlate({ t }: PlateProps) {
  const steps = ['Open rack latch', 'Retrieve cartridge', 'Seat cartridge', 'Connect sample line', 'Verify seal']
  const conf = Math.min(92, Math.round((1 - Math.pow(1 - Math.min(t * 1.35, 1), 3)) * 92))
  const over = conf >= 85

  return (
    <svg {...baseProps} role="img" aria-label="Procedure ladder showing three confirmed steps and an out-of-order jump from step three to step five">
      {/* ladder */}
      {steps.map((s, i) => {
        const y = 76 + i * 62
        const done = i < 3
        const skipped = i === 3
        return (
          <g key={s}>
            <line x1="70" y1={y} x2="470" y2={y} stroke={HAIR} />
            <rect x="70" y={y - 20} width="26" height="26" fill={done ? INK : PAPER} stroke={INK} strokeWidth="1.4" />
            {done && <path d={`M 76 ${y - 8} l 6 7 l 12 -14`} stroke={PAPER} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            {skipped && <line x1="76" y1={y - 14} x2="90" y2={y} stroke={MUTED} strokeWidth="1.6" />}
            <text x="110" y={y - 2} fill={done ? INK : MUTED} fontFamily="monospace" fontSize="13">
              {String(i + 1).padStart(2, '0')}  {s}
            </text>
            <text x="404" y={y - 2} fill={MUTED} fontFamily="monospace" fontSize="10">
              {done ? 'CONFIRMED' : skipped ? 'UNVERIFIED' : 'ATTEMPTED'}
            </text>
          </g>
        )
      })}

      {/* the out-of-order jump: step 3 -> step 5 */}
      <path
        d="M 486 196 C 560 196, 560 320, 486 320"
        fill="none"
        stroke={SIGNAL}
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <path d="M 486 320 l 10 -5 l 0 10 z" fill={SIGNAL} />
      <g transform="translate(556, 244)">
        <line x1="-8" y1="-8" x2="8" y2="8" stroke={SIGNAL} strokeWidth="2.4" />
        <line x1="8" y1="-8" x2="-8" y2="8" stroke={SIGNAL} strokeWidth="2.4" />
      </g>
      <text x="530" y="286" fill={SIGNAL} fontFamily="monospace" fontSize="10">OUT OF ORDER</text>

      {/* confidence gate */}
      <g transform="translate(608, 96)">
        <text x="0" y="0" fill={MUTED} fontFamily="monospace" fontSize="10">CONFIDENCE</text>
        <rect x="0" y="12" width="120" height="196" fill="none" stroke={HAIR} />
        <rect x="0" y={12 + 196 - (196 * conf) / 100} width="120" height={(196 * conf) / 100} fill={over ? SIGNAL : HAIR} opacity={over ? 1 : 0.8} />
        {/* threshold */}
        <line x1="-10" y1={12 + 196 - 196 * 0.85} x2="130" y2={12 + 196 - 196 * 0.85} stroke={INK} strokeWidth="2" />
        <text x="-10" y={12 + 196 - 196 * 0.85 - 6} fill={INK} fontFamily="monospace" fontSize="10">85% THRESHOLD</text>
        <text x="0" y="228" fill={INK} fontFamily="monospace" fontSize="15">{conf}%</text>
        <text x="0" y="246" fill={MUTED} fontFamily="monospace" fontSize="9">
          {over ? 'ALERT RAISED' : 'HOLDING'}
        </text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ 04 */

export function VoicePlate({ t }: PlateProps) {
  const pts = Array.from({ length: 150 }, (_, i) => {
    const x = 180 + i * 3.4
    const env = Math.sin((i / 150) * Math.PI)
    const a = Math.sin(i * 0.5 + t * Math.PI * 4) * 46 * env
    const b = Math.sin(i * 1.7 + t * Math.PI * 6) * 16 * env
    return `${x},${188 + a + b}`
  }).join(' ')

  return (
    <svg {...baseProps} role="img" aria-label="Speech output waveform with the spoken prompt mirrored as text">
      {/* speaker */}
      <g transform="translate(88, 188)">
        <path d="M -26 -14 L -10 -14 L 8 -30 L 8 30 L -10 14 L -26 14 Z" fill={INK} />
        {[16, 28, 40].map((r, i) => (
          <path
            key={r}
            d={`M 18 ${-r * 0.7} A ${r} ${r} 0 0 1 18 ${r * 0.7}`}
            fill="none"
            stroke={INK}
            strokeWidth="2"
            opacity={t > i / 3.4 ? 1 : 0.22}
          />
        ))}
      </g>

      <line x1="180" y1="188" x2="690" y2="188" stroke={HAIR} />
      <polyline points={pts} fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />

      <text x="180" y="96" fill={MUTED} fontFamily="monospace" fontSize="10">ON-DEVICE TEXT-TO-SPEECH</text>

      {/* text mirror */}
      <g transform="translate(180, 268)">
        <rect x="0" y="0" width="510" height="94" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="16" y="28" fill={MUTED} fontFamily="monospace" fontSize="10">TEXT BACKUP</text>
        <text x="16" y="58" fill={INK} fontFamily="monospace" fontSize="15">
          &quot;Action recorded out of order.
        </text>
        <text x="16" y="80" fill={INK} fontFamily="monospace" fontSize="15">
          Return to step 4.&quot;
        </text>
      </g>

      {/* headset path */}
      <path d="M 700 188 L 740 188" stroke={INK} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="748" cy="188" r="8" fill="none" stroke={INK} strokeWidth="1.5" />
      <text x="712" y="164" fill={MUTED} fontFamily="monospace" fontSize="10">CREW</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ 05 */

export function EdgePlate({ t }: PlateProps) {
  const blocks = [
    { x: 248, label: 'YOLO' },
    { x: 360, label: 'MEDIAPIPE' },
    { x: 472, label: 'FSM + LSTM' },
  ]
  const flow = (t * 3) % 3

  return (
    <svg {...baseProps} role="img" aria-label="Block diagram of the pipeline running on one NVIDIA Jetson module, with a local video stream and a JSON downlink">
      {/* camera in */}
      <g transform="translate(74, 188)">
        <rect x="-32" y="-22" width="64" height="44" fill="none" stroke={INK} strokeWidth="1.6" />
        <circle cx="0" cy="0" r="12" fill="none" stroke={INK} strokeWidth="1.6" />
        <circle cx="0" cy="0" r="4" fill={INK} />
        <text x="0" y="46" textAnchor="middle" fill={MUTED} fontFamily="monospace" fontSize="10">CAM-02</text>
      </g>
      <line x1="110" y1="188" x2="196" y2="188" stroke={INK} strokeWidth="1.5" />
      <path d="M 196 188 l -9 -5 l 0 10 z" fill={INK} />

      {/* board */}
      <rect x="196" y="96" width="400" height="184" fill="none" stroke={INK} strokeWidth="2" />
      <text x="212" y="120" fill={INK} fontFamily="monospace" fontSize="12">NVIDIA JETSON · TENSORRT INT8</text>

      {/* board pins */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={210 + i * 24} y1="280" x2={210 + i * 24} y2="292" stroke={INK} strokeWidth="1.4" />
      ))}

      {/* async stages */}
      {blocks.map((b, i) => (
        <g key={b.label}>
          <rect
            x={b.x} y="152" width="100" height="72"
            fill={Math.floor(flow) === i ? INK : PAPER}
            stroke={INK}
            strokeWidth="1.5"
          />
          <text
            x={b.x + 50} y="194"
            textAnchor="middle"
            fill={Math.floor(flow) === i ? PAPER : INK}
            fontFamily="monospace"
            fontSize="10"
          >
            {b.label}
          </text>
          {i < blocks.length - 1 && (
            <path d={`M ${b.x + 100} 188 L ${b.x + 112} 188 l -6 -4 l 0 8 z`} stroke={INK} strokeWidth="1.4" fill={INK} />
          )}
        </g>
      ))}
      <text x="248" y="248" fill={MUTED} fontFamily="monospace" fontSize="9">ASYNCHRONOUS STAGES</text>

      {/* outputs */}
      <line x1="596" y1="150" x2="648" y2="150" stroke={INK} strokeWidth="1.5" />
      <line x1="596" y1="226" x2="648" y2="226" stroke={INK} strokeWidth="1.5" />

      <g transform="translate(648, 126)">
        <rect x="0" y="0" width="112" height="48" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="10" y="20" fill={INK} fontFamily="monospace" fontSize="10">LOCAL STREAM</text>
        <text x="10" y="36" fill={MUTED} fontFamily="monospace" fontSize="9">on-station</text>
      </g>

      <g transform="translate(648, 202)">
        <rect x="0" y="0" width="112" height="48" fill={INK} />
        <text x="10" y="20" fill={PAPER} fontFamily="monospace" fontSize="10">JSON LOG</text>
        <text x="10" y="36" fill={HAIR} fontFamily="monospace" fontSize="9">downlink</text>
      </g>

      {/* no-uplink marker */}
      <g transform="translate(400, 348)">
        <line x1="-60" y1="0" x2="60" y2="0" stroke={HAIR} strokeWidth="1.5" strokeDasharray="5 5" />
        <line x1="-14" y1="-14" x2="14" y2="14" stroke={INK} strokeWidth="2" />
        <line x1="14" y1="-14" x2="-14" y2="14" stroke={INK} strokeWidth="2" />
        <text x="0" y="34" textAnchor="middle" fill={MUTED} fontFamily="monospace" fontSize="10">NO GROUND UPLINK REQUIRED</text>
      </g>
    </svg>
  )
}

export const PLATES = {
  perception: PerceptionPlate,
  fsm: FsmPlate,
  validation: ValidationPlate,
  voice: VoicePlate,
  edge: EdgePlate,
}
