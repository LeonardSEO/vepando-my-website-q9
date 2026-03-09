"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Linkedin, Mail } from "lucide-react"
import Script from "next/script"
import LiquidPillNavbar from "@/components/liquid-pill-navbar"
import BookingSection from "@/components/booking-section"
import ReviewsSlider from "@/components/reviews-slider"
import SocialProofSection from "@/components/social-proof-section"
import CiteMetActionHub from "@/components/cite-met-action-hub"
import Link from "next/link"
import { analytics } from "@/lib/analytics"
import { SERVICE_JSON_LD } from "@/lib/structured-data"

const NeuralTrail = dynamic(() => import("@/components/hero/NeuralTrail"), {
  ssr: false,
})

export default function VepandoLandingPage() {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Track page load performance
    const startTime = performance.now()
    const handleLoad = () => {
      const loadTime = performance.now() - startTime
      analytics.pageLoadComplete(loadTime)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:z-50"
      >
        Spring naar hoofdinhoud
      </a>

      {/* NoScript Critical Content - Visible to crawlers without JavaScript */}
      <noscript>
        <div className="bg-primary text-primary-foreground p-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">VEPANDO - AI Agents voor MKB</h1>
            <p className="mb-4">
              Huur een AI-collega die 24/7 voor je werkt zonder salaris. Wij bouwen binnen 30 dagen een AI Agent die
              jouw repetitieve werk overneemt.
            </p>
            <div className="space-y-2">
              <p>
                <strong>📞 Direct contact:</strong>{" "}
                <a href="tel:+31612345678" className="underline">
                  +31 6 12 34 56 78
                </a>
              </p>
              <p>
                <strong>✉️ E-mail:</strong>{" "}
                <a href="mailto:info@vepando.com" className="underline">
                  info@vepando.com
                </a>
              </p>
              <p>
                <strong>🗓️ Plan gesprek:</strong>{" "}
                <a href="https://cal.com/vepando/adviesgesprek" className="underline">
                  cal.com/vepando/adviesgesprek
                </a>
              </p>
            </div>
          </div>
        </div>
      </noscript>

      {/* Structured Data for Services */}
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SERVICE_JSON_LD),
        }}
      />

      {/* First-party Liquid Glass Navbar */}
      <LiquidPillNavbar />

      {/* NoScript Navigation Fallback */}
      <noscript>
        <nav className="bg-card border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="font-bold text-xl">VEPANDO</div>
            <div className="space-x-4">
              <a href="#diensten" className="text-primary hover:underline">
                Services
              </a>
              <a href="#reviews" className="text-primary hover:underline">
                Reviews
              </a>
              <a href="#booking" className="text-primary hover:underline">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </noscript>

      {/* Fluid Motion Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] sm:w-[800px] lg:w-[1000px] h-[600px] sm:h-[800px] lg:h-[1000px] bg-gradient-to-br from-[#4F46E5]/8 via-[#7C3AED]/6 to-[#3B82F6]/8 rounded-full blur-3xl animate-float-slow transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] sm:w-[600px] lg:w-[800px] h-[500px] sm:h-[600px] lg:h-[800px] bg-gradient-to-tr from-[#3B82F6]/6 via-[#4F46E5]/8 to-[#7C3AED]/6 rounded-full blur-3xl animate-float-reverse transform -translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-r from-[#7C3AED]/4 to-[#4F46E5]/4 rounded-full blur-3xl animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Hero Section */}
      <header
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 z-10 pt-20 sm:pt-0"
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          <NeuralTrail containerRef={heroRef} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 sm:mb-8">
            Huur een AI-collega die 24/7 voor je werkt. <span className="text-primary">Zonder salaris.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Wij bouwen de AI Agent die jouw meest saaie, repetitieve werk overneemt. Binnen 30 dagen live, voor een
            vaste, eenmalige prijs. Geen dure software, geen technisch gedoe.
          </p>

          <div className="px-4 sm:px-0">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 mb-4 w-full sm:w-auto min-h-[48px]"
            >
              <a
                href="#booking"
                className="flex items-center justify-center gap-2"
                aria-label="Plan een gratis adviesgesprek"
                onClick={() => analytics.heroCtaClick()}
              >
                <span className="hidden sm:inline">Ontdek wat een AI Agent voor jou kan doen</span>
                <span className="sm:hidden">Ontdek jouw AI Agent</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
            </Button>

            <p className="text-sm text-muted-foreground px-4 sm:px-0">
              Plan een gratis strategiesessie & ontvang een AI-plan op maat.
            </p>

            {/* NoScript CTA Fallback */}
            <noscript>
              <div className="mt-4 p-4 bg-card border border-border rounded-lg">
                <p className="font-semibold mb-2">Direct contact opnemen?</p>
                <div className="space-y-2 text-sm">
                  <p>
                    📞{" "}
                    <a href="tel:+31612345678" className="text-primary hover:underline">
                      +31 6 12 34 56 78
                    </a>
                  </p>
                  <p>
                    ✉️{" "}
                    <a href="mailto:info@vepando.com" className="text-primary hover:underline">
                      info@vepando.com
                    </a>
                  </p>
                  <p>
                    🗓️{" "}
                    <a href="https://cal.com/vepando/adviesgesprek" className="text-primary hover:underline">
                      Plan direct een gesprek
                    </a>
                  </p>
                </div>
              </div>
            </noscript>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Social Proof Section - NEW BEAUTIFUL VERSION */}
        <SocialProofSection />

        {/* Pain & Promise Section */}
        <section
          id="probleem"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
          aria-labelledby="problem-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="problem-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 sm:mb-16 leading-tight"
            >
              Je bent geen ondernemer geworden <span className="text-primary">om data over te typen.</span>
            </h2>

            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                Handmatige processen, eindeloze Excel-sheets en repetitieve klantvragen zijn de onzichtbare kostenpost
                in je bedrijf. Ze stelen de tijd van jou en je team. Tijd die niet naar klanten of groei gaat.
              </p>
              <p className="text-lg sm:text-xl text-foreground font-semibold mb-6 sm:mb-8">
                <span className="text-primary">De oplossing is simpel:</span> geef dat saaie werk aan een robot.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Wij bouwen geen vage rapporten. Wij bouwen een <strong className="text-foreground">AI Agent</strong>:
                een slimme, digitale collega die we trainen op jouw processen en die direct voor je aan de slag gaat.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="diensten"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
          aria-labelledby="services-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 sm:mb-16 leading-tight"
            >
              Drie AI Agents die we <span className="text-primary">onlangs hebben ingewerkt:</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: "/images/ga4icon.png",
                  title: "De Marketing Agent",
                  description:
                    "Deze agent draait je complete marketingcampagnes. Hij kiest doelgroepen, schrijft advertenties, test wat werkt en optimaliseert je budget. Hij koppelt direct met Google Ads en levert rapporten die je ROAS (Return on Ad Spend) verhogen.",
                  keywords: "marketing automation, Google Ads, ROAS optimalisatie",
                  iconWidth: 128,
                  iconHeight: 149,
                },
                {
                  icon: "/images/chatboticon.png",
                  title: "De Klantenservice Agent",
                  description:
                    "Deze agent is je 24/7 self-service helpdesk. Hij beantwoordt de meest gestelde vragen, stuurt complexe tickets direct naar de juiste persoon en vult automatisch je CRM aan. Het resultaat? 30% snellere responstijden en lagere supportkosten.",
                  keywords: "chatbot, klantenservice automatisering, CRM integratie",
                  iconWidth: 64,
                  iconHeight: 64,
                },
                {
                  icon: "/images/factuur-icon.png",
                  title: "De Administratie & Facturatie Agent",
                  description:
                    "Deze agent leest je PDF-facturen, controleert de bedragen en boekt alles direct in je boekhoudsoftware. Hij voorkomt invoerfouten en maakt je financiële afsluiting tot twee keer zo snel.",
                  keywords: "factuurverwerking, boekhouding automatisering, administratie",
                  iconWidth: 128,
                  iconHeight: 152,
                },
              ].map((service, index) => (
                <article key={index} className="h-full">
                  <Card className="glass-card group hover:scale-[1.02] sm:hover:scale-[1.05] transition-all duration-300 h-full rounded-2xl border-0 focus-within:ring-2 focus-within:ring-primary">
                    <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={service.icon || "/placeholder.svg?height=64&width=64&text=Icon"}
                          alt={`${service.title} - AI automatisering icoon`}
                          width={service.iconWidth || 64}
                          height={service.iconHeight || 64}
                          className="max-w-12 max-h-12 sm:max-w-16 sm:max-h-16 w-auto h-auto object-contain"
                          loading="lazy"
                          quality={85}
                          sizes="(max-width: 640px) 48px, 64px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=64&width=64&text=" + encodeURIComponent(service.title)
                          }}
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                        {service.description}
                      </p>
                      <div className="sr-only">{service.keywords}</div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            {/* NoScript Services Fallback */}
            <noscript>
              <div className="mt-8 bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Onze AI Agent Services:</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">🎯 Marketing Agent</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatiseert marketingcampagnes en Google Ads optimalisatie
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">💬 Klantenservice Agent</h4>
                    <p className="text-sm text-muted-foreground">
                      24/7 AI chatbot voor klantenservice en CRM automatisering
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">📊 Administratie Agent</h4>
                    <p className="text-sm text-muted-foreground">Factuurverwerking en boekhouding automatisering</p>
                  </div>
                </div>
              </div>
            </noscript>
          </div>
        </section>

        {/* Testimonials Section with Slider */}
        <section
          id="reviews"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="testimonials-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 sm:mb-16 leading-tight"
            >
              <span className="text-primary">Resultaten.</span> Geen praatjes.
            </h2>

            <ReviewsSlider />
          </div>
        </section>

        {/* Booking Section with Cal.com Embed */}
        <BookingSection />

        {/* CiteMET Action Hub */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-6xl mx-auto">
            <CiteMetActionHub
              pageTitle="AI Agents voor MKB Automatisering - VEPANDO"
              pageTopic="AI Agents en Business Process Automation voor het MKB"
              pageExpertise="Custom AI Solutions, Chatbots, en Proces Automatisering"
            />
          </div>
        </section>
      </main>

      {/* Minimalistic Footer - 2025 Design */}
      <footer
        className="relative py-6 px-4 sm:px-6 lg:px-8 z-10 bg-card/30 backdrop-blur-sm border-t border-border/50"
        role="contentinfo"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo */}
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <Image
                src="/images/vepando-logo-main.png"
                alt="VEPANDO"
                width={100}
                height={25}
                className="h-5 w-auto"
                loading="lazy"
                quality={90}
                sizes="100px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=25&width=100&text=VEPANDO"
                }}
              />
            </Link>

            {/* Essential Links */}
            <nav className="flex flex-wrap justify-center items-center gap-6 text-sm" aria-label="Footer navigatie">
              <Link
                href="/#diensten"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] flex items-center"
              >
                Services
              </Link>
              <Link
                href="/#booking"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] flex items-center"
              >
                Contact
              </Link>
              <Link
                href="/legal"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] flex items-center"
              >
                Juridisch
              </Link>
              <a
                href="/sitemap.xml"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] flex items-center"
              >
                Sitemap
              </a>
            </nav>

            {/* Social & Contact */}
            <div className="flex items-center space-x-6">
              <a
                href="https://www.linkedin.com/company/vepando-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="VEPANDO op LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@vepando.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="E-mail naar VEPANDO"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Legal Info */}
            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>© {new Date().getFullYear()} VEPANDO • KvK 87313634 • BTW NL004567890B01</p>
              <p>{""}</p>
            </div>

            {/* NoScript Footer Contact */}
            <noscript>
              <div className="text-center mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="font-semibold mb-2">Direct contact:</p>
                <div className="space-y-1 text-sm">
                  <p>
                    📞{" "}
                    <a href="tel:+31612345678" className="text-primary hover:underline">
                      +31 6 12 34 56 78
                    </a>
                  </p>
                  <p>
                    ✉️{" "}
                    <a href="mailto:info@vepando.com" className="text-primary hover:underline">
                      info@vepando.com
                    </a>
                  </p>
                  <p>
                    🗓️{" "}
                    <a href="https://cal.com/vepando/adviesgesprek" className="text-primary hover:underline">
                      Plan gesprek
                    </a>
                  </p>
                </div>
              </div>
            </noscript>
          </div>
        </div>
      </footer>
    </div>
  )
}
