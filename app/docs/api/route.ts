import { NextResponse } from "next/server"
import { AGENT_LINK_HEADER, API_DOC_MARKDOWN } from "@/lib/agent-discovery"

export function GET() {
  return new NextResponse(API_DOC_MARKDOWN, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/markdown; charset=utf-8",
      Link: AGENT_LINK_HEADER,
    },
  })
}
