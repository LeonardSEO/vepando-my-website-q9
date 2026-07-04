import { NextResponse } from "next/server"
import { AGENT_LINK_HEADER, API_CATALOG } from "@/lib/agent-discovery"

export function GET() {
  return new NextResponse(JSON.stringify(API_CATALOG, null, 2), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/linkset+json; charset=utf-8",
      Link: AGENT_LINK_HEADER,
    },
  })
}
