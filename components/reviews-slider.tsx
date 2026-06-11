import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    image: "/images/lars-maatwerk-online.webp",
    name: "Lars",
    title: "Co-Founder @ Maatwerk Online",
    company: "Maatwerk Online",
    quote:
      "Leonard's expertise is ongekend. Hij heeft voor ons meerdere processen geautomatiseerd, waaronder een complexe AI-agent die direct aan onze Google Ads-campagnes is gekoppeld. Het bespaart ons niet alleen uren per week, maar maakt onze campagnes ook slimmer. Voor agencies is VEPANDO een strategische partner, geen doorsnee leverancier.",
  },
  {
    id: 2,
    image: "/images/niels-vloerenconcurrent.webp",
    name: "Niels",
    title: "Eigenaar @ Vloerenconcurrent.com",
    company: "Vloerenconcurrent.com",
    quote:
      "Onze klantenservice-inbox was een chaos. VEPANDO heeft dit opgelost door een slimme AI e-mail classifier te bouwen die direct prioriteiten stelt en vragen naar het juiste teamlid routeert. Het resultaat? We kunnen veel sneller de juiste klant helpen en hebben eindelijk weer overzicht. Een onmisbare, efficiënte oplossing.",
  },
  {
    id: 3,
    image: "/images/bas-search-signals.webp",
    name: "Bas",
    title: "Founder @ Search Signals",
    company: "Search Signals",
    quote:
      "Voor de ontwikkeling van onze GenAI Tracker zochten we een partner die niet alleen meedenkt, maar ook kan bouwen. VEPANDO was die partner. Leonard's vermogen om een complex idee snel om te zetten in een werkend, schaalbaar product is indrukwekkend. Hij is onze vaste keus voor complexe AI- en automatiseringsprojecten.",
  },
]

export default function ReviewsSlider() {
  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden">
        <div className="reviews-marquee">
          {reviews.map((review) => (
            <div key={review.id} className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[400px] px-3 py-2">
              <ReviewCard review={review} />
            </div>
          ))}
          {/* Duplicate set for the seamless loop; hidden from assistive tech and removed when reduced motion is on */}
          <div aria-hidden="true" className="flex">
            {reviews.map((review) => (
              <div key={review.id} className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[400px] px-3 py-2">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-40 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, var(--background) 0%, rgba(var(--background-rgb), 0.6) 50%, transparent 100%)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-40 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, var(--background) 0%, rgba(var(--background-rgb), 0.6) 50%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <Card className="glass-card h-[400px]">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={review.image}
            alt={`${review.name} - ${review.title}`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-2 border-background shadow-lg flex-shrink-0 object-cover"
            loading="lazy"
            quality={85}
          />
          <div className="flex-1 min-w-0">
            <div className="flex mb-3" role="img" aria-label="5 sterren beoordeling">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
              ))}
            </div>
            <div>
              <p className="font-semibold text-card-foreground text-base">{review.name}</p>
              <p className="text-muted-foreground text-sm leading-tight">{review.title}</p>
            </div>
          </div>
        </div>

        <blockquote className="text-sm text-card-foreground italic leading-relaxed font-medium flex-1">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  )
}
