import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  label: string
  icon?: LucideIcon
  className?: string
}

/**
 * Small monospace "operations" label — used in short rows under the
 * hero and inside dossier cards to signal concrete, checkable facts
 * (timelines, human review, compliance) rather than marketing claims.
 */
export default function StatusBadge({ label, icon: Icon, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
        className,
      )}
    >
      {Icon ? <Icon className="h-3 w-3 text-primary" aria-hidden="true" /> : null}
      {label}
    </span>
  )
}
