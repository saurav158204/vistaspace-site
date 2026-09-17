/**
 * Team data.
 *
 * Names, roles, streams, academic years and institute email addresses are taken
 * from the team's own nomination letterhead.
 *
 * DELIBERATELY NOT INCLUDED: personal mobile numbers. They are on the source
 * document but publishing them on a public site is a privacy risk. Add a `phone`
 * field here and render it in Team.tsx if you actually want them public.
 *
 * `focus` is the one field NOT taken from the document — it is a suggested
 * functional role derived from each member's stream. Edit freely.
 */

export const PLACEHOLDER = false

export const TEAM_NAME = 'AIT_0Gravity'

export const TEAM_META = {
  institute: 'Army Institute of Technology',
  location: 'Dighi Hills, Alandi Road, Pune 411015',
  affiliation: 'Affiliated to Savitribai Phule Pune University',
  motto: 'Onward to Glory',
  /** public/images/ait-crest.png — extracted from the institute letterhead */
  crest: '/images/ait-crest.png',
} as const

export type Stream = 'Mechanical Engineering' | 'Computer Engineering' | 'Electronics & Telecommunication'

export interface TeamMember {
  id: string
  name: string
  /** Team position as recorded on the nomination document. */
  role: 'Team Lead' | 'Team Member'
  /** Suggested functional role — edit to match how you actually split the work. */
  focus: string
  stream: Stream
  /** Short form as written on the document (TE / BE). */
  year: string
  yearLabel: string
  email: string
  /** '/images/team/name.jpg' once you drop a photo in, or null for the initial tile. */
  photo: string | null
  links?: {
    github?: string
    linkedin?: string
  } | null
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'saurav-singh',
    name: 'Saurav Singh',
    role: 'Team Lead',
    focus: 'System architecture, payload-rack integration and delivery.',
    stream: 'Mechanical Engineering',
    year: 'TE',
    yearLabel: 'Third Year',
    email: 'sauravsingh_241376@aitpune.edu.in',
    photo: '/images/team/saurav-singh.jpg',
    links: null,
  },
  {
    id: 'mukul-joshi',
    name: 'Mukul Joshi',
    role: 'Team Member',
    focus: 'Perception models and the FSM + LSTM/GRU step-recognition core.',
    stream: 'Computer Engineering',
    year: 'BE',
    yearLabel: 'Final Year',
    email: 'mukuljoshi_230109@aitpune.edu.in',
    photo: '/images/team/mukul-joshi.jpg',
    links: null,
  },
  {
    id: 'mysaraa-acharya',
    name: 'Mysaraa P. Acharya',
    role: 'Team Member',
    focus: 'Edge deployment — ONNX export, TensorRT INT8 and Jetson bring-up.',
    stream: 'Electronics & Telecommunication',
    year: 'TE',
    yearLabel: 'Third Year',
    email: 'acharyamysaraa_240597@aitpune.edu.in',
    photo: '/images/team/mysaraa-acharya.jpg',
    links: null,
  },
  {
    id: 'shomya-ranjan-rout',
    name: 'Shomya Ranjan Rout',
    role: 'Team Member',
    focus: 'Rack-relative tracking geometry and the ground test rig.',
    stream: 'Mechanical Engineering',
    year: 'TE',
    yearLabel: 'Third Year',
    email: 'shomyaranjan_241319@aitpune.edu.in',
    photo: '/images/team/shomya-ranjan-rout.jpg',
    links: null,
  },
  {
    id: 'taranjit-singh',
    name: 'Taranjit Singh',
    role: 'Team Member',
    focus: 'Procedure modelling and real-time sequence validation.',
    stream: 'Mechanical Engineering',
    year: 'TE',
    yearLabel: 'Third Year',
    email: 'taranjitsingh_240883@aitpune.edu.in',
    photo: '/images/team/taranjit-singh.jpg',
    links: null,
  },
  {
    id: 'sarvagya',
    name: 'Sarvagya',
    role: 'Team Member',
    focus: 'Hardware integration, camera mounting and field-of-view calibration.',
    stream: 'Mechanical Engineering',
    year: 'TE',
    yearLabel: 'Third Year',
    email: 'sarvagya_243064@aitpune.edu.in',
    photo: '/images/team/sarvagya.jpg',
    links: null,
  },
]
