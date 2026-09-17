import {
  siCss3,
  siDocker,
  siExpress,
  siFastapi,
  siFfmpeg,
  siHtml5,
  siJavascript,
  siMediapipe,
  siMongodb,
  siNodedotjs,
  siNvidia,
  siOnnx,
  siOpencv,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSqlite,
  siStreamlit,
  siTailwindcss,
  siTensorflow,
} from 'simple-icons'
import { Cpu } from 'lucide-react'

interface SimpleIcon {
  title: string
  path: string
  hex: string
}

const ICONS: Record<string, SimpleIcon> = {
  python: siPython,
  tensorflow: siTensorflow,
  pytorch: siPytorch,
  scikitlearn: siScikitlearn,
  mediapipe: siMediapipe,
  opencv: siOpencv,
  ffmpeg: siFfmpeg,
  fastapi: siFastapi,
  nodedotjs: siNodedotjs,
  express: siExpress,
  mongodb: siMongodb,
  sqlite: siSqlite,
  postgresql: siPostgresql,
  react: siReact,
  streamlit: siStreamlit,
  html5: siHtml5,
  css3: siCss3,
  javascript: siJavascript,
  tailwindcss: siTailwindcss,
  onnx: siOnnx,
  nvidia: siNvidia,
  docker: siDocker,
}

interface TechIconProps {
  slug?: string
  name: string
  className?: string
  /** Use the brand's own colour instead of inheriting currentColor. */
  brandColor?: boolean
}

/**
 * Renders the official brand mark when simple-icons has one.
 * Tools without a public mark (YOLO, LSTM/GRU, HMR, ST-GCN, TensorRT) fall back
 * to a neutral chip icon rather than a fabricated logo.
 */
export function TechIcon({ slug, name, className = 'h-6 w-6', brandColor = false }: TechIconProps) {
  const icon = slug ? ICONS[slug] : undefined

  if (!icon) {
    return <Cpu className={className} strokeWidth={1.5} aria-hidden="true" />
  }

  return (
    <svg
      role="img"
      aria-label={`${name} logo`}
      viewBox="0 0 24 24"
      className={className}
      fill={brandColor ? `#${icon.hex}` : 'currentColor'}
    >
      <path d={icon.path} />
    </svg>
  )
}
