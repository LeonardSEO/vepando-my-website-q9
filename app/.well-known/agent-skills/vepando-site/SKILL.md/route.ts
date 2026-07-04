import { NextResponse } from "next/server"
import { AGENT_SKILL_MARKDOWN } from "@/lib/agent-discovery"

export function GET() {
  return new NextResponse(AGENT_SKILL_MARKDOWN, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}
