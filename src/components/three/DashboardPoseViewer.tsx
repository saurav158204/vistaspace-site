import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useLowPowerDevice, useReducedMotion } from '../../hooks/useReducedMotion'
import { CanvasFallback } from './CanvasFallback'

const INK = '#111111'

/** Wireframe payload rack — the reference frame the astronaut is tracked against. */
function Rack() {
  const lines: JSX.Element[] = []

  for (let i = 0; i <= 3; i++) {
    const y = -1.5 + i
    lines.push(
      <Line
        key={`shelf-${i}`}
        points={[
          [-1.4, y, -0.7],
          [1.4, y, -0.7],
          [1.4, y, 0.7],
          [-1.4, y, 0.7],
          [-1.4, y, -0.7],
        ]}
        color={INK}
        lineWidth={1}
        transparent
        opacity={i === 0 || i === 3 ? 0.5 : 0.2}
      />,
    )
  }

  const corners: [number, number][] = [
    [-1.4, -0.7],
    [1.4, -0.7],
    [1.4, 0.7],
    [-1.4, 0.7],
  ]
  corners.forEach(([x, z], i) => {
    lines.push(
      <Line
        key={`post-${i}`}
        points={[
          [x, -1.5, z],
          [x, 1.5, z],
        ]}
        color={INK}
        lineWidth={1}
        transparent
        opacity={0.38}
      />,
    )
  })

  return (
    <group>
      {lines}
      <mesh position={[0.55, -0.98, 0]}>
        <boxGeometry args={[0.7, 0.42, 0.5]} />
        <meshStandardMaterial color="#D6D1C4" metalness={0} roughness={0.85} />
      </mesh>
    </group>
  )
}

/** Primitive humanoid, deliberately off-axis to show orientation-agnostic tracking. */
function Astronaut() {
  const body = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!body.current) return
    const t = state.clock.elapsedTime
    body.current.rotation.z = -0.9 + Math.sin(t * 0.25) * 0.12
    body.current.rotation.y = 0.5 + Math.sin(t * 0.18) * 0.2
    body.current.position.y = Math.sin(t * 0.4) * 0.1
  })

  // Built once — a new material per render would orphan GPU programs.
  const { joint, limb } = useMemo(
    () => ({
      joint: new THREE.MeshBasicMaterial({ color: INK }),
      limb: new THREE.MeshStandardMaterial({ color: '#7B776D', metalness: 0, roughness: 0.9 }),
    }),
    [],
  )

  return (
    <group ref={body} position={[-0.3, 0.1, 0]} rotation={[0, 0.5, -0.9]} scale={1}>
      <mesh position={[0, 0.85, 0]} material={limb}>
        <sphereGeometry args={[0.22, 16, 12]} />
      </mesh>
      <mesh position={[0, 0.3, 0]} material={limb}>
        <capsuleGeometry args={[0.2, 0.5, 4, 12]} />
      </mesh>
      <mesh position={[-0.34, 0.42, 0.06]} rotation={[0, 0, 0.9]} material={limb}>
        <capsuleGeometry args={[0.075, 0.42, 4, 8]} />
      </mesh>
      <mesh position={[0.34, 0.42, 0.06]} rotation={[0, 0, -0.55]} material={limb}>
        <capsuleGeometry args={[0.075, 0.42, 4, 8]} />
      </mesh>
      <mesh position={[-0.14, -0.35, 0.05]} rotation={[0.35, 0, 0.12]} material={limb}>
        <capsuleGeometry args={[0.085, 0.5, 4, 8]} />
      </mesh>
      <mesh position={[0.14, -0.32, -0.08]} rotation={[-0.3, 0, -0.14]} material={limb}>
        <capsuleGeometry args={[0.085, 0.5, 4, 8]} />
      </mesh>

      {/* tracked keypoints */}
      {(
        [
          [0, 0.85, 0],
          [0, 0.55, 0],
          [-0.28, 0.55, 0.04],
          [0.28, 0.55, 0.04],
          [-0.46, 0.2, 0.1],
          [0.5, 0.26, 0.1],
          [0, 0.02, 0],
          [-0.14, -0.62, 0.12],
          [0.14, -0.58, -0.16],
        ] as [number, number, number][]
      ).map((p, i) => (
        <mesh key={i} position={p} material={joint}>
          <sphereGeometry args={[0.045, 8, 6]} />
        </mesh>
      ))}

      <Line
        points={[
          [0, 0.85, 0],
          [0, 0.55, 0],
          [0, 0.02, 0],
        ]}
        color={INK}
        lineWidth={2}
      />
      <Line
        points={[
          [-0.46, 0.2, 0.1],
          [-0.28, 0.55, 0.04],
          [0.28, 0.55, 0.04],
          [0.5, 0.26, 0.1],
        ]}
        color={INK}
        lineWidth={2}
      />
      <Line
        points={[
          [-0.14, -0.62, 0.12],
          [0, 0.02, 0],
          [0.14, -0.58, -0.16],
        ]}
        color={INK}
        lineWidth={2}
      />
    </group>
  )
}

/** Dashed vector from the astronaut's tracked root to the rack origin. */
function RackRelativeVector() {
  return (
    <Line
      points={[
        [-0.3, 0.1, 0],
        [0.55, -0.98, 0],
      ]}
      color={INK}
      lineWidth={1.5}
      dashed
      dashSize={0.1}
      gapSize={0.08}
      transparent
      opacity={0.55}
    />
  )
}

interface DashboardPoseViewerProps {
  className?: string
}

export function DashboardPoseViewer({ className = '' }: DashboardPoseViewerProps) {
  const reduced = useReducedMotion()
  const lowPower = useLowPowerDevice()

  if (reduced || lowPower) {
    return <CanvasFallback label="Rack-relative pose tracking (static view)" className={className} />
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [2.6, 1.0, 3.0], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 5, 4]} intensity={2.2} />
          <directionalLight position={[-4, 1, -2]} intensity={0.8} />
          <Rack />
          <Astronaut />
          <RackRelativeVector />
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default DashboardPoseViewer
