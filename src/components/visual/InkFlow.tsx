import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Ink bleeding through paper.
 *
 * A divergence-free curl-noise field advects a few hundred ink particles across
 * a persistent canvas. Each particle deposits a faint dark dot; the whole layer
 * is washed back toward paper every frame, so ink spreads, streaks and is
 * absorbed rather than piling up. The cursor drags the flow and feeds it.
 *
 * Monochrome by construction — it only ever puts #111 on #F4F1EA, so it belongs
 * to the same print language as the halftone hero rather than sitting on top of it.
 *
 * Cost: ~700 particles, 30fps cap, DPR capped at 1.5, paused while the tab is
 * hidden. Under prefers-reduced-motion it settles a still ink wash and stops.
 */

const FRAME_MS = 1000 / 30
const PAPER = '#F4F1EA'
const INK = '17, 17, 17'

/** Particle density per megapixel of viewport. */
const DENSITY = 430
const MAX_PARTICLES = 900

const SPEED = 2.7
const FADE_ALPHA = 0.042
const POINTER_RADIUS = 210

interface P {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  r: number
  speed: number
}

export function InkFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  const pointer = useRef({ x: -9999, y: -9999, px: -9999, py: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let parts: P[] = []

    const spawn = (x?: number, y?: number): P => ({
      x: x ?? Math.random() * w,
      y: y ?? Math.random() * h,
      vx: 0,
      vy: 0,
      life: 0,
      max: 120 + Math.random() * 260,
      r: 0.7 + Math.random() * 1.7,
      speed: 0.65 + Math.random() * 0.7,
    })

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // repaint the sheet, then reseed
      ctx.fillStyle = PAPER
      ctx.fillRect(0, 0, w, h)

      const target = Math.min(MAX_PARTICLES, Math.round(((w * h) / 1_000_000) * DENSITY))
      parts = Array.from({ length: target }, () => spawn())
    }

    /**
     * Curl of a scalar potential built from a few sines — divergence-free, so the
     * flow swirls and folds instead of collapsing into sources and sinks.
     */
    const flow = (x: number, y: number, t: number) => {
      const a = 0.0016
      const b = 0.0021
      const c = 0.0012

      const s1 = Math.sin(x * a + t * 0.22)
      const c1 = Math.cos(x * a + t * 0.22)
      const s2 = Math.sin(y * b - t * 0.18)
      const c2 = Math.cos(y * b - t * 0.18)
      const c3 = Math.cos((x + y) * c + t * 0.3)

      // dψ/dy and −dψ/dx. The raw curl is ~1e-3, so normalise the direction and
      // set the speed explicitly in pixels per frame rather than scaling by a
      // magic constant.
      const rx = -1.9 * b * s1 * s2 + 1.1 * c * c3
      const ry = -(1.9 * a * c1 * c2 + 1.1 * c * c3)
      const len = Math.hypot(rx, ry) || 1

      return { vx: (rx / len) * SPEED, vy: (ry / len) * SPEED }
    }

    const step = (t: number) => {
      // paper absorbs: wash the whole sheet back toward cream
      ctx.globalAlpha = FADE_ALPHA
      ctx.fillStyle = PAPER
      ctx.fillRect(0, 0, w, h)

      const { x: mx, y: my, px, py } = pointer.current
      const mvx = mx - px
      const mvy = my - py

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        const f = flow(p.x, p.y, t)

        p.vx += (f.vx * p.speed - p.vx) * 0.12
        p.vy += (f.vy * p.speed - p.vy) * 0.12

        // the cursor drags the ink with it
        if (mx > -9000) {
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          const infl = Math.exp(-d2 / (2 * POINTER_RADIUS * POINTER_RADIUS))
          p.vx += mvx * infl * 0.55
          p.vy += mvy * infl * 0.55
        }

        // keep a fast cursor flick from launching particles off-screen
        const sp = Math.hypot(p.vx, p.vy)
        if (sp > 26) {
          p.vx = (p.vx / sp) * 26
          p.vy = (p.vy / sp) * 26
        }

        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.life > p.max || p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) {
          parts[i] = spawn()
          continue
        }

        // fade in and out over the particle's life so streaks have soft ends
        const k = Math.min(p.life / 26, 1) * Math.min((p.max - p.life) / 42, 1)
        ctx.globalAlpha = 0.058 * k
        ctx.fillStyle = `rgba(${INK}, 1)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      pointer.current.px = mx
      pointer.current.py = my
    }

    resize()

    if (reduced) {
      // Settle a still wash, then stop — texture without motion.
      for (let i = 0; i < 160; i++) step(i * 0.05)
      const onResizeStatic = () => {
        resize()
        for (let i = 0; i < 160; i++) step(i * 0.05)
      }
      window.addEventListener('resize', onResizeStatic)
      return () => window.removeEventListener('resize', onResizeStatic)
    }

    // Warm the sheet so it is never blank on first paint, even if rAF is throttled.
    for (let i = 0; i < 90; i++) step(i * 0.05)

    let raf = 0
    let last = 0
    const start = performance.now()

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden) return
      if (now - last < FRAME_MS) return
      last = now
      step((now - start) / 1000)
    }
    raf = requestAnimationFrame(loop)

    const onPointer = (e: PointerEvent) => {
      const p = pointer.current
      if (p.x < -9000) {
        p.px = e.clientX
        p.py = e.clientY
      }
      p.x = e.clientX
      p.y = e.clientY
    }
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999, px: -9999, py: -9999 }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}

export default InkFlow
