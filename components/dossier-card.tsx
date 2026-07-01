import Image from "next/image"

interface DossierCardProps {
  number: string
  title: string
  description: string
  icon: string
  input: string
  output: string
  humanCheck: string
  keywords: string
}

/**
 * Editorial replacement for the old icon-Card: each use case reads as a
 * case file rather than a feature tile — dossier number, input/output
 * trace, and an explicit human-check line (matches the "geen vage
 * rapporten, wel controleerbaar" positioning from the brand brief).
 */
export default function DossierCard({ number, title, description, icon, input, output, humanCheck, keywords }: DossierCardProps) {
  return (
    <article className="group relative h-full rounded-xl border border-border bg-card/80 p-6 sm:p-7 transition-colors duration-300 hover:border-primary/40">
      <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-primary/30" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-primary/30" aria-hidden="true" />

      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          Dossier {number}
        </span>
        <div className="relative h-8 w-8 opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
          <Image src={icon} alt="" fill className="object-contain" loading="lazy" quality={85} sizes="32px" />
        </div>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl text-card-foreground mb-3 leading-snug">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{description}</p>

      <dl className="space-y-2 border-t border-border pt-4 font-mono text-xs sm:text-[13px]">
        <div className="flex gap-2">
          <dt className="shrink-0 text-muted-foreground">Input</dt>
          <dd className="text-card-foreground">{input}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 text-muted-foreground">Agent output</dt>
          <dd className="text-card-foreground">{output}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 text-muted-foreground">Menselijke controle</dt>
          <dd className="text-[hsl(var(--gold))]">{humanCheck}</dd>
        </div>
      </dl>

      <div className="sr-only">{keywords}</div>
    </article>
  )
}
