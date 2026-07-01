"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

const NeuralTrail = dynamic(() => import("@/components/hero/NeuralTrail"), {
  ssr: false,
})

/**
 * Client island that mounts the neural-trail canvas inside the
 * (server-rendered) hero. Pointer events are tracked on the hero
 * element itself, so the canvas can stay pointer-events-none.
 */
export default function HeroTrail() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    containerRef.current = wrapperRef.current?.parentElement ?? null
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <NeuralTrail containerRef={containerRef} />
    </div>
  )
}
