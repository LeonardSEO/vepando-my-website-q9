import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Mail } from "lucide-react"
import CalBooking from "@/components/cal-booking"

const deliverables = [
  {
    bold: "Een 1-op-1 analyse",
    rest: " van jouw grootste tijdvreters",
  },
  {
    bold: "Een concreet 'AI Blueprint'",
    rest: " voor jouw eerste AI Agent",
  },
  {
    bold: "Een vaste prijsopgave",
    rest: " voordat je iets beslist",
  },
]

export default function BookingSection() {
  return (
    <section id="booking" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 sm:mb-6 leading-tight">
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
                    alt="Leonard van Hemert, Founder & AI Architect van VEPANDO"
                    width={80}
                    height={80}
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-background shadow-lg flex-shrink-0 object-cover"
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
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
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">
                      Founder & AI Architect • sinds 2023
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      30+ AI Agents gebouwd voor Nederlandse MKB-bedrijven •{" "}
                      <Link href="/#reviews" className="text-primary hover:underline">
                        lees de reviews
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground list-none">
              {deliverables.map((item) => (
                <li key={item.bold} className="flex items-start">
                  <CheckCircle
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-foreground">{item.bold}</strong>
                    {item.rest}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 italic">
              Dit plan is 100% van jou, ook als je besluit niet met ons verder te gaan.
            </p>

            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Ik neem bewust maar een beperkt aantal nieuwe trajecten per maand aan, zodat elke AI Agent de aandacht
              krijgt die hij verdient.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <Card className="glass-card">
              <CardContent className="p-0">
                <CalBooking />
              </CardContent>
            </Card>

            <noscript>
              <Card className="glass-card mt-4">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">Plan je gratis strategiesessie</h3>
                  <p className="text-muted-foreground mb-6">
                    JavaScript is vereist voor de interactieve agenda. Gebruik een van onderstaande opties:
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://cal.com/vepando/adviesgesprek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold"
                    >
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      Open agenda in nieuw venster
                    </a>
                    <a
                      href="mailto:info@vepando.com"
                      className="flex items-center justify-center gap-2 bg-card border border-border py-2 px-4 rounded-lg"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      info@vepando.com
                    </a>
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
