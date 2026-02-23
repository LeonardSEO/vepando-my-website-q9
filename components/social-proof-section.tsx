"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { analytics } from "@/lib/analytics"

const companies = [
  {
    name: "Maatwerk Online",
    logo: "/images/maatwerk-online-logo.webp",
    fallback: "Maatwerk Online",
    width: 140,
    height: 40, // Consistent height
  },
  {
    name: "Vloerenconcurrent",
    logo: "/images/vloerenconcurrent-logo.webp",
    fallback: "Vloerenconcurrent",
    width: 160,
    height: 40, // Consistent height
  },
  {
    name: "Search Signals",
    logo: "/images/search-signals-logo.png",
    fallback: "Search Signals",
    width: 120,
    height: 40, // Consistent height
  },
]

function renderLogoFallback(parent: HTMLElement, text: string) {
  const fallback = document.createElement("div")
  fallback.className = "text-sm font-medium text-muted-foreground px-4 py-2 bg-muted rounded"
  fallback.textContent = text
  parent.replaceChildren(fallback)
}

export default function SocialProofSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="social-proof-heading">
      <div className="max-w-6xl mx-auto text-center">
        <h2 id="social-proof-heading" className="sr-only">
          Vertrouwd door MKB-bedrijven
        </h2>

        {/* Elegant heading */}
        <div className="mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-muted-foreground font-medium tracking-wide uppercase mb-6">
            Vertrouwd door MKB-bedrijven die vooroplopen
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-md"></div>
            <div className="mx-4 w-2 h-2 rounded-full bg-primary/30"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-md"></div>
          </div>
        </div>

        {/* Company logos with consistent sizing and mobile-first layout */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Mobile: Stack vertically with consistent spacing */}
          <div className="flex flex-col items-center gap-6 sm:hidden">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={`group transition-all duration-700 ${
                  isVisible ? "opacity-70 scale-100" : "opacity-0 scale-95"
                } hover:opacity-100 hover:scale-105`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  filter: "grayscale(100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)"
                  analytics.socialProofLogoHover(company.name)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)"
                }}
              >
                <div className="relative flex items-center justify-center h-12 w-40">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={company.width}
                    height={40}
                    className="max-h-10 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-lg"
                    loading="lazy"
                    quality={90}
                    sizes="160px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const parent = target.parentElement
                      if (parent) {
                        renderLogoFallback(parent, company.fallback)
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal layout with consistent alignment */}
          <div className="hidden sm:flex justify-center items-center gap-8 lg:gap-12">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className={`group transition-all duration-700 ${
                  isVisible ? "opacity-70 scale-100" : "opacity-0 scale-95"
                } hover:opacity-100 hover:scale-105`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  filter: "grayscale(100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)"
                  analytics.socialProofLogoHover(company.name)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)"
                }}
              >
                <div className="relative flex items-center justify-center h-12 min-w-[120px]">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={company.width}
                    height={40}
                    className="max-h-10 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-lg"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 1024px) 140px, 160px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const parent = target.parentElement
                      if (parent) {
                        renderLogoFallback(parent, company.fallback)
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle stats or additional info */}
        <div className="mt-8 sm:mt-12">
          <div className="flex justify-center items-center space-x-6 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>30+ AI Agents live</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <a
                href="/#reviews"
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => analytics.reviewScoreClick()}
              >
                4.9/5 ⭐ beoordeling
              </a>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>100% Nederlandse MKB</span>
            </div>
          </div>
        </div>

        {/* NoScript Fallback */}
        <noscript>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {companies.map((company) => (
              <div key={company.name}>
                <div className="w-20 h-12 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  )
}
