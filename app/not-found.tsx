"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bot, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import NeuralTrail from "@/components/hero/NeuralTrail"

/**
 * The 404 page reuses the site's own "dossier" language for the joke —
 * this page is a case file about itself. Same design system as every
 * other page (blueprint grid, dossier card, ink-blue/gold/cream), not a
 * separate dark "error screen" bolted on the side.
 */
export default function NotFound() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    containerRef.current = wrapperRef.current?.parentElement ?? null
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="fixed inset-0 z-0 blueprint-grid pointer-events-none" aria-hidden="true" />
      <div ref={wrapperRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <NeuralTrail containerRef={containerRef} ambient ambientCount={30} connectionRadius={190} />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl text-center">
          <Link href="/" className="mb-10 inline-block transition-opacity duration-200 hover:opacity-80">
            <span className="relative block h-6 w-24 mx-auto">
              <Image src="/images/vepando-logo-main.png" alt="VEPANDO" fill className="brand-logo object-contain" priority />
            </span>
          </Link>

          <span className="mb-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            <Bot className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Dossier 404 · Status: vermist
          </span>

          <h1 className="mb-4 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
            Onze AI-agent is deze pagina <span className="text-primary">kwijtgeraakt.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
            Hij deed erg zijn best. Het resultaat is helaas deze lege pagina. Hier is wat we wél weten.
          </p>

          <div className="relative mb-10 rounded-xl border border-border bg-card/80 p-6 text-left sm:p-7">
            <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-primary/30" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-primary/30" aria-hidden="true" />

            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Dossier 404
            </span>

            <dl className="space-y-2 font-mono text-xs sm:text-[13px]">
              <div className="flex gap-2">
                <dt className="shrink-0 text-muted-foreground">Input</dt>
                <dd className="text-card-foreground">Een link die hier niet (meer) bestaat</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 text-muted-foreground">Agent output</dt>
                <dd className="text-card-foreground">Deze lege pagina, en dit bericht</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 text-muted-foreground">Menselijke controle</dt>
                <dd className="text-[hsl(var(--gold))]">Nu even wij — onze excuses</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/" className="flex items-center justify-center gap-2">
                Terug naar de homepage
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/#booking">Praat toch met een mens</Link>
            </Button>
          </div>

          <nav className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm" aria-label="Snelle links">
            <Link href="/#diensten" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
              Diensten
            </Link>
            <Link href="/#reviews" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
              Reviews
            </Link>
            <Link href="/legal" className="text-muted-foreground transition-colors duration-200 hover:text-primary">
              Juridisch
            </Link>
          </nav>

          <p className="mt-8 text-xs italic text-muted-foreground">
            Geen AI-modellen zijn hierbij gewond geraakt — wel een beetje in verlegenheid gebracht.
          </p>

          <a
            href="mailto:info@vepando.com"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            info@vepando.com
          </a>
        </div>
      </div>
    </div>
  )
}
