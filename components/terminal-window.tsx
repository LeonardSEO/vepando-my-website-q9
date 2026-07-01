import { cn } from "@/lib/utils"

type TerminalLineType = "output" | "success" | "accent" | "muted"

type TerminalLine = {
  type?: TerminalLineType
  text: string
}

// Fixed hex values, not theme tokens: this chrome is always dark regardless
// of the site's light/dark mode, so it needs colours tuned for that one
// background rather than values that flip with --gold/--iris per theme.
const LINE_STYLES: Record<TerminalLineType, string> = {
  output: "text-white/70",
  success: "text-emerald-400/90",
  accent: "text-[#D9A75C]",
  muted: "text-white/35",
}

interface TerminalWindowProps {
  title?: string
  lines: TerminalLine[]
  statusLine?: string
  className?: string
}

/**
 * A small "agent console" panel — inspired by dev-tool status displays,
 * but deliberately not a literal terminal: no shell prompt, no traffic
 * lights. It reads as agent activity (what happened, what needs a human),
 * not as a programming tool, so it stays a supporting proof element next
 * to the hero headline rather than the visual centrepiece.
 */
export default function TerminalWindow({ title = "Agent console", lines, statusLine, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12] shadow-[0_16px_40px_-18px_rgba(10,15,25,0.55)]",
        className,
      )}
      role="group"
      aria-label={`${title} — status`}
    >
      <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[11px] tracking-wide text-white/50">{title}</span>
      </div>

      <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-relaxed">
        {lines.map((line, index) => (
          <p
            key={index}
            className={cn("console-line", LINE_STYLES[line.type ?? "output"])}
            style={{ animationDelay: `${index * 180}ms` }}
          >
            {line.text}
          </p>
        ))}
        <span
          className="console-caret inline-block h-[13px] w-[7px] translate-y-[2px] bg-white/70"
          style={{ animationDelay: `${lines.length * 180}ms` }}
          aria-hidden="true"
        />
      </div>

      {statusLine ? (
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9C97D6] motion-safe:animate-pulse" aria-hidden="true" />
          {statusLine}
        </div>
      ) : null}
    </div>
  )
}
