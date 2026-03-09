"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Phone, Mail, Calendar } from "lucide-react"
import { analytics } from "@/lib/analytics"

export default function BookingSection() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")
  const [calLoaded, setCalLoaded] = useState(false)

  // Detect current theme
  useEffect(() => {
    const detectTheme = () => {
      // Check for manual theme setting
      const manualTheme = document.documentElement.getAttribute("data-theme")
      if (manualTheme === "dark" || manualTheme === "light") {
        return manualTheme
      }

      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }

      return "light"
    }

    const updateTheme = () => {
      const theme = detectTheme()
      setCurrentTheme(theme)
    }

    // Initial theme detection
    updateTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => updateTheme()
    mediaQuery.addEventListener("change", handleChange)

    // Listen for manual theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          updateTheme()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      observer.disconnect()
    }
  }, [])

  // Configure Cal.com with current theme - Fixed configuration
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const initializeCal = async () => {
      try {
        const cal = await getCalApi({ namespace: "adviesgesprek" })

        // Configure Cal.com
        cal("ui", {
          theme: currentTheme,
          cssVarsPerTheme: {
            light: {
              "cal-brand": "#4f46e5",
              "cal-brand-emphasis": "#4338ca",
              "cal-brand-subtle": "#e0e7ff",
              "cal-brand-text": "#ffffff",
            },
            dark: {
              "cal-brand": "#4f46e5",
              "cal-brand-emphasis": "#6366f1",
              "cal-brand-subtle": "#1e1b4b",
              "cal-brand-text": "#ffffff",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        })

        // Set loaded state and track
        timeoutId = setTimeout(() => {
          setCalLoaded(true)
          analytics.bookingCalendarLoad()
        }, 1000)
      } catch (error) {
        console.error("Cal.com initialization error:", error)
        analytics.calEmbedError(error instanceof Error ? error.message : "Unknown error")
        setCalLoaded(true)
      }
    }

    initializeCal()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentTheme])

  return (
    <section id="booking" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Klaar voor jouw <span className="text-primary">eigen AI Agent?</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Plan een gratis strategiesessie. Dit is geen sales-pitch. Dit is wat je concreet krijgt:
            </p>

            <Card className="glass-card mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Image
                    src="/images/leonard-van-hemert.png"
                    alt="Leonard van Hemert"
                    width={60}
                    height={60}
                    className="w-12 h-12 sm:w-15 sm:h-15 lg:w-20 lg:h-20 rounded-full border-4 border-background shadow-lg flex-shrink-0"
                    loading="lazy" // Changed from priority to lazy since it's below the fold
                    quality={90}
                    sizes="(max-width: 640px) 48px, (max-width: 1024px) 60px, 80px"
                  />
                  <div className="min-w-0">
                    <a
                      href="https://www.linkedin.com/in/leonard-van-hemert/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-card-foreground text-sm sm:text-base hover:text-primary transition-colors duration-200"
                    >
                      Leonard van Hemert
                    </a>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">Founder & AI Architect</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      ))}
                      <Link
                        href="/#reviews"
                        className="ml-1 sm:ml-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        4.9/5 klantbeoordeling
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Een 1-op-1 analyse</strong> van jouw grootste tijdvreters
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Een concreet &apos;AI Blueprint&apos;</strong> voor jouw eerste AI Agent
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Een vaste prijsopgave,</strong> zonder verrassingen achteraf
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 italic">
              Dit plan is 100% van jou, ook als je besluit niet met ons verder te gaan.
            </p>

            {/* NoScript Contact Information */}
            <noscript>
              <Card className="mt-6 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Direct contact opnemen?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Bel direct</p>
                        <a href="tel:+31612345678" className="text-primary hover:underline">
                          +31 6 12 34 56 78
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Stuur een e-mail</p>
                        <a href="mailto:info@vepando.com" className="text-primary hover:underline">
                          info@vepando.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Plan direct een gesprek</p>
                        <a
                          href="https://cal.com/vepando/adviesgesprek"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          cal.com/vepando/adviesgesprek
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Leonard van Hemert</strong> - Founder & AI Architect
                      <br />
                      4.9/5 sterren klantbeoordeling • Gratis strategiesessie
                    </p>
                  </div>
                </CardContent>
              </Card>
            </noscript>
          </div>

          {/* Cal.com Embed with Better Error Handling */}
          <div className="order-1 lg:order-2">
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg overflow-hidden relative">
                  {!calLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Agenda wordt geladen...</p>
                      </div>
                    </div>
                  )}

                  <Cal
                    namespace="adviesgesprek"
                    calLink="vepando/adviesgesprek"
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "scroll",
                      border: "none",
                    }}
                    config={{
                      layout: "month_view",
                      theme: currentTheme,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* NoScript Booking Fallback */}
            <noscript>
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Plan je gratis strategiesessie</h3>
                  <p className="text-muted-foreground mb-6">
                    JavaScript is vereist voor de interactieve agenda. Gebruik een van onderstaande opties:
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://cal.com/vepando/adviesgesprek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Open agenda in nieuw venster
                    </a>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="tel:+31612345678"
                        className="flex items-center justify-center gap-2 bg-card border border-border py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => analytics.bookingFallbackClick("phone")}
                      >
                        <Phone className="w-4 h-4" />
                        Bel direct
                      </a>
                      <a
                        href="mailto:info@vepando.com"
                        className="flex items-center justify-center gap-2 bg-card border border-border py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => analytics.bookingFallbackClick("email")}
                      >
                        <Mail className="w-4 h-4" />
                        E-mail
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  )
}
