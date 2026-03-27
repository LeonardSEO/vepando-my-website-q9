"use client"

import { useEffect, useRef, type CSSProperties } from "react"

type FluidGlassPillProps = {
  className?: string
}

export default function FluidGlassPill({ className }: FluidGlassPillProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2

      root.style.setProperty("--glow-x", `${50 + x * 10}%`)
      root.style.setProperty("--glow-y", `${35 + y * 10}%`)
      root.style.setProperty("--shift-x", `${x * 8}px`)
      root.style.setProperty("--shift-y", `${y * 4}px`)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <div
      ref={rootRef}
      className={className}
      aria-hidden="true"
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "35%",
          "--shift-x": "0px",
          "--shift-y": "0px",
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 rounded-full border border-white/40 bg-[linear-gradient(145deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.22)_100%)] shadow-[0_14px_45px_rgba(0,0,0,0.26),inset_0_1px_1px_rgba(255,255,255,0.85),inset_0_-1px_2px_rgba(0,0,0,0.12)] backdrop-blur-xl" />
      <div
        className="absolute inset-[1px] rounded-full opacity-85"
        style={{
          transform: "translate3d(var(--shift-x), var(--shift-y), 0)",
          transition: "transform 220ms ease-out",
          background:
            "radial-gradient(120% 100% at var(--glow-x) var(--glow-y), rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.12) 42%, rgba(255,255,255,0) 68%)",
          filter: "url(#liquid-distortion-subtle)",
        }}
      />
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0)_100%)]" />
    </div>
  )
}
