import { useCallback, useEffect, useRef } from 'react'

/**
 * The site's primary visual: an astronaut's gloved hand reaching in from the left,
 * met by an AI hand-tracking skeleton reaching in from the right.
 *
 * Rendered as a real halftone dot screen — the scene is drawn to a low-resolution
 * offscreen canvas in grayscale, then re-emitted as ink dots whose radius follows
 * the sampled darkness. No image assets, no WebGL, no post-process shader.
 *
 * Landmark layout follows the 21-point hand topology used by MediaPipe, so the
 * skeleton on the right is the real connection graph rather than a decorative mesh.
 */

/** 21 landmarks, normalised to a hand pointing right. Index finger extended. */
const HAND: [number, number][] = [
  [0.06, 0.56], // 0  wrist
  [0.16, 0.62], // 1  thumb CMC
  [0.28, 0.68], // 2  thumb MCP
  [0.38, 0.7], // 3  thumb IP
  [0.46, 0.69], // 4  thumb tip
  [0.3, 0.46], // 5  index MCP
  [0.48, 0.42], // 6  index PIP
  [0.63, 0.4], // 7  index DIP
  [0.79, 0.39], // 8  index tip
  [0.31, 0.53], // 9  middle MCP
  [0.5, 0.52], // 10 middle PIP
  [0.56, 0.6], // 11 middle DIP
  [0.49, 0.65], // 12 middle tip
  [0.3, 0.59], // 13 ring MCP
  [0.47, 0.6], // 14 ring PIP
  [0.52, 0.67], // 15 ring DIP
  [0.45, 0.71], // 16 ring tip
  [0.28, 0.64], // 17 pinky MCP
  [0.42, 0.67], // 18 pinky PIP
  [0.47, 0.73], // 19 pinky DIP
  [0.4, 0.76], // 20 pinky tip
]

const BONES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [0, 17],
]

/** Chains stroked as tapering tubes to build the solid hand silhouette. */
const FINGERS: { idx: number[]; w: number[] }[] = [
  { idx: [0, 1, 2, 3, 4], w: [0.1, 0.085, 0.07, 0.055] },
  { idx: [5, 6, 7, 8], w: [0.075, 0.065, 0.055] },
  { idx: [9, 10, 11, 12], w: [0.078, 0.068, 0.056] },
  { idx: [13, 14, 15, 16], w: [0.072, 0.062, 0.052] },
  { idx: [17, 18, 19, 20], w: [0.064, 0.055, 0.046] },
]

const PALM = [0, 1, 17, 13, 9, 5]

type Pt = [number, number]

interface Placement {
  ox: number
  oy: number
  scale: number
  flip: boolean
}

/** Maps a normalised landmark into canvas space. */
function mapPoint(p: Placement, i: number): Pt {
  const [nx, ny] = HAND[i]
  const x = p.flip ? -nx : nx
  return [p.ox + x * p.scale, p.oy + ny * p.scale]
}

