/**
 * "Prototype analysis" — a chapter-based walkthrough of the pipeline running on a
 * recorded lab sequence. Each chapter pairs a technical plate with pinned
 * annotations, in the manner of an engineering exhibit.
 *
 * The telemetry values are SIMULATED for the walkthrough. Fixed figures (the 85%
 * threshold, 21 hand landmarks, 5 procedure steps) come from the system spec;
 * anything that ticks is illustrative, not a measured benchmark.
 */

export type PlateId = 'perception' | 'fsm' | 'validation' | 'voice' | 'edge'

export interface Annotation {
  id: string
  /** Position on the plate, as a percentage of its box. */
  x: number
  y: number
  text: string
}

export interface Readout {
  label: string
  value: string
  /** true = ticks during playback, to show the stage is live. */
  live?: boolean
}

export interface AnalysisChapter {
  n: string
  id: string
  stage: string
  title: string
  body: string
  plate: PlateId
  annotations: Annotation[]
  readouts: Readout[]
}

export const ANALYSIS_INTRO = {
  eyebrow: 'Prototype analysis',
  title: 'Watch the pipeline think',
  body: 'Five stages, one recorded lab sequence. Step through each stage to see what the system detects, what it decides, and what it hands to the next stage.',
  hint: 'Use the numbers, arrow keys, or the controls below',
  disclaimer: 'Simulated walkthrough · mock telemetry',
} as const

export const ANALYSIS_CHAPTERS: AnalysisChapter[] = [
  {
    n: '01',
    id: 'perception',
    stage: 'Perception',
    title: 'It sees objects and hands, not a room',
    body: 'A single camera frame enters the pipeline. YOLO returns a class and a confidence for every experiment object it recognises. MediaPipe resolves the crew member’s hand into 21 landmarks and the body into a pose skeleton. Every coordinate is expressed relative to the payload rack, so nothing depends on which way is up.',
    plate: 'perception',
    annotations: [
      { id: 'p1', x: 22, y: 34, text: 'YOLO returns a class and confidence for each experiment object' },
      { id: 'p2', x: 63, y: 30, text: 'MediaPipe resolves the hand into 21 landmarks' },
      { id: 'p3', x: 45, y: 74, text: 'Pose skeleton tracked against the rack, not the floor' },
      { id: 'p4', x: 84, y: 60, text: 'The rack frame is the origin — there is no fixed "up"' },
    ],
    readouts: [
      { label: 'Objects detected', value: '3', live: true },
      { label: 'Hand landmarks', value: '21' },
      { label: 'Reference frame', value: 'rack-relative' },
    ],
  },
  {
    n: '02',
    id: 'fsm',
    stage: 'Step recognition',
    title: 'Two opinions before a step advances',
    body: 'A deterministic finite state machine holds the procedure. When a tracked hand crosses the proximity radius of the object a step expects, the FSM proposes a transition. An LSTM/GRU model watches the same window of motion and scores it independently. The step only advances when both agree.',
    plate: 'fsm',
    annotations: [
      { id: 'f1', x: 30, y: 30, text: 'Hand–object proximity crosses the trigger radius' },
      { id: 'f2', x: 52, y: 26, text: 'FSM proposes the transition — deterministic, inspectable' },
      { id: 'f3', x: 52, y: 78, text: 'LSTM/GRU scores the same motion window independently' },
      { id: 'f4', x: 80, y: 52, text: 'Both must agree before the step is committed' },
    ],
    readouts: [
      { label: 'Active step', value: '03 / 05' },
      { label: 'Window', value: '1.5–3.0s' },
      { label: 'Agreement', value: 'FSM + LSTM', live: true },
    ],
  },
  {
    n: '03',
    id: 'validation',
    stage: 'Sequence validation',
    title: 'The catch: an action out of order',
    body: 'Each committed step is checked against the written procedure. Here the crew reaches for the pressure valve — step five — while step four is still unverified. The validator flags the jump immediately. No alert is raised until confidence has held above 85% across multiple frames, which is what keeps the system from crying wolf.',
    plate: 'validation',
    annotations: [
      { id: 'v1', x: 20, y: 30, text: 'Steps 1–3 confirmed and written to the log' },
      { id: 'v2', x: 56, y: 62, text: 'Step 5 attempted before step 4 was verified' },
      { id: 'v3', x: 78, y: 32, text: 'Alert withheld until confidence holds above 85%' },
    ],
    readouts: [
      { label: 'Confidence', value: '—', live: true },
      { label: 'Alert threshold', value: '85%' },
      { label: 'Anomaly', value: 'out-of-order' },
    ],
  },
  {
    n: '04',
    id: 'voice',
    stage: 'Voice guidance',
    title: 'It speaks before the mistake sets',
    body: 'The correction reaches the crew as speech, rendered on the board itself — no network call, no wait. Hands stay on the experiment. Every spoken prompt is mirrored as text, so guidance still lands if audio is unavailable or the cabin is loud.',
    plate: 'voice',
    annotations: [
      { id: 'o1', x: 26, y: 40, text: 'Text-to-speech renders on-device, no network call' },
      { id: 'o2', x: 58, y: 66, text: 'Every prompt is mirrored as text as an audio backup' },
      { id: 'o3', x: 82, y: 38, text: 'Delivered through the crew headset already in use' },
    ],
    readouts: [
      { label: 'Output', value: 'TTS + text' },
      { label: 'Latency path', value: 'on-board' },
      { label: 'Prompt', value: 'return to step 4' },
    ],
  },
  {
    n: '05',
    id: 'edge',
    stage: 'Edge & logging',
    title: 'All of it, on one board',
    body: 'Detection, tracking, step recognition, validation and speech run as asynchronous stages on a single NVIDIA Jetson module, compiled to TensorRT INT8 engines. Live video goes to a configured local address for on-station viewing. What travels to the ground is a structured, timestamped JSON log — the same record, at a fraction of the bandwidth.',
    plate: 'edge',
    annotations: [
      { id: 'e1', x: 20, y: 30, text: 'One Jetson module per experiment rack' },
      { id: 'e2', x: 50, y: 22, text: 'Stages run asynchronously — a slow frame never stalls the check' },
      { id: 'e3', x: 78, y: 42, text: 'Live video to a configured local address' },
      { id: 'e4', x: 78, y: 72, text: 'Structured JSON downlink instead of raw video' },
    ],
    readouts: [
      { label: 'Runtime', value: 'TensorRT INT8' },
      { label: 'Connectivity', value: 'offline' },
      { label: 'Downlink', value: 'JSON' },
    ],
  },
]
