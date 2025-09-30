import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Star, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

// Force static generation for better crawler support
export const dynamic = "force-static"

export default function StaticVepandoPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Agent Development voor MKB",
            provider: {
              "@type": "Organization",
              name: "VEPANDO",
            },
            description:
              "Wij bouwen binnen 30 dagen een AI Agent die repetitieve taken automatiseert voor MKB bedrijven",
            serviceType: "AI Automation",
            areaServed: "Nederland",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI Agent Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Marketing Agent",
                    description: "AI agent voor marketingcampagne automatisering en Google Ads optimalisatie",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Klantenservice Agent",
                    description: "24/7 AI chatbot voor klantenservice en CRM automatisering",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Administratie Agent",
                    description: "AI voor factuurverwerking en boekhouding automatisering",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* Static Navigation for Crawlers */}
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

      {/* Hero Section - Static Content */}
      <header className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 z-10 pt-20 sm:pt-0">
        <div className="max-w-4xl mx-auto text-center">
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
              >
                <span className="hidden sm:inline">Ontdek wat een AI Agent voor jou kan doen</span>
                <span className="sm:hidden">Ontdek jouw AI Agent</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
            </Button>

            <p className="text-sm text-muted-foreground px-4 sm:px-0">
              Plan een gratis strategiesessie & ontvang een AI-plan op maat.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
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
              <article className="h-full">
                <Card className="glass-card h-full rounded-2xl border-0">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Image
                        src="/images/ga4icon.png"
                        alt="Marketing Agent - AI automatisering icoon"
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-16 sm:h-16"
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 640px) 48px, 64px"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                      De Marketing Agent
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                      Deze agent draait je complete marketingcampagnes. Hij kiest doelgroepen, schrijft advertenties,
                      test wat werkt en optimaliseert je budget. Hij koppelt direct met Google Ads en levert rapporten
                      die je ROAS (Return on Ad Spend) verhogen.
                    </p>
                  </CardContent>
                </Card>
              </article>

              <article className="h-full">
                <Card className="glass-card h-full rounded-2xl border-0">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Image
                        src="/images/chatboticon.png"
                        alt="Klantenservice Agent - AI automatisering icoon"
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-16 sm:h-16"
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 640px) 48px, 64px"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                      De Klantenservice Agent
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                      Deze agent is je 24/7 self-service helpdesk. Hij beantwoordt de meest gestelde vragen, stuurt
                      complexe tickets direct naar de juiste persoon en vult automatisch je CRM aan. Het resultaat? 30%
                      snellere responstijden en lagere supportkosten.
                    </p>
                  </CardContent>
                </Card>
              </article>

              <article className="h-full">
                <Card className="glass-card h-full rounded-2xl border-0">
                  <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Image
                        src="/images/factuur-icon.png"
                        alt="Administratie Agent - AI automatisering icoon"
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-16 sm:h-16"
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 640px) 48px, 64px"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                      De Administratie & Facturatie Agent
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                      Deze agent leest je PDF-facturen, controleert de bedragen en boekt alles direct in je
                      boekhoudsoftware. Hij voorkomt invoerfouten en maakt je financiële afsluiting tot twee keer zo
                      snel.
                    </p>
                  </CardContent>
                </Card>
              </article>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  image: "/images/lars-maatwerk-online.webp",
                  name: "Lars",
                  title: "Co-Founder @ Maatwerk Online",
                  quote:
                    "Leonard's expertise is ongekend. Hij heeft voor ons meerdere processen geautomatiseerd, waaronder een complexe AI-agent die direct aan onze Google Ads-campagnes is gekoppeld. Voor agencies is VEPANDO een strategische partner, geen doorsnee leverancier.",
                },
                {
                  image: "/images/niels-vloerenconcurrent.webp",
                  name: "Niels",
                  title: "Eigenaar @ Vloerenconcurrent.com",
                  quote:
                    "Onze klantenservice-inbox was een chaos. VEPANDO heeft dit opgelost door een slimme AI e-mail classifier te bouwen die direct prioriteiten stelt en vragen naar het juiste teamlid routeert. Een onmisbare, efficiënte oplossing.",
                },
                {
                  image: "/images/bas-search-signals.webp",
                  name: "Bas",
                  title: "Founder @ Search Signals",
                  quote:
                    "Voor de ontwikkeling van onze GenAI Tracker zochten we een partner die niet alleen meedenkt, maar ook kan bouwen. Leonard's vermogen om een complex idee snel om te zetten in een werkend, schaalbaar product is indrukwekkend.",
                },
              ].map((testimonial, index) => (
                <article key={index}>
                  <Card>
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={`${testimonial.name} - ${testimonial.title}`}
                          width={60}
                          height={60}
                          className="w-12 h-12 sm:w-15 sm:h-15 rounded-full border-4 border-background shadow-lg flex-shrink-0"
                          loading="lazy"
                          quality={85}
                          sizes="(max-width: 640px) 48px, 60px"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex mb-2 sm:mb-3" role="img" aria-label="5 sterren beoordeling">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <blockquote className="text-sm sm:text-base text-card-foreground mb-3 sm:mb-4 italic leading-relaxed font-medium">
                            {testimonial.quote}
                          </blockquote>
                          <cite className="not-italic">
                            <p className="font-semibold text-card-foreground text-sm sm:text-base">
                              {testimonial.name}
                            </p>
                            <p className="text-muted-foreground text-xs sm:text-sm">{testimonial.title}</p>
                          </cite>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="booking" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Klaar voor jouw <span className="text-primary">eigen AI Agent?</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Plan een gratis strategiesessie. Dit is geen sales-pitch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">1-op-1 Analyse</h3>
                  <p className="text-sm text-muted-foreground">Van jouw grootste tijdvreters</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Blueprint</h3>
                  <p className="text-sm text-muted-foreground">Concreet plan voor jouw eerste AI Agent</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Vaste Prijsopgave</h3>
                  <p className="text-sm text-muted-foreground">Zonder verrassingen achteraf</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/images/leonard-van-hemert.png"
                  alt="Leonard van Hemert"
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full border-4 border-background shadow-lg"
                  priority
                  quality={90}
                />
                <div className="text-left">
                  <p className="font-semibold">Leonard van Hemert</p>
                  <p className="text-sm text-muted-foreground">Founder & AI Architect</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <a
                      href="/#reviews"
                      className="ml-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      4.9/5 klantbeoordeling
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p>
                  <strong>📞 Direct bellen:</strong>{" "}
                  <a href="tel:+31612345678" className="text-primary hover:underline">
                    +31 6 12 34 56 78
                  </a>
                </p>
                <p>
                  <strong>✉️ E-mail:</strong>{" "}
                  <a href="mailto:info@vepando.com" className="text-primary hover:underline">
                    info@vepando.com
                  </a>
                </p>
                <p>
                  <strong>🗓️ Plan gesprek:</strong>{" "}
                  <a
                    href="https://cal.com/vepando/adviesgesprek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    cal.com/vepando/adviesgesprek
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="relative py-6 px-4 sm:px-6 lg:px-8 z-10 bg-card/30 backdrop-blur-sm border-t border-border/50"
        role="contentinfo"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
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
              />
            </Link>

            <nav className="flex flex-wrap justify-center items-center gap-6 text-sm" aria-label="Footer navigatie">
              <a href="/#diensten" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Services
              </a>
              <a href="/#booking" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Contact
              </a>
              <a href="/legal" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Juridisch
              </a>
              <a
                href="/sitemap.xml"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sitemap
              </a>
            </nav>

            <div className="flex items-center space-x-6">
              <a
                href="https://www.linkedin.com/company/vepando-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="VEPANDO op LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@vepando.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="E-mail naar VEPANDO"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>© {new Date().getFullYear()} VEPANDO • KvK 87313634 • BTW NL004567890B01</p>
              <p>+31 6 12 34 56 78 • Amsterdam, Nederland</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
