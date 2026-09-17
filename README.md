# VISTASpace

Marketing + interactive-demo site for **VISTASpace** — Visual Intelligent Sequence Tracking &
Alert Assistant. An offline AI co-pilot that watches, validates and guides every experiment step
on board, running entirely on NVIDIA Jetson edge hardware.

## Run it

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Typecheck (`tsc --noEmit`) then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Types only |

## Stack

React 18 · TypeScript · Vite 5 · React Router v6 · Tailwind CSS 3 · Framer Motion 11 ·
React Three Fiber 8 + drei · Zustand · lucide-react · simple-icons

## Design language

Premium editorial / print-halftone. Monochrome, typography-led, grainy, spacious.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#F4F1EA` | Page ground |
| `paper-raised` | `#FAF8F3` | Card fill |
| `paper-sunk` | `#EBE7DD` | Recessed panels, meter tracks |
| `ink` | `#111111` | Text, rules, solid buttons |
| `ink-muted` | `#6B6B66` | Secondary copy |
| `hairline` | `#DEDAD1` | Borders and section dividers |
| `signal` | `#FF6A00` | **Reserved** — live status only |

`signal` appears in exactly three places, all inside the operator console: the offline-mode
status dot, the REC dot on the monitoring view, and the confidence-bar fill once it clears the
85% threshold (plus alert-state log rows and guidance text). It is never decorative.

Type is Inter — 800 for display, 400/500 for body — with JetBrains Mono for the letter-spaced
micro-labels. Cards are flat: paper fill, 1px hairline, no blur and no shadow. Sections are
separated by hairline rules rather than colour blocks.

## The hero visual

`src/components/three/HalftoneHero.tsx` renders the site's primary image on a 2D canvas: an
astronaut's gloved hand reaching in from the left, met by an AI hand-tracking skeleton reaching
in from the right, fingertips nearly touching.

It is a real halftone screen, not a filter over a photo. The scene is drawn to a low-resolution
offscreen canvas in grayscale, then re-emitted as ink dots whose radius follows the sampled
darkness, on a brick-offset grid. No image assets, no WebGL, no post-process shader — so it is
resolution-independent and re-renders on container resize.

The right-hand skeleton uses the real 21-point hand topology (wrist, 4 joints per finger) with
the standard connection graph, so it reads as genuine hand tracking rather than a decorative mesh.

## Editing content

**All site copy lives in `src/data/` as typed constants — not in components.**

| File | Holds |
| --- | --- |
| `src/data/content.ts` | Brand, hero, stats, scope, challenges, features, innovation, Jetson integration, methodology, tech stack, dashboard mock data, viability, roadmap, benefits, research timeline, nav |
| `src/data/analysis.ts` | The five prototype-analysis chapters, markers and readouts |
| `src/data/references.ts` | Research links, grouped |
| `src/data/media.ts` | Photo slots (see below) |
| `src/data/team.ts` | The roster |

## The ambient backdrop — ink bleeding through paper

`src/components/visual/InkFlow.tsx` runs a fixed full-viewport canvas behind every page.

A **divergence-free curl-noise field** (the curl of a scalar potential built from a few sines)
advects ~700 ink particles. Each deposits a faint dark dot; the whole sheet is washed back
toward paper every frame, so ink streaks, folds and is absorbed rather than piling up. Because
the field is divergence-free, the flow swirls and folds instead of collapsing into sources and
sinks. Moving the cursor drags the ink along with it.

Monochrome by construction — it only ever puts `#111` on `#F4F1EA`, so it belongs to the same
print language as the halftone hero rather than sitting on top of it.

**Tuning**, all near the top of the file:

| Constant | Effect |
| --- | --- |
| `SPEED` | Flow speed, in **pixels per frame** (not per second) |
| `FADE_ALPHA` | How fast paper absorbs. Higher = shorter streaks |
| `DENSITY` / `MAX_PARTICLES` | Particle count, scaled per megapixel of viewport |
| `globalAlpha` in `step()` | Ink strength. Raise for a bolder backdrop |
| `POINTER_RADIUS` | Reach of the cursor drag |

