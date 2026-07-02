import Image from "next/image"
import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  className?: string
  windowTitle?: string
  agentTitle?: string
  agentSubtitle?: string
  path?: string
  banner: { title: string; body: string }
  hint?: string
  prompt: string
  statusLine?: string
}

/**
 * The "agent console" — deliberately modelled on the Claude Code CLI
 * chrome (traffic lights, titlebar, mascot-corner icon, highlighted
 * banner, prompt bar, status footer) so it reads as a real, live tool
 * to anyone who recognises that pattern, with Vepando's own mark and
 * copy standing in for Claude's. Fixed dark colours regardless of the
 * site's light/dark mode — this chrome doesn't flip.
 */
export default function TerminalWindow({
  className,
  windowTitle = "leonard — vepando agent — live",
  agentTitle = "Vepando Agent",
  agentSubtitle,
  path,
  banner,
  hint,
  prompt,
  statusLine,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12] shadow-[0_24px_60px_-20px_rgba(10,15,25,0.6)]",
        className,
      )}
      role="group"
      aria-label={`${agentTitle} — status`}
    >
      <div className="relative flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-x-0 text-center font-mono text-[11px] text-white/40">
          {windowTitle}
        </span>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6 font-mono text-[13px] leading-relaxed">
        <div className="console-line mb-5 flex items-start gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src="/android-chrome-192x192.png" alt="" fill className="object-cover" />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-[15px] font-semibold text-white">{agentTitle}</p>
            {agentSubtitle ? <p className="text-[12px] text-white/50">{agentSubtitle}</p> : null}
            {path ? <p className="mt-0.5 text-[12px] text-white/30">{path}</p> : null}
          </div>
        </div>

        <div className="console-line mb-2 border-l-2 border-[#D9A75C] py-0.5 pl-3" style={{ animationDelay: "180ms" }}>
          <p className="text-[13px] font-semibold text-white">{banner.title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">{banner.body}</p>
        </div>

        {hint ? (
          <p className="console-line mb-6 text-[11px] text-white/30" style={{ animationDelay: "360ms" }}>
            {hint}
          </p>
        ) : null}

        <div
          className="console-line flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5"
          style={{ animationDelay: "540ms" }}
        >
          <span className="text-white/40" aria-hidden="true">
            &gt;
          </span>
          <span className="flex-1 text-white/70">{prompt}</span>
          <span className="console-caret inline-block h-[14px] w-[7px] bg-white/70" aria-hidden="true" />
        </div>
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
