import Image from "next/image"

interface DossierCardProps {
  number: string
  title: string
  description: string
  illustration: string
  illustrationAlt: string
  input: string
  output: string
  humanCheck: string
  keywords: string
}

/**
 * Editorial replacement for the old icon-Card: each use case reads as a
 * case file rather than a feature tile — dossier number, a vintage
 * blueprint/patent vignette, input/output trace, and an explicit
 * human-check line (matches the "geen vage rapporten, wel controleerbaar"
 * positioning from the brand brief).
 */
export default function DossierCard({
  number,
  title,
  description,
  illustration,
  illustrationAlt,
  input,
  output,
  humanCheck,
  keywords,
}: DossierCardProps) {
  return (
    <article className="group relative h-full rounded-xl border border-border bg-card/80 p-6 sm:p-7 transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/40 hover:shadow-[var(--glass-shadow-hover)] motion-safe:hover:-translate-y-1">
      <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-primary/30 transition-colors duration-300 group-hover:border-primary/60" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-primary/30 transition-colors duration-300 group-hover:border-primary/60" aria-hidden="true" />

      <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        Dossier {number}
      </span>

      <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-lg border border-border">
        <Image
          src={illustration}
          alt={illustrationAlt}
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]"
          loading="lazy"
          quality={90}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
        />
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
