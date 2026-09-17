/**
 * PHOTO SLOTS
 * -----------
 * Every photograph on the site is declared here. Each entry starts as `src: null`,
 * which renders a labelled placeholder plate rather than a broken image.
 *
 * To fill one:
 *   1. Save the photo into `public/images/` (e.g. public/images/rig.jpg)
 *   2. Set `src: '/images/rig.jpg'`
 *   3. Rewrite `alt` to describe the actual photograph
 *
 * Team portraits live in `src/data/team.ts` instead (one `photo` field per member),
 * and belong in `public/images/team/`.
 *
 * Keep photos under ~400 KB and use the suggested aspect ratio so the layout holds.
 */

export interface PhotoSlot {
  id: string
  src: string | null
  alt: string
  /** What to shoot — shown on the empty placeholder. */
  hint: string
  aspect: string
}

export const PHOTOS: Record<string, PhotoSlot> = {
  rig: {
    id: 'rig',
    src: '/images/rig.jpg',
    alt: 'The ground test rig in the robotics lab: a camera mounted on an aluminium-extrusion gantry looking down at a mock payload rack of boards and cabling, with benches, oscilloscopes and students working behind it',
    hint: 'The bench rig — camera mounted over the mock payload rack, wide shot',
    aspect: '16 / 9',
  },
  /**
   * The three Jetson photographs are third-party product images of the hardware,
   * not shots of the team's own board. Swap in your own bench photos when you
   * have them — same paths, nothing else to change.
   */
  jetson: {
    id: 'jetson',
    src: '/images/jetson-orin-nano.jpg',
    alt: 'NVIDIA Jetson Orin Nano developer kit, top-down, with the module, cooling fan, USB, HDMI and Ethernet ports visible',
    hint: 'The Jetson module on the bench, cabled up, close crop',
    aspect: '4 / 3',
  },
  jetsonKit: {
    id: 'jetsonKit',
    src: '/images/jetson-dev-kit.jpg',
    alt: 'A Jetson developer board laid out beside its cooling fan, mounting screws and fan connector',
    hint: 'The board and its cooling hardware, laid out flat',
    aspect: '16 / 10',
  },
  jetsonBoard: {
    id: 'jetsonBoard',
    src: '/images/jetson-board.jpg',
    alt: 'A Jetson carrier board at an angle, showing the passive heatsink and the port cluster',
    hint: 'Three-quarter view of the board and heatsink',
    aspect: '4 / 3',
  },
  runSession: {
    id: 'runSession',
    src: null,
    alt: 'A recorded lab run of the experiment sequence',
    hint: 'A team member performing the experiment steps in front of the rig',
    aspect: '4 / 3',
  },
  teamGroup: {
    id: 'teamGroup',
    src: null,
    alt: 'The team',
    hint: 'Group photo of the six of you — landscape, shot at eye level',
    aspect: '16 / 9',
  },
}
