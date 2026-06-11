import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"
import LiquidPillNavbar from "@/components/liquid-pill-navbar"
import BookingSection from "@/components/booking-section"
import ReviewsSlider from "@/components/reviews-slider"
import SocialProofSection from "@/components/social-proof-section"
import HeroTrail from "@/components/hero-trail"
import HeroCta from "@/components/hero-cta"
import { SERVICE_JSON_LD, FAQ_JSON_LD, FAQ_ITEMS } from "@/lib/structured-data"

const services = [
  {
    icon: "/images/ga4icon.png",
    title: "De Marketing Agent",
    description:
      "Deze agent draait je complete marketingcampagnes. Hij kiest doelgroepen, schrijft advertenties, test wat werkt en optimaliseert je budget. Hij koppelt direct met Google Ads en levert rapporten die je ROAS (Return on Ad Spend) verhogen.",
    keywords: "marketing automation, Google Ads, ROAS optimalisatie",
  },
  {
    icon: "/images/chatboticon.png",
    title: "De Klantenservice Agent",
    description:
      "Deze agent is je 24/7 self-service helpdesk. Hij beantwoordt de meest gestelde vragen, stuurt complexe tickets direct naar de juiste persoon en vult automatisch je CRM aan. Het resultaat? 30% snellere responstijden en lagere supportkosten.",
    keywords: "chatbot, klantenservice automatisering, CRM integratie",
  },
  {
    icon: "/images/factuur-icon.png",
    title: "De Administratie & Facturatie Agent",
    description:
      "Deze agent leest je PDF-facturen, controleert de bedragen en boekt alles direct in je boekhoudsoftware. Hij voorkomt invoerfouten en maakt je financiële afsluiting tot twee keer zo snel.",
    keywords: "factuurverwerking, boekhouding automatisering, administratie",
  },
]

const processSteps = [
  {
    step: "1",
    title: "Gratis strategiesessie",
    description:
      "In 30 minuten vinden we samen jouw grootste tijdvreter. Je krijgt een concreet AI Blueprint en een vaste prijs. Daarna beslis jij.",
  },
  {
    step: "2",
    title: "Wij bouwen, jij kijkt mee",
    description:
      "We trainen de agent op jouw processen en koppelen hem aan de systemen die je al gebruikt. Tussentijds zie je precies wat hij kan.",
  },
  {
    step: "3",
    title: "Live binnen 30 dagen",
    description:
      "Je AI-collega gaat aan het werk. Wij blijven je aanspreekpunt en zorgen dat hij blijft doen wat hij moet doen.",
  },
]

const COPYRIGHT_YEAR = 2026

export default function VepandoLandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:z-50"
      >
        Spring naar hoofdinhoud
      </a>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <LiquidPillNavbar />

      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] sm:w-[800px] lg:w-[1000px] h-[600px] sm:h-[800px] lg:h-[1000px] bg-gradient-to-br from-[#4F46E5]/8 via-[#7C3AED]/6 to-[#3B82F6]/8 rounded-full blur-3xl animate-float-slow transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] sm:w-[600px] lg:w-[800px] h-[500px] sm:h-[600px] lg:h-[800px] bg-gradient-to-tr from-[#3B82F6]/6 via-[#4F46E5]/8 to-[#7C3AED]/6 rounded-full blur-3xl animate-float-reverse transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      {/* Hero */}
      <header className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 z-10 pt-20 sm:pt-0">
        <HeroTrail />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 sm:mb-8">
            Huur een AI-collega die 24/7 voor je werkt. <span className="text-primary">Zonder salaris.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Wij bouwen de AI Agent die jouw meest saaie, repetitieve werk overneemt. Binnen 30 dagen live. Je weet
            vooraf precies wat het kost. Zonder technisch gedoe.
          </p>

          <div className="px-4 sm:px-0">
            <HeroCta />

            <p className="text-sm text-muted-foreground px-4 sm:px-0">
              Plan een gratis strategiesessie &amp; ontvang een AI-plan op maat.
            </p>
          </div>
        </div>
      </header>

      <main id="main-content">
        <SocialProofSection />

        {/* Pain & Promise */}
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
                Wij bouwen een <strong className="text-foreground">AI Agent</strong>: een slimme, digitale collega die
                we trainen op jouw processen en die direct voor je aan de slag gaat.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
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
              {services.map((service) => (
                <article key={service.title} className="h-full">
                  <Card className="glass-card group hover:scale-[1.02] transition-all duration-300 h-full rounded-2xl border-0 focus-within:ring-2 focus-within:ring-primary">
                    <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={service.icon}
                          alt=""
                          fill
                          className="object-contain"
                          loading="lazy"
                          quality={85}
                          sizes="(max-width: 640px) 48px, 64px"
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
          </div>
        </section>

        {/* Process — Zo werkt het */}
        <section
          id="werkwijze"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
          aria-labelledby="process-heading"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="process-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 sm:mb-16 leading-tight"
            >
              Van eerste gesprek naar <span className="text-primary">werkende AI-collega.</span>
            </h2>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 list-none">
              {processSteps.map((step) => (
                <li key={step.step} className="h-full">
                  <Card className="glass-card h-full rounded-2xl border-0">
                    <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                      <span
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4 sm:mb-6 text-lg"
                        aria-hidden="true"
                      >
                        {step.step}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Testimonials */}
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
              Dit zeggen klanten <span className="text-primary">over hun AI-collega:</span>
            </h2>

            <ReviewsSlider />
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-10 sm:mb-14 leading-tight"
            >
              Veelgestelde <span className="text-primary">vragen</span>
            </h2>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="glass-card rounded-2xl group">
                  <summary className="cursor-pointer list-none p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-card-foreground text-base sm:text-lg min-h-[48px]">
                    {item.question}
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <BookingSection />
      </main>

      {/* Footer */}
      <footer
        className="relative py-6 px-4 sm:px-6 lg:px-8 z-10 bg-card/30 backdrop-blur-sm border-t border-border/50"
        role="contentinfo"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <span className="relative block h-5 w-20">
                <Image
                  src="/images/vepando-logo-main.png"
                  alt="VEPANDO"
                  fill
                  className="brand-logo object-contain"
                  loading="lazy"
                  quality={90}
                  sizes="80px"
                />
              </span>
            </Link>

            <nav className="flex flex-wrap justify-center items-center gap-6 text-sm" aria-label="Footer navigatie">
              <Link
                href="/#diensten"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[48px] flex items-center"
              >
                Diensten
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

            <div className="text-center text-xs text-muted-foreground">
              <p>© {COPYRIGHT_YEAR} VEPANDO • KvK 87313634 • BTW NL004567890B01</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