If you make it bolder, re-check the hero subheadline — that is where contrast gives out first.

Cost control: 30fps cap, DPR capped at 1.5, paused while `document.hidden`. Under
`prefers-reduced-motion` it settles a still ink wash and stops. It also warms ~90 frames
synchronously on mount, so a throttled `requestAnimationFrame` (background tab, hidden window)
can never leave the sheet blank.

There is no video file. A canvas field gives the same full-bleed moving-background effect for a
few KB instead of megabytes, and it is generated from the site's own design language rather than
dropped in from stock.

## The prototype analysis walkthrough

`/prototype` carries an exhibit-style walkthrough (`src/components/analysis/`) modelled on
Orano's innovation slider: five numbered chapters, each pairing a full-width technical plate
with annotation markers pinned to the drawing.

- `src/data/analysis.ts` — chapter copy, marker positions (`x`/`y` as percentages of the plate)
  and the side readouts.
- `AnalysisPlates.tsx` — the five 800×450 line drawings: perception, FSM + LSTM, sequence
  validation, voice, and the Jetson block diagram. Ink on paper, no image assets.
- `PrototypeAnalysis.tsx` — the shell: chapter rail, markers, readouts, play/pause, arrow keys.

Two deliberate implementation choices:

- The playback phase `t` lives in the leaf components (`usePhase`), not the parent. Held in the
  parent it re-rendered the whole section ~60×/second.
- Chapter changes never animate opacity from 0, and there is no `AnimatePresence mode="wait"`.
  A stalled animation — throttled `requestAnimationFrame` in a background tab or a hidden
  window — must never be able to leave the copy or the plate invisible.

Telemetry is **simulated** and labelled as such. Fixed figures (85% threshold, 21 landmarks,
5 steps) come from the system spec; anything that ticks is illustrative, not a benchmark.

### The team

`src/data/team.ts` holds the roster — name, team position, stream, academic year and institute
email — plus `TEAM_META` for the institute block and crest.

`focus` is the one field **not** taken from the source document: it is a suggested functional
role derived from each member's stream. Edit it to match how the work is actually split.

Personal mobile numbers are deliberately **not** included. They are on the source document, but
publishing them on a public site is a privacy risk. To include them, add a `phone` field and
render it in `Team.tsx`.

`public/images/ait-crest.png` is the institute crest, cropped from the letterhead. The full
letterhead scan was not kept — it carries direct phone lines.

### Photos

Photo slots are declared in `src/data/media.ts`, plus one `photo` field per member in
`team.ts`. A slot set to `src: null` renders a labelled placeholder plate stating what belongs
there — never a broken image.

**Filled:** six team portraits (`public/images/team/`, 640×640, focal-point cropped so no face
is cut), three Jetson hardware shots, and the bench rig (`public/images/rig.jpg`, 16:9).

**Still empty:** `runSession` (a recorded run) and `teamGroup` (group photo). These are yours to
shoot — the page shows exactly what to supply.

To fill one:

1. Save the file into `public/images/` (team portraits: `public/images/team/`)
2. Set the path, e.g. `src: '/images/rig.jpg'`
3. Rewrite `alt` to describe the actual photograph

Keep files under ~400 KB and match the suggested aspect ratio.

**Two notes on the images currently in the repo:**

- The three Jetson photos are third-party *product* images of the hardware, not shots of the
  team's own board. Replace them with your own bench photos when you have them — same paths.
- Hardware shots are rendered desaturated (`[&_img]:grayscale` on the `PhotoFrame`) so product
  colour doesn't fight the monochrome palette. Portraits and the rig shot stay in full colour —
  the rig is the one photograph of the actual workspace, and flattening it would lose that.
  Remove or add that class to change any of them.
- `rig.jpg` appears to be a generated image rather than a photograph of the bench. It is
  presented on `/prototype` as the team's test rig, so if that matters to you, replace it with a
  real photo at the same path.

