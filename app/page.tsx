import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail, Clock, ShieldCheck, FileCheck2 } from "lucide-react"
import LiquidPillNavbar from "@/components/liquid-pill-navbar"
import BookingSection from "@/components/booking-section"
import ReviewsSlider from "@/components/reviews-slider"
import SocialProofSection from "@/components/social-proof-section"
import HeroTrail from "@/components/hero-trail"
import HeroCta from "@/components/hero-cta"
import TerminalWindow from "@/components/terminal-window"
import StatusBadge from "@/components/status-badge"
import DossierCard from "@/components/dossier-card"
import { SERVICE_JSON_LD, FAQ_JSON_LD, FAQ_ITEMS } from "@/lib/structured-data"

const services = [
  {
    number: "01",
    title: "De Marketing Agent",
    description:
      "Deze agent draait je complete marketingcampagnes. Hij kiest doelgroepen, schrijft advertenties, test wat werkt en optimaliseert je budget. Hij koppelt direct met Google Ads en levert rapporten die je ROAS (Return on Ad Spend) verhogen.",
    illustration: "/images/dossier-01-marketing-agent.png",
    illustrationAlt: "Patent-tekening van een doelmechaniek gekoppeld aan een oplopende resultatengrafiek",
    input: "Doelgroep, budget, Google Ads-account",
    output: "Advertenties + biedstrategie + rapportage",
    humanCheck: "Wekelijkse review",
    keywords: "marketing automation, Google Ads, ROAS optimalisatie",
  },
  {
    number: "02",
    title: "De Klantenservice Agent",
    description:
      "Deze agent is je 24/7 self-service helpdesk. Hij beantwoordt de meest gestelde vragen, stuurt complexe tickets direct naar de juiste persoon en vult automatisch je CRM aan. Het resultaat? 30% snellere responstijden en lagere supportkosten.",
    illustration: "/images/dossier-02-klantenservice-agent.png",
    illustrationAlt: "Patent-tekening van een mechanische sorteerwissel die post naar auto-antwoord of doorverwijzing stuurt",
    input: "Inkomend ticket of chatbericht",
    output: "Antwoord, of routing + CRM-update",
    humanCheck: "Escaleert bij twijfel",
    keywords: "chatbot, klantenservice automatisering, CRM integratie",
  },
  {
    number: "03",
    title: "De Administratie & Facturatie Agent",
    description:
      "Deze agent leest je PDF-facturen, controleert de bedragen en boekt alles direct in je boekhoudsoftware. Hij voorkomt invoerfouten en maakt je financiële afsluiting tot twee keer zo snel.",
    illustration: "/images/dossier-03-administratie-facturatie.png",
    illustrationAlt: "Patent-tekening van een factuur die via een stempelmechaniek in een boekhoudregister landt",
    input: "PDF-factuur",
    output: "Boeking in je boekhoudsoftware",
    humanCheck: "Steekproefcontrole",
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

      {/* Ambient background — a quiet blueprint grid instead of colour orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none blueprint-grid" aria-hidden="true" />

      {/* Hero */}
      <header className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 z-10 pt-24 sm:pt-20 lg:pt-0">
        <HeroTrail />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 sm:mb-8">
              Huur een AI-collega die 24/7 voor je werkt. <span className="text-primary">Zonder salaris.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 lg:px-0">
              Wij bouwen de AI Agent die jouw meest saaie, repetitieve werk overneemt. Binnen 30 dagen live. Je weet
              vooraf precies wat het kost. Zonder technisch gedoe.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 sm:mb-10">
              <StatusBadge label="Live binnen 30 dagen" icon={Clock} />
              <StatusBadge label="Menselijke controle" icon={ShieldCheck} />
              <StatusBadge label="AVG-bewust" icon={FileCheck2} />
            </div>

            <div className="px-4 sm:px-0 lg:px-0">
              <HeroCta />

              <p className="text-sm text-muted-foreground px-4 sm:px-0 lg:px-0">
                Plan een gratis strategiesessie &amp; ontvang een AI-plan op maat.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 max-w-xl mx-auto lg:mx-0 w-full">
            <TerminalWindow
              className="w-full text-left"
              title="Agent console — Vepando"
              lines={[
                { type: "success", text: "✓ Marketing Agent — actief" },
                { type: "success", text: "✓ Klantenservice Agent — actief" },
                { type: "output", text: "→ Nieuwe aanvraag verwerkt (offerte #1042)" },
                { type: "output", text: "→ Conceptmail klaar voor controle" },
                { type: "accent", text: "Menselijke check: vereist" },
              ]}
              statusLine="Live binnen 30 dagen · vaste prijs vooraf"
            />

            <div className="relative hidden aspect-[1448/1086] w-full overflow-hidden rounded-lg sm:block">
              <Image
                src="/images/hero-agent-procesmachine.png"
                alt="Patent-tekening van een bedrijfsproces als machine: inbox, document, agent, menselijke controle en output"
                fill
                className="object-contain"
                loading="lazy"
                quality={90}
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>
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
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground text-center mb-12 sm:mb-16 leading-tight"
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
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground text-center mb-12 sm:mb-16 leading-tight"
            >
              Drie AI Agents die we <span className="text-primary">onlangs hebben ingewerkt:</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <DossierCard key={service.title} {...service} />
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
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground text-center mb-12 sm:mb-16 leading-tight"
            >
              Van eerste gesprek naar <span className="text-primary">werkende AI-collega.</span>
            </h2>

            <div className="relative mb-10 sm:mb-12 aspect-[2172/724] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/werkwijze-workflow-blueprint.png"
                alt="Patent-tekening van het 30-dagen proces in drie stappen: intake, bouwen en live"
                fill
                className="object-contain"
                loading="lazy"
                quality={90}
                sizes="(max-width: 1024px) 95vw, 1152px"
              />
            </div>

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
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground text-center mb-12 sm:mb-16 leading-tight"
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
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground text-center mb-10 sm:mb-14 leading-tight"
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
