/**
 * All site copy lives here as typed constants.
 * Edit here, not in components.
 */

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

export const BRAND = {
  name: 'VISTASpace',
  mark: 'VISTASPACE',
  expansion: 'Visual Intelligent Sequence Tracking & Alert Assistant',
  tagline:
    'An offline AI co-pilot that watches, validates, and guides every experiment step aboard the Bharatiya Antariksh Station.',
  short: 'On-board experiment validation, running entirely at the edge.',
} as const

/* ------------------------------------------------------------------ */
/* Home — hero                                                         */
/* ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: 'Offline edge AI for crewed spaceflight',
  line1: 'Every Step Watched.',
  line2: 'Every Step Verified.',
  sub: 'VISTASpace watches an astronaut work, checks every action against the procedure, and speaks up the moment a step goes wrong — with no uplink to Earth and no raw video leaving the station.',
  cta: { label: 'Explore the system', to: '/solution' },
  secondary: { label: 'See it running', to: '/prototype' },
} as const

/** Bottom-of-hero strip. Text badges only — no trademarked marks. */
export const HERO_BADGES = {
  label: 'Built on · validated against',
  items: [
    'NVIDIA Jetson',
    'TensorRT INT8',
    'YOLO',
    'MediaPipe',
    'ONNX',
    'FastAPI',
    'NASA-cited research',
    'ISRO / Gaganyaan platforms',
  ],
} as const

/* ------------------------------------------------------------------ */
/* Home — stats                                                        */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  label: string
  display: string
}

export const HOME_STATS: Stat[] = [
  {
    value: 99,
    prefix: '>',
    suffix: '%',
    display: '>99%',
    label: 'bandwidth reduction via structured JSON logs',
  },
  {
    value: 85,
    suffix: '%+',
    display: '85%+',
    label: 'confidence threshold before an alert fires',
  },
  { value: 5, display: '5', label: 'core AI modules' },
  { value: 10, display: '10', label: 'stage development pipeline' },
]

export const HOME_BANNER = {
  eyebrow: 'Mission ready',
  heading: 'Every step verified, 400 km from the nearest engineer.',
  body: 'VISTASpace runs entirely on-board. No uplink required, no raw video downlinked, no waiting for a ground call to confirm a procedure was followed correctly.',
  cta: { label: 'See the architecture', to: '/technology' },
} as const

/* ------------------------------------------------------------------ */
/* Scope                                                               */
/* ------------------------------------------------------------------ */

export interface ScopeItem {
  title: string
  body: string
}

export const SCOPE = {
  eyebrow: 'Scope',
  heading: 'What the system covers',
  intro:
    'VISTASpace is a validation layer for procedural work at a payload rack. It is deliberately bounded — it does one job end to end rather than attempting general-purpose station monitoring.',
  inScope: [
    {
      title: 'Procedural experiment work at a rack',
      body: 'Multi-step experiment sequences performed by a crew member in front of a payload rack, with defined objects and a defined order.',
    },
    {
      title: 'Object and hand perception',
      body: 'Detection of experiment objects and tracking of hand and body pose, resolved relative to the rack rather than a floor.',
    },
    {
      title: 'Step recognition and sequence checking',
      body: 'Advancing through the procedure, and flagging skipped, repeated or out-of-order actions as they happen.',
    },
    {
      title: 'Spoken guidance and audit logging',
      body: 'Hands-free voice prompts for the crew, and a structured, timestamped log for the ground.',
    },
  ] as ScopeItem[],
  outOfScope: [
    {
      title: 'Not a general surveillance system',
      body: 'It watches a defined workspace during a defined procedure. It is not a station-wide monitoring tool.',
    },
    {
      title: 'Not a replacement for crew judgement',
      body: 'It advises and records. The astronaut remains the decision-maker at every step.',
    },
    {
      title: 'Not dependent on a ground link',
      body: 'Nothing in the loop requires Earth connectivity. Downlink is for audit, not for operation.',
    },
  ] as ScopeItem[],
} as const

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