### Reference links that still need an exact URL

Entries in `references.ts` with `exact: false` point at a targeted search on the publisher's own
site rather than a deep link: PhysAstro-Pose, the NASA ISS command-error study, the NASA 2025
communication-delay assessment, the Frontiers in Physiology study, and MicroG-4M. Paste the real
URL over `url` and flip `exact` to `true`. Everything else (ST-GCN arXiv, TensorRT, DeepStream,
COCO, HaGRID, Roboflow) is already a canonical primary link.

## Structure

```
src/
  components/
    layout/      Navbar, Footer, PageTransition, LoadingScreen, ScrollToTop
    three/       HalftoneHero (canvas), DashboardPoseViewer (R3F), CanvasFallback
    ui/          Card, Badge, PillButton, StatCounter, Timeline, SectionHeading,
                 Reveal, Icon, TechIcon, PipelineDiagram
    dashboard/   Dashboard + StatusIndicator, SequencePanel, MonitoringView,
                 LogTable, GuidanceBar
  data/          content.ts, references.ts, team.ts
  hooks/         useReducedMotion, useLowPowerDevice
  store/         useUIStore (Zustand — nav + boot state)
  pages/         Home, Problem, Solution, Technology, Feasibility, Impact,
                 Prototype, Research, Team, NotFound
  App.tsx        Routes (all pages lazy-loaded), AnimatePresence transitions
```

## 3D, motion and accessibility

- **Code splitting** — every page is `React.lazy`. The halftone hero is split out of the Home
  chunk, and the R3F pose viewer out of the dashboard chunk, so `three` only downloads on the
  two routes that render the console.
- **`prefers-reduced-motion`** — `useReducedMotion()` gates every animated surface: the count-up
  jumps to its final value, the typewriter prints in full, the log renders all rows at once, the
  sequence panel stops cycling, and the WebGL panel swaps to `CanvasFallback`. A global CSS rule
  also zeroes transitions and animations. The halftone hero is static by design.
- **Low-power devices** — `useLowPowerDevice()` swaps WebGL for the static fallback on narrow
  screens with few cores or a coarse pointer.
- **OrbitControls** are enabled only on the dashboard's 3D panel, constrained (no pan, clamped
  distance and polar angle).
- Semantic landmarks, one `h1` per page, visible focus rings, a skip link, and `role="meter"` on
  both progress bars.

## Dashboard data is mock data

The console on `/technology` and `/prototype` is a UI recreation driven by the constants in
`content.ts` (`DASHBOARD`, `SEQUENCE_STEPS`, `LOG_SEED`, `LOG_STREAM`, `GUIDANCE_MESSAGES`).
It is not wired to a backend.

## Deploying

`npm run build` emits a static site to `dist/`. It is a **client-side-routed SPA**, so whatever
host you use must rewrite unknown paths to `index.html` — otherwise `/technology` will 404 on a
hard refresh.

**Vercel / Netlify / Cloudflare Pages** — works with no configuration. Point the project at this
repo; build command `npm run build`, output directory `dist`. SPA fallback is automatic.

**GitHub Pages** needs two extra things, because a project page is served from a subpath:

1. Set the base path in `vite.config.ts`:
   ```ts
   export default defineConfig({ base: '/<your-repo-name>/', /* …rest unchanged */ })
   ```
2. Provide an SPA fallback by copying `dist/index.html` to `dist/404.html` after the build.

Ask before wiring this up if you want it — the `base` change breaks local `npm run dev` unless
it is made conditional on the build mode.

## Licence

Source code is MIT (see `LICENSE`). **Image assets are not** — team photographs, the institute
crest and the third-party Jetson product shots each carry their own rights, spelled out at the
bottom of the licence file. Replace the Jetson images before redistributing.

Team members' institute email addresses appear in `src/data/team.ts` and are rendered on `/team`.
They will be public once this repo is. Personal phone numbers are deliberately absent.
