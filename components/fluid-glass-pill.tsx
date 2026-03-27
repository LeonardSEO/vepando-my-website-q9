"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei"
import { easing } from "maath"
import type * as THREE from "three"

type FluidGlassPillProps = {
  className?: string
}

function PillMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  const materialProps = useMemo(
    () => ({
      transmission: 1,
      roughness: 0.02,
      thickness: 0.65,
      ior: 1.12,
      chromaticAberration: 0.03,
      anisotropy: 0.08,
      distortion: 0.12,
      distortionScale: 0.35,
      temporalDistortion: 0.08,
      clearcoat: 1,
      attenuationDistance: 0.8,
      attenuationColor: "#c9ddff",
      color: "#f6f9ff",
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const targetX = state.pointer.y * 0.12
    const targetY = state.pointer.x * 0.2
    easing.dampE(meshRef.current.rotation, [targetX, targetY, 0], 0.18, delta)
  })

  return (
    <RoundedBox ref={meshRef} args={[3.7, 0.95, 0.3]} radius={0.42} smoothness={8}>
      <MeshTransmissionMaterial {...materialProps} />
    </RoundedBox>
  )
}

export default function FluidGlassPill({ className }: FluidGlassPillProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 26 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[-2, 2, 3]} intensity={1.2} color="#d6e4ff" />
        <pointLight position={[1.7, -0.8, 2.4]} intensity={0.9} color="#ffffff" />
        <PillMesh />
      </Canvas>
    </div>
  )
}
