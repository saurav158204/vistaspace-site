import {
  Activity,
  AudioLines,
  Boxes,
  Building2,
  Coins,
  Cpu,
  Database,
  DatabaseZap,
  FileSearch,
  FlaskConical,
  Gauge,
  GitBranch,
  HardDrive,
  IndianRupee,
  Leaf,
  ListChecks,
  Microscope,
  MonitorCheck,
  Orbit,
  Radio,
  Rocket,
  SatelliteDish,
  ScanEye,
  Settings2,
  ShieldCheck,
  TrendingDown,
  TriangleAlert,
  UserRoundCheck,
  Users,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Explicit registry so icon names can live in data/content.ts as strings
 * without pulling the whole lucide set into the bundle.
 */
const REGISTRY: Record<string, LucideIcon> = {
  Activity,
  AudioLines,
  Boxes,
  Building2,
  Coins,
  Cpu,
  Database,
  DatabaseZap,
  FileSearch,
  FlaskConical,
  Gauge,
  GitBranch,
  HardDrive,
  IndianRupee,
  Leaf,
  ListChecks,
  Microscope,
  MonitorCheck,
  Orbit,
  Radio,
  Rocket,
  SatelliteDish,
  ScanEye,
  Settings2,
  ShieldCheck,
  TrendingDown,
  TriangleAlert,
  UserRoundCheck,
  Users,
  Wrench,
}

interface IconProps {
  name: string
  className?: string
  strokeWidth?: number
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.5 }: IconProps) {
  const Cmp = REGISTRY[name] ?? Activity
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