export interface Challenge {
  id: string
  title: string
  body: string
  icon: string
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'ground-support',
    title: 'No Real-Time Ground Support',
    body: 'Communication delay makes live monitoring from Earth impossible.',
    icon: 'SatelliteDish',
  },
  {
    id: 'bandwidth',
    title: 'Bandwidth Constraints',
    body: "Streaming raw video for every experiment isn't viable on restricted data links.",
    icon: 'Gauge',
  },
  {
    id: 'orientation',
    title: 'No Fixed Orientation',
    body: 'Astronauts float freely in microgravity, so standard ground-based pose models fail.',
    icon: 'Orbit',
  },
  {
    id: 'manual-error',
    title: 'Manual Error Risk',
    body: 'Without automated checks, a skipped or out-of-order step can go unnoticed until results are compromised.',
    icon: 'TriangleAlert',
  },
  {
    id: 'training-data',
    title: 'Scarcity of Real Zero-G Training Data',
    body: 'Very little real microgravity footage exists to train or validate the model, unlike abundant Earth-based datasets.',
    icon: 'DatabaseZap',
  },
]

export interface Evidence {
  stat: string
  body: string
  source: string
}

export const PROBLEM_EVIDENCE: Evidence[] = [
  {
    stat: '414',
    body: 'ISS command errors — 22% cognitive overload, 21% time pressure',
    source: 'NASA',
  },
  {
    stat: '4–8s',
    body: 'Performance drops sharply past 4–8s communication delay, forcing crew autonomy',
    source: 'NASA, 2025',
  },
  {
    stat: 'Early-flight',
    body: 'Attention/working memory dip early-flight, raising error risk',
    source: 'Frontiers in Physiology, 2024',
  },
]

/* ------------------------------------------------------------------ */
/* Solution                                                            */
/* ------------------------------------------------------------------ */

export interface Feature {
  id: string
  index: string
  title: string
  body: string
  icon: string
  chips: string[]
}

export const FEATURES: Feature[] = [
  {
    id: 'perception',
    index: '01',
    title: 'AI-Powered Perception',
    body: 'YOLO detects experiment objects and MediaPipe tracks hand/body pose. Optional 3D HMR tracks relative to the experiment rack (no fixed "up").',
    icon: 'ScanEye',
    chips: ['YOLO', 'MediaPipe', '3D HMR'],
  },
  {
    id: 'step-recognition',
    index: '02',
    title: 'Hybrid Step Recognition',
    body: 'A rule-based FSM advances steps using hand-object proximity triggers; an LSTM/GRU model cross-validates.',
    icon: 'GitBranch',
    chips: ['FSM', 'LSTM/GRU', 'Cross-validation'],
  },
  {
    id: 'validation',
    index: '03',
    title: 'Real-Time Sequence Validation',
    body: 'Every confirmed step is checked against the procedure, instantly catching skipped, repeated, or out-of-order actions.',
    icon: 'ListChecks',
    chips: ['Skipped', 'Repeated', 'Out-of-order'],
  },
  {
    id: 'voice',
    index: '04',
    title: 'Voice-Guided, Hands-Free Assistance',
    body: 'Text-to-speech delivers spoken guidance — the next step or an alert on error — with text backup for audio.',
    icon: 'AudioLines',
    chips: ['TTS', 'Hands-free', 'Text backup'],
  },
  {
    id: 'edge',
    index: '05',
    title: 'Offline Edge Processing, Logging & Streaming',
    body: 'Full pipeline runs on NVIDIA Jetson hardware (ONNX/TensorRT); step logging and local station streaming.',
    icon: 'Cpu',
    chips: ['Jetson', 'ONNX/TensorRT', 'JSON logs'],
  },
]

export interface PipelineStage {
  id: string
  label: string
  detail: string
}

