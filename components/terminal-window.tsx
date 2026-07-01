import { cn } from "@/lib/utils"

type TerminalLineType = "prompt" | "output" | "success" | "accent" | "muted"

type TerminalLine = {
  type?: TerminalLineType
  text: string
}

// Fixed hex values, not theme tokens: this chrome is always dark regardless
// of the site's light/dark mode, so it needs colours tuned for that one
// background rather than values that flip with --gold/--iris per theme.
const LINE_STYLES: Record<TerminalLineType, string> = {
  prompt: "text-white/90",
  output: "text-white/65",
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
 * A restrained, macOS-style terminal mockup — traffic-light chrome,
 * monospace log lines, quiet status footer. Used sparingly (hero only)
 * so the "10% AI/terminal" accent doesn't take over the editorial layout.
 */
export default function TerminalWindow({ title = "vepando — agent — zsh", lines, statusLine, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12] shadow-[0_20px_60px_-15px_rgba(10,15,25,0.55)]",
        className,
      )}
      role="img"
      aria-label={`Terminalvenster: ${title}`}
    >
      <div className="relative flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[11px] text-white/40">
          {title}
        </span>
      </div>

      <div className="space-y-1.5 px-5 py-5 font-mono text-[13px] leading-relaxed">
        {lines.map((line, index) => (
          <p key={index} className={LINE_STYLES[line.type ?? "output"]}>
            {line.text}
          </p>
        ))}
        <span className="inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-white/70" aria-hidden="true" />
      </div>

      {statusLine ? (
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9C97D6]" aria-hidden="true" />
          {statusLine}
        </div>
      ) : null}
    </div>
  )
}
