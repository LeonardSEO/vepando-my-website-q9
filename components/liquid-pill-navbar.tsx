"use client"

import Image from "next/image"
import { analytics } from "@/lib/analytics"

export default function LiquidPillNavbar() {
  const scrollToTop = () => {
    analytics.navLogoClick()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed top-2 sm:top-4 inset-x-0 mx-auto z-50 w-full max-w-[95%] sm:max-w-3xl">
      {/* The #liquid-lens SVG filter that drives the refraction lives in
          app/layout.tsx (server-rendered) to avoid a hydration mismatch. */}
      <nav
        className="liquid-glass-navbar relative h-[56px] sm:h-[64px] rounded-xl flex items-center justify-between pl-5 pr-2 sm:pl-7 sm:pr-2.5"
        aria-label="Hoofdmenu"
      >
        <button
          onClick={scrollToTop}
          aria-label="Ga naar bovenkant van pagina"
          className="relative h-[36px] sm:h-[40px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md transition-opacity duration-200 hover:opacity-80"
        >
          <span className="relative block h-[26px] w-[104px] sm:h-[30px] sm:w-[120px]">
            <Image
              src="/images/vepando-logo-main.png"
              alt="VEPANDO Logo"
              fill
              quality={75}
              className="brand-logo object-contain"
              priority
              sizes="(max-width: 640px) 104px, 120px"
            />
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80">
          <a href="#diensten" className="hover:text-primary transition-colors duration-200 py-2">
            Diensten
          </a>
          <a href="#werkwijze" className="hover:text-primary transition-colors duration-200 py-2">
            Werkwijze
          </a>
          <a href="#reviews" className="hover:text-primary transition-colors duration-200 py-2">
            Reviews
          </a>
        </div>

        <a
          href="#booking"
          className="relative inline-flex items-center gap-2 px-5 sm:px-7 h-[42px] sm:h-[46px] rounded-lg text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
          onClick={() => analytics.navCtaClick()}
        >
          <span>Adviesgesprek</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </nav>
    </div>
  )
}