export const PIPELINE: PipelineStage[] = [
  { id: 'perception', label: 'Perception', detail: 'YOLO + MediaPipe' },
  { id: 'step', label: 'Step Recognition', detail: 'FSM + LSTM/GRU' },
  { id: 'validation', label: 'Sequence Validation', detail: 'Procedure check' },
  { id: 'voice', label: 'Voice Guidance', detail: 'TTS output' },
  { id: 'logging', label: 'Logging', detail: 'Structured JSON' },
]

/* ------------------------------------------------------------------ */
/* Technology — innovation                                             */
/* ------------------------------------------------------------------ */

export interface InnovationPoint {
  title: string
  body: string
}

export interface InnovationColumn {
  id: string
  heading: string
  icon: string
  points: InnovationPoint[]
}

export const INNOVATION: InnovationColumn[] = [
  {
    id: 'core-technology',
    heading: 'Core Technology',
    icon: 'Cpu',
    points: [
      {
        title: 'Hybrid FSM + ML Design',
        body: 'Deterministic rule-based FSM for step-sequencing + an LSTM/GRU confidence layer for learned robustness — not a single black-box classifier.',
      },
      {
        title: 'Zero-Gravity Purpose Design',
        body: 'Rack-relative 3D Human Mesh Recovery tracks the astronaut against the payload rack instead of a fixed floor.',
      },
      {
        title: 'Fully Integrated Real-Time Pipeline',
        body: 'Detection, pose/hand tracking, step recognition, sequence validation, and voice guidance work as one closed-loop system.',
      },
    ],
  },
  {
    id: 'deployment-and-data',
    heading: 'Deployment and Data',
    icon: 'HardDrive',
    points: [
      {
        title: 'Offline-First Architecture',
        body: 'NVIDIA Jetson + TensorRT edge deployment from day one, no Earth connectivity dependency.',
      },
      {
        title: 'Auditable, Bandwidth-Conscious Telemetry',
        body: 'Raw video → structured, timestamped JSON logs, >99% bandwidth reduction, while still streaming live video to a configured local IP.',
      },
    ],
  },
  {
    id: 'future-and-co-pilot',
    heading: 'Future and Active Co-Pilot',
    icon: 'Rocket',
    points: [
      {
        title: 'Modular & Future-Ready',
        body: 'Ships today with 2D pose estimation + FSM/LSTM core; ST-GCN and dual-stream RGB+skeleton fusion are planned upgrades without redesigning the core system.',
      },
      {
        title: 'Active Co-Pilot, Not a Passive Logger',
        body: 'Corrects the astronaut in the moment — hands-free, voice-guided — rather than only recording after the fact.',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Technology — NVIDIA Jetson edge integration                         */
/* ------------------------------------------------------------------ */

export interface JetsonPoint {
  n: string
  title: string
  body: string
  icon: string
}

export const JETSON = {
  eyebrow: 'Edge integration',
  heading: 'The whole pipeline fits on one Jetson board',
  intro:
    'VISTASpace was designed for edge hardware from the first line of code, not ported to it later. One low-power NVIDIA Jetson module per experiment rack runs detection, pose tracking, step recognition, validation and speech — with no Earth connectivity in the loop.',
  points: [
    {
      n: '01',
      title: 'ONNX export, TensorRT INT8 build',
      body: 'Models are exported to ONNX, then compiled to TensorRT engines with INT8 quantization to fit the board’s compute and power budget.',
      icon: 'Cpu',
    },
    {
      n: '02',
      title: 'Async multi-threaded stages',
      body: 'Perception, step recognition and speech run as separate asynchronous stages so a slow frame never stalls the procedure check.',
      icon: 'GitBranch',
    },
    {
      n: '03',
      title: 'Offline-first by default',
      body: 'No stage of the loop calls out to a network service. The board completes detection, validation and voice guidance on its own.',
      icon: 'HardDrive',
    },
    {
      n: '04',
      title: 'Local streaming and structured logs',
      body: 'Live video is streamed to a configured local IP for on-station viewing, while the durable record downlinked to the ground is timestamped JSON.',
      icon: 'Radio',
    },
    {
      n: '05',
      title: 'One board per rack, phased rollout',
      body: 'Each rack is independent, so the system can be deployed to a single rack first and extended without touching the others.',
      icon: 'Boxes',
    },
    {
      n: '06',
      title: 'Headroom for planned upgrades',
      body: 'ST-GCN and dual-stream RGB + skeleton fusion slot into the same runtime without redesigning the core system.',
      icon: 'Rocket',
    },
  ] as JetsonPoint[],
} as const

/* ------------------------------------------------------------------ */
/* Technology — methodology                                            */
/* ------------------------------------------------------------------ */

export type MethodologyStatus = 'complete' | 'in-progress' | 'next' | 'planned'

export interface MethodologyStep {
  n: number
  id: string
  title: string
  body: string
  status: MethodologyStatus
}

export const METHODOLOGY: MethodologyStep[] = [
  {
    n: 1,
    id: 'analysis',
    title: 'Analysis',
    body: 'Study offline/payload/bandwidth constraints.',
    status: 'complete',
  },
  {
    n: 2,
    id: 'dataset',
    title: 'Dataset',
    body: 'Gather Earth HAR/hand data, synthetic 3D microgravity simulations.',
    status: 'complete',
  },
  { n: 3, id: 'perception', title: 'Perception', body: 'Train YOLO & MediaPipe.', status: 'complete' },
  {
    n: 4,
    id: 'step-recognition',
    title: 'Step Recognition',
    body: 'Hybrid FSM core + LSTM/GRU cross-validation.',
    status: 'next',
  },
  {
    n: 5,
    id: 'sequence-validation',
    title: 'Sequence Validation',
    body: 'Connect steps to procedure, flag anomalies.',
    status: 'planned',
  },
  {
    n: 6,
    id: 'voice-guidance',
    title: 'Voice Guidance',
    body: 'Integrate TTS engine.',
    status: 'planned',
  },
  {
    n: 7,
    id: 'edge-optimization',
    title: 'Edge Optimization',
    body: 'Convert to ONNX, TensorRT INT8.',
    status: 'next',
  },
  {
    n: 8,
    id: 'integration',
    title: 'Integration & Pipeline',
    body: 'FastAPI pipeline, structured logging, local streaming, dashboard.',
    status: 'complete',
  },
  {
    n: 9,
    id: 'system-validation',
    title: 'System Validation',
    body: 'Test simulated sequences, measure accuracy/false-alert rates.',
    status: 'planned',
  },
  {
    n: 10,
    id: 'prototype',
    title: 'Working Prototype',
    body: 'End-to-end demonstrator running on flight-representative hardware.',
    status: 'planned',
  },
]

/* ------------------------------------------------------------------ */
/* Technology — stack                                                  */
/* ------------------------------------------------------------------ */

export interface TechItem {
  name: string
  slug?: string
  group: 'AI & Vision' | 'Backend & Data' | 'Frontend' | 'Edge & Deploy'
}

export const TECH_STACK: TechItem[] = [
  { name: 'Python', slug: 'python', group: 'AI & Vision' },
  { name: 'TensorFlow', slug: 'tensorflow', group: 'AI & Vision' },
  { name: 'PyTorch', slug: 'pytorch', group: 'AI & Vision' },
  { name: 'scikit-learn', slug: 'scikitlearn', group: 'AI & Vision' },
  { name: 'YOLO', group: 'AI & Vision' },
  { name: 'MediaPipe', slug: 'mediapipe', group: 'AI & Vision' },
  { name: 'LSTM/GRU', group: 'AI & Vision' },
  { name: 'HMR', group: 'AI & Vision' },
  { name: 'ST-GCN', group: 'AI & Vision' },
  { name: 'OpenCV', slug: 'opencv', group: 'AI & Vision' },
  { name: 'FFmpeg', slug: 'ffmpeg', group: 'Backend & Data' },
  { name: 'FastAPI', slug: 'fastapi', group: 'Backend & Data' },
  { name: 'Node.js', slug: 'nodedotjs', group: 'Backend & Data' },
  { name: 'Express.js', slug: 'express', group: 'Backend & Data' },
  { name: 'MongoDB', slug: 'mongodb', group: 'Backend & Data' },
  { name: 'SQLite', slug: 'sqlite', group: 'Backend & Data' },
  { name: 'PostgreSQL', slug: 'postgresql', group: 'Backend & Data' },
  { name: 'React', slug: 'react', group: 'Frontend' },
  { name: 'Streamlit', slug: 'streamlit', group: 'Frontend' },
  { name: 'HTML5', slug: 'html5', group: 'Frontend' },
  { name: 'CSS3', slug: 'css3', group: 'Frontend' },
  { name: 'JavaScript', slug: 'javascript', group: 'Frontend' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', group: 'Frontend' },
  { name: 'ONNX', slug: 'onnx', group: 'Edge & Deploy' },
  { name: 'TensorRT', group: 'Edge & Deploy' },
  { name: 'NVIDIA Jetson', slug: 'nvidia', group: 'Edge & Deploy' },
  { name: 'Docker', slug: 'docker', group: 'Edge & Deploy' },
]

export const TECH_GROUPS = ['AI & Vision', 'Backend & Data', 'Frontend', 'Edge & Deploy'] as const

/* ------------------------------------------------------------------ */
/* Dashboard mock                                                      */
/* ------------------------------------------------------------------ */

export const DASHBOARD = {
  systemStatus: 'Offline Mode: Enabled (Edge AI)',
  activeExperiment: 'BIO-EXP-004: Fluidics Setup',
  confidenceThreshold: 85,
} as const

export type SequenceState = 'Confirmed' | 'In Progress' | 'Next Step' | 'Queued'

export interface SequenceStep {
  n: number
  label: string
  object: string
}

export const SEQUENCE_STEPS: SequenceStep[] = [
  { n: 1, label: 'Open payload rack latch', object: 'rack_latch' },
  { n: 2, label: 'Retrieve fluidics cartridge', object: 'cartridge_a' },
  { n: 3, label: 'Seat cartridge in manifold', object: 'manifold' },
  { n: 4, label: 'Connect sample line', object: 'sample_line' },
  { n: 5, label: 'Verify seal and pressurise', object: 'pressure_valve' },
]

export interface LogRow {
  timestamp: string
  action: string
  object: string
  status: 'Confirmed' | 'Pending' | 'Alert'
  notes: string
}

export const LOG_SEED: LogRow[] = [
  {
    timestamp: '04:12:08',
    action: 'Rack latch opened',
    object: 'rack_latch',
    status: 'Confirmed',
    notes: 'FSM trigger + LSTM agree',
  },
  {
    timestamp: '04:12:41',
    action: 'Cartridge retrieved',
    object: 'cartridge_a',
    status: 'Confirmed',
    notes: 'Hand-object proximity 0.94',
  },
  {
    timestamp: '04:13:02',
    action: 'Cartridge seated',
    object: 'manifold',
    status: 'Pending',
    notes: 'Awaiting confidence ≥ 85%',
  },
]

export const LOG_STREAM: LogRow[] = [
  {
    timestamp: '04:13:27',
    action: 'Seal orientation checked',
    object: 'manifold',
    status: 'Confirmed',
    notes: 'Rack-relative pose locked',
  },
  {
    timestamp: '04:13:55',
    action: 'Sample line connected',
    object: 'sample_line',
    status: 'Confirmed',
    notes: 'Step 4 of 5',
  },
  {
    timestamp: '04:14:19',
    action: 'Out-of-order action detected',
    object: 'pressure_valve',
    status: 'Alert',
    notes: 'Step 5 before step 4 verification',
  },
  {
    timestamp: '04:14:33',
    action: 'Crew corrected sequence',
    object: 'sample_line',
    status: 'Confirmed',
    notes: 'Voice prompt acknowledged',
  },
]

export const GUIDANCE_MESSAGES: string[] = [
  'Good detection. Ensure the cartridge is fully seated before releasing.',
  'Step 2 sequence check pending',
  'Next: connect the sample line to the manifold inlet.',
  'Alert — action recorded out of order. Return to step 4.',
]

/* ------------------------------------------------------------------ */
/* Feasibility                                                         */
/* ------------------------------------------------------------------ */

export interface ViabilityQuadrant {
  id: string
  title: string
  icon: string
  points: string[]
}

export const VIABILITY: ViabilityQuadrant[] = [
  {
    id: 'technical',
    title: 'Technical Viability',
    icon: 'Cpu',
    points: [
      'Built on a mature open-source AI/ML stack.',
      'Runs the full pipeline on a single low-power Jetson board per module.',
    ],
  },
  {
    id: 'financial',
    title: 'Financial Viability',
    icon: 'IndianRupee',
    points: [
      'Zero licensing overhead across the entire stack.',
      'One low-power Jetson board per module keeps per-rack hardware cost contained.',
    ],
  },
  {
    id: 'operational',
    title: 'Operational Viability',
    icon: 'Radio',
    points: [
      '100% offline operation — no dependency on an Earth link.',
      'Hands-free TTS guidance through the existing crew headset.',
    ],
  },
  {
    id: 'mission-crew',
    title: 'Mission & Crew Viability',
    icon: 'ShieldCheck',
    points: [
      'Trust through transparency — every decision is logged and auditable.',
      'Reduced cognitive load and fatigue during long procedures.',
    ],
  },
]

export interface RoadmapChallenge {
  challenge: string
  resolution: string
}

export interface RoadmapGroup {
  id: string
  title: string
  icon: string
  items: RoadmapChallenge[]
}

export const ROADMAP: RoadmapGroup[] = [
  {
    id: 'technical',
    title: 'Technical Challenges',
    icon: 'Wrench',
    items: [
      { challenge: 'No fixed orientation', resolution: 'Rack-centric 3D tracking' },
      { challenge: 'Occlusion', resolution: 'Sliding windows 1.5–3.0s' },
      { challenge: 'Limited edge compute', resolution: 'Async multi-threading + TensorRT INT8' },
      { challenge: 'False alerts', resolution: '85%+ confidence across multiple frames' },
      { challenge: 'Scarce zero-G data', resolution: 'Synthetic datasets + transfer learning' },
    ],
  },
  {
    id: 'financial',
    title: 'Financial Challenges',
    icon: 'Coins',
    items: [
      { challenge: 'R&D cost', resolution: 'Gaganyaan/BAS grants' },
      { challenge: 'Licensing', resolution: 'Fully open-source stack' },
      { challenge: 'Upfront cost', resolution: 'Phased one-rack rollout' },
    ],
  },
  {
    id: 'operational',
    title: 'Operational Challenges',
    icon: 'Settings2',
    items: [
      { challenge: 'Scarce astronaut time', resolution: 'Hands-free voice guidance' },
      { challenge: 'Ground visibility', resolution: 'Structured JSON logs' },
      {
        challenge: 'Mid-mission updates',
        resolution: 'Swap a lightweight sequence file, no redeploy',
      },
    ],
  },
]

export const ROADMAP_SUMMARY = {
  title: 'Summary',
  body: 'Modular, open-source, data-driven approach leveraging existing platforms for efficiency.',
} as const

/* ------------------------------------------------------------------ */
/* Impact                                                              */
/* ------------------------------------------------------------------ */

export interface Benefit {
  id: string
  title: string
  icon: string
  points: string[]
}

export const BENEFITS: Benefit[] = [
  {
    id: 'environmental',
    title: 'Environmental',
    icon: 'Leaf',
    points: ['Supports longer autonomous missions', 'Reduces hardware needs'],
  },
  {
    id: 'scientific',
    title: 'Scientific',
    icon: 'FlaskConical',
    points: ['Ensures correct sequence', 'Reduces human error', 'More experiments per mission'],
  },
  {
    id: 'social',
    title: 'Social',
    icon: 'Users',
    points: ['Improves astronaut safety', 'Builds trust in AI'],
  },
  {
    id: 'economic',
    title: 'Economic',
    icon: 'TrendingDown',
    points: ['Lowers support costs', 'Reusable across experiment types'],
  },
  {
    id: 'operational',
    title: 'Operational',
    icon: 'Activity',
    points: ['Removes Earth-comms dependency', 'Reduces bandwidth', 'Immediate error detection'],
  },
]

export interface AudienceImpact {
  id: string
  audience: string
  icon: string
  body: string
}

export const AUDIENCE_IMPACT: AudienceImpact[] = [
  {
    id: 'crew',
    audience: 'Astronauts & Crew',
    icon: 'UserRoundCheck',
    body: 'A hands-free co-pilot that cuts cognitive load.',
  },
  {
    id: 'mission-control',
    audience: 'Mission Control',
    icon: 'MonitorCheck',
    body: 'Structured timestamped logs replace raw-video review for rapid auditing across comms delay.',
  },
  {
    id: 'agencies',
    audience: 'Space Agencies',
    icon: 'Building2',
    body: 'A reusable low-cost validation layer for ISRO/Gaganyaan/BAS racks.',
  },
  {
    id: 'research',
    audience: 'Scientific Research',
    icon: 'Microscope',
    body: 'Consistent, verified execution → reproducible results.',
  },
]

/* ------------------------------------------------------------------ */
/* Prototype                                                           */
/* ------------------------------------------------------------------ */

export const PROTOTYPE_MILESTONE =
  'A functional prototype demonstrates the perception layer (YOLO + MediaPipe) and rule-based FSM step-triggering running end-to-end on recorded lab footage, with the LSTM confidence layer and Jetson edge deployment as the next milestone.'

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export interface TimelineEntry {
  id: string
  year: string
  title: string
  body: string
}

export const RESEARCH_TIMELINE: TimelineEntry[] = [
  {
    id: 'stgcn',
    year: '2018',
    title: 'ST-GCN Published',
    body: 'Yan et al. introduce spatial-temporal graph convolutional networks for skeleton-based action recognition — the basis for the planned skeleton-stream upgrade.',
  },
  {
    id: 'iss-errors',
    year: '—',
    title: 'NASA/ISS Command-Error Study',
    body: '414 recorded ISS command errors, with 22% attributed to cognitive overload and 21% to time pressure.',
  },
  {
    id: 'comm-delay',
    year: '2025',
    title: 'NASA Communication Delay Assessment',
    body: 'Crew performance drops sharply past a 4–8 second communication delay, forcing greater crew autonomy.',
  },
  {
    id: 'physastro',
    year: '2026',
    title: 'PhysAstro-Pose',
    body: 'Pose estimation research targeted at astronaut body tracking in microgravity conditions.',
  },
  {
    id: 'dataset',
    year: 'Ongoing',
    title: 'Dataset Collection & Labeling',
    body: 'Earth-based HAR and hand datasets combined with synthetic 3D microgravity simulations.',
  },
]

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { to: '/problem', label: 'Problem' },
  { to: '/solution', label: 'Solution' },
  { to: '/technology', label: 'Technology' },
  { to: '/feasibility', label: 'Feasibility' },
  { to: '/impact', label: 'Impact' },
  { to: '/prototype', label: 'Prototype' },
  { to: '/research', label: 'Research' },
  { to: '/team', label: 'Team' },
] as const

export const FOOTER_TECH_BADGES = [
  'Python',
  'YOLO',
  'MediaPipe',
  'PyTorch',
  'FastAPI',
  'ONNX',
  'TensorRT',
  'NVIDIA Jetson',
  'React',
] as const
