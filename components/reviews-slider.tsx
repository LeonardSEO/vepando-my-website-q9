"use client"

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
      "Leonard's expertise is ongekend. Hij heeft voor ons meerdere processen geautomatiseerd ,waaronder een complexe AI-agent die direct aan onze Google Ads-campagnes is gekoppeld. Het bespaart ons niet alleen uren per week, maar maakt onze campagnes ook slimmer. Voor agencies is VEPANDO een strategische partner, geen doorsnee leverancier.",
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
      {/* Main slider container with dramatic fade masks */}
      <div className="relative overflow-hidden">
        {/* Seamless infinite scroll container */}
        <div className="flex animate-scroll-left">
          {/* First set of reviews */}
          {reviews.map((review) => (
            <div key={`first-${review.id}`} className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[400px] px-3">
              <ReviewCard review={review} />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {reviews.map((review) => (
            <div key={`second-${review.id}`} className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[400px] px-3">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Left fade gradient - theme-aware */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 lg:w-48 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, 
              var(--background) 0%, 
              var(--background) 30%, 
              rgba(var(--background-rgb), 0.8) 50%,
              rgba(var(--background-rgb), 0.4) 75%,
              transparent 100%
            )`,
          }}
        />

        {/* Right fade gradient - theme-aware */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 lg:w-48 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, 
              var(--background) 0%, 
              var(--background) 30%, 
              rgba(var(--background-rgb), 0.8) 50%,
              rgba(var(--background-rgb), 0.4) 75%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* Subtle indicator dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {reviews.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-primary/20 animate-pulse"
            style={{ animationDelay: `${index * 0.5}s` }}
          />
        ))}
      </div>

      {/* NoScript Fallback */}
      <noscript>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </noscript>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
          width: calc(200% + 12px); // Reduced from 24px to 12px for tighter mobile spacing
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left {
            animation: none;
          }
        }

        /* Theme-aware fade gradients */
        [data-theme="light"] .fade-left {
          background: linear-gradient(to right, 
            #f8f8fa 0%, 
            #f8f8fa 20%, 
            rgba(248, 248, 250, 0.8) 40%,
            rgba(248, 248, 250, 0.4) 70%,
            transparent 100%
          );
        }

        [data-theme="light"] .fade-right {
          background: linear-gradient(to left, 
            #f8f8fa 0%, 
            #f8f8fa 20%, 
            rgba(248, 248, 250, 0.8) 40%,
            rgba(248, 248, 250, 0.4) 70%,
            transparent 100%
          );
        }

        [data-theme="dark"] .fade-left {
          background: linear-gradient(to right, 
            #0f0f11 0%, 
            #0f0f11 20%, 
            rgba(15, 15, 17, 0.8) 40%,
            rgba(15, 15, 17, 0.4) 70%,
            transparent 100%
          );
        }

        [data-theme="dark"] .fade-right {
          background: linear-gradient(to left, 
            #0f0f11 0%, 
            #0f0f11 20%, 
            rgba(15, 15, 17, 0.8) 40%,
            rgba(15, 15, 17, 0.4) 70%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <Card className="glass-card h-[400px] group hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header with profile and stars */}
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={review.image || "/placeholder.svg?height=48&width=48&text=" + encodeURIComponent(review.name)}
            alt={`${review.name} - ${review.title}`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-3 border-background shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            quality={85}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=48&width=48&text=" + encodeURIComponent(review.name)
            }}
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

        {/* Quote - takes up remaining space */}
        <blockquote className="text-sm text-card-foreground italic leading-relaxed font-medium flex-1 flex items-start">
          <span>&ldquo;{review.quote}&rdquo;</span>
        </blockquote>
      </CardContent>
    </Card>
  )
}
