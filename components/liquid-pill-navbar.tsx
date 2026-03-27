"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { analytics } from "@/lib/analytics"

const FluidGlassPill = dynamic(() => import("@/components/fluid-glass-pill"), {
  ssr: false,
})

const supportsFluidGlass = () => {
  if (typeof window === "undefined") return false

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return false

  const canvas = document.createElement("canvas")
  const webglSupported = Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))

  return webglSupported
}

export default function LiquidPillNavbar() {
  const [useFluidGlass, setUseFluidGlass] = useState(false)

  useEffect(() => {
    setUseFluidGlass(supportsFluidGlass())
  }, [])

  const scrollToTop = () => {
    analytics.navLogoClick()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navClasses = useMemo(
    () =>
      "relative h-[56px] sm:h-[64px] rounded-full flex items-center justify-between px-6 sm:px-8 overflow-hidden",
    [],
  )

  return (
    <div className="fixed top-2 sm:top-4 inset-x-0 mx-auto z-50 w-full max-w-[95%] sm:max-w-3xl">
      <div
        className={useFluidGlass ? navClasses : `liquid-glass-navbar ${navClasses}`}
        role="navigation"
        aria-label="Hoofdmenu"
      >
        {useFluidGlass && (
          <>
            <FluidGlassPill className="absolute inset-0 -z-20" />
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-white/30 via-white/10 to-white/20 border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.25)]" />
          </>
        )}

        {/* Logo Button */}
        <button
          onClick={scrollToTop}
          aria-label="Ga naar bovenkant van pagina"
          className="relative h-[36px] sm:h-[40px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full transition-all duration-200 hover:opacity-80 hover:scale-105 z-10"
        >
          <Image
            src="/images/vepando-logo-main.png"
            alt="VEPANDO Logo"
            width={160}
            height={40}
            className="h-[28px] sm:h-[32px] w-auto filter drop-shadow-sm"
            priority
          />
        </button>

        {/* CTA Button */}
        <a
          href="#booking"
          className="relative inline-flex items-center gap-2 px-6 sm:px-8 h-[40px] sm:h-[44px] rounded-full text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-10"
          onClick={() => analytics.navCtaClick()}
        >
          <span>Adviesgesprek</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
