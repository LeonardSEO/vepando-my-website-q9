"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { analytics } from "@/lib/analytics"

export default function HeroCta() {
  return (
    <Button
      asChild
      size="lg"
      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 mb-4 w-full sm:w-auto min-h-[48px]"
    >
      <a
        href="#booking"
        className="flex items-center justify-center gap-2"
        aria-label="Plan een gratis strategiesessie"
        onClick={() => analytics.heroCtaClick()}
      >
        <span className="hidden sm:inline">Ontdek wat een AI Agent voor jou kan doen</span>
        <span className="sm:hidden">Ontdek jouw AI Agent</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
      </a>
    </Button>
  )
}
