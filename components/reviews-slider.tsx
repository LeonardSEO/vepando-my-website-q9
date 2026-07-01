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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <Card className="glass-card h-full">
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
                <Star key={i} className="w-4 h-4 text-[hsl(var(--gold))] fill-current" aria-hidden="true" />
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
