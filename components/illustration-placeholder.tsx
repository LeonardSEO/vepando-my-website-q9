import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IllustrationPlaceholderProps {
  label: string
  description: string
  className?: string
}

/**
 * Marks a slot reserved for the vintage blueprint / patent-drawing
 * illustrations (workflow-as-machine, not robots or neural-network art).
 * Deliberately looks unfinished — dashed border, no real artwork — so it
 * can't be mistaken for a shipped design and is easy to find and swap out.
 */
export default function IllustrationPlaceholder({ label, description, className }: IllustrationPlaceholderProps) {
  return (
    <div
      className={cn(
        "blueprint-tile relative flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary/30 bg-card/40 p-8 text-center",
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 text-primary/50" aria-hidden="true" />
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary/60">Illustratie · nog te maken</p>
      <p className="font-serif text-lg text-card-foreground">{label}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