function drawSolidHand(ctx: CanvasRenderingContext2D, p: Placement) {
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.fillStyle = '#000'
  ctx.strokeStyle = '#000'

  // forearm running off the edge of the frame
  const wrist = mapPoint(p, 0)
  const palmTop = mapPoint(p, 5)
  const armDir = p.flip ? 1 : -1
  ctx.lineWidth = p.scale * 0.19
  ctx.beginPath()
  ctx.moveTo(wrist[0], wrist[1] - p.scale * 0.03)
  ctx.lineTo(wrist[0] + armDir * p.scale * 1.4, wrist[1] + p.scale * 0.06)
  ctx.stroke()

  // palm mass
  ctx.beginPath()
  PALM.forEach((i, k) => {
    const [x, y] = mapPoint(p, i)
    if (k === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.closePath()
  ctx.fill()
  ctx.lineWidth = p.scale * 0.11
  ctx.stroke()

  // knuckle bridge
  ctx.beginPath()
  ctx.moveTo(palmTop[0], palmTop[1])
  ctx.lineTo(...mapPoint(p, 17))
  ctx.lineWidth = p.scale * 0.13
  ctx.stroke()

  // tapering fingers
  for (const f of FINGERS) {
    for (let s = 0; s < f.idx.length - 1; s++) {
      const a = mapPoint(p, f.idx[s])
      const b = mapPoint(p, f.idx[s + 1])
      ctx.lineWidth = p.scale * f.w[s]
      ctx.beginPath()
      ctx.moveTo(a[0], a[1])
      ctx.lineTo(b[0], b[1])
      ctx.stroke()
    }
  }
}

/** Renders the grayscale source frame that the halftone pass samples. */
function drawSource(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)

  // At phone width the hands have to fill far more of the frame or the halftone
  // resolves to an unreadable smudge — the forearms simply crop at the edges.
  const narrow = w < 720
  const scale = narrow ? Math.min(w * 0.72, h * 1.5) : Math.min(w * 0.46, h * 1.15)
  const midY = h * 0.5 - scale * 0.56

  // Index fingertips sit 2 * (K - 0.79) * scale apart — near-touching, never crossing.
  const K = 0.83

  const left: Placement = { ox: w * 0.5 - scale * K, oy: midY, scale, flip: false }
  const right: Placement = { ox: w * 0.5 + scale * K, oy: midY + scale * 0.06, scale, flip: true }

  // --- soft atmospheric wash, so the dot field has tonal range -------------
  const wash = ctx.createRadialGradient(w * 0.5, h * 0.52, 0, w * 0.5, h * 0.52, scale * 1.5)
  wash.addColorStop(0, 'rgba(0,0,0,0.26)')
  wash.addColorStop(0.45, 'rgba(0,0,0,0.10)')
  wash.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = wash
  ctx.fillRect(0, 0, w, h)

  // --- left hand: solid, fully rendered ------------------------------------
  ctx.save()
  drawSolidHand(ctx, left)
  ctx.restore()

  // --- right hand: lighter mass, so the skeleton reads on top ---------------
  ctx.save()
  ctx.globalAlpha = 0.34
  drawSolidHand(ctx, right)
  ctx.restore()

  // --- tonal shaping: fade both hands toward the fingertips -----------------
  const fade = ctx.createLinearGradient(0, 0, w, 0)
  fade.addColorStop(0, 'rgba(255,255,255,0)')
  fade.addColorStop(0.42, 'rgba(255,255,255,0.42)')
  fade.addColorStop(0.5, 'rgba(255,255,255,0.52)')
  fade.addColorStop(0.58, 'rgba(255,255,255,0.42)')
  fade.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = fade
  ctx.fillRect(0, 0, w, h)

  // vignette toward the top so the headline above stays clean
  const top = ctx.createLinearGradient(0, 0, 0, h)
  top.addColorStop(0, 'rgba(255,255,255,0.85)')
  top.addColorStop(0.25, 'rgba(255,255,255,0.1)')
  top.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = top
  ctx.fillRect(0, 0, w, h)

  return { left, right, scale }
}

/** Crisp vector overlay: the tracked skeleton on the AI hand. */
function drawSkeleton(ctx: CanvasRenderingContext2D, p: Placement) {
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.strokeStyle = 'rgba(17,17,17,0.72)'
  ctx.lineWidth = Math.max(1, p.scale * 0.007)
  for (const [a, b] of BONES) {
    const pa = mapPoint(p, a)
    const pb = mapPoint(p, b)
    ctx.beginPath()
    ctx.moveTo(pa[0], pa[1])
    ctx.lineTo(pb[0], pb[1])
    ctx.stroke()
  }

  for (let i = 0; i < HAND.length; i++) {
    const [x, y] = mapPoint(p, i)
    const r = Math.max(1.6, p.scale * (i === 8 ? 0.017 : 0.0105))
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = '#F4F1EA'
    ctx.fill()
    ctx.lineWidth = Math.max(1, p.scale * 0.005)
    ctx.strokeStyle = '#111'
    ctx.stroke()
  }

  // tracking bracket around the extended fingertip
  const tip = mapPoint(p, 8)
  const s = Math.max(10, p.scale * 0.075)
  ctx.strokeStyle = 'rgba(17,17,17,0.55)'
  ctx.lineWidth = Math.max(1, p.scale * 0.006)
  const corners: [number, number][] = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]
  for (const [cx, cy] of corners) {
    const x = tip[0] + cx * s
    const y = tip[1] + cy * s
    ctx.beginPath()
    ctx.moveTo(x, y - cy * s * 0.42)
    ctx.lineTo(x, y)
    ctx.lineTo(x - cx * s * 0.42, y)
    ctx.stroke()
  }

  ctx.restore()
}

export interface HalftoneHeroProps {
  className?: string
}

export function HalftoneHero({ className = '' }: HalftoneHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const render = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const w = Math.max(320, Math.round(wrap.clientWidth))
    const h = Math.max(220, Math.round(wrap.clientHeight))
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    // Finer screen on small canvases, so the hands stay legible.
    const cell = w < 720 ? 4 : 5

    // 1. grayscale source, at the dot-grid resolution
    const cols = Math.ceil(w / cell)
    const rows = Math.ceil(h / cell)
    const src = document.createElement('canvas')
    src.width = cols
    src.height = rows
    const sctx = src.getContext('2d', { willReadFrequently: true })
    if (!sctx) return

    sctx.setTransform(cols / w, 0, 0, rows / h, 0, 0)
    const { right } = drawSource(sctx, w, h)

    // 2. halftone pass — dot radius follows sampled darkness
    let data: Uint8ClampedArray
    try {
      data = sctx.getImageData(0, 0, cols, rows).data
    } catch {
      return
    }

    ctx.fillStyle = '#111111'
    const maxR = cell * 0.62

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const o = (j * cols + i) * 4
        // luminance of the source pixel (source is already grayscale)
        const lum = (data[o] * 0.299 + data[o + 1] * 0.587 + data[o + 2] * 0.114) / 255
        const ink = 1 - lum
        if (ink < 0.045) continue

        // gamma-shaped so midtones stay open and print-like
        const r = Math.pow(ink, 0.78) * maxR
        if (r < 0.22) continue

        // brick offset on alternate rows — a real screen never sits on a square grid
        const x = i * cell + (j % 2 ? cell * 0.5 : 0) + cell * 0.5
        const y = j * cell + cell * 0.5

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 3. crisp tracking skeleton over the AI hand
    drawSkeleton(ctx, right)
  }, [])

  useEffect(() => {
    render()

    const wrap = wrapRef.current
    if (!wrap) return

    let frame = 0
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(render)
    })
    ro.observe(wrap)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [render])

  return (
    <div
      ref={wrapRef}
      className={`relative w-full ${className}`}
      role="img"
      aria-label="Halftone illustration: an astronaut's gloved hand reaching from the left toward an AI hand-tracking skeleton reaching from the right, their index fingers nearly touching."
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}

export default HalftoneHero
