import { NextResponse } from "next/server"
import { AGENT_LINK_HEADER, OPENAPI_SPEC } from "@/lib/agent-discovery"

export function GET() {
  return new NextResponse(JSON.stringify(OPENAPI_SPEC, null, 2), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/vnd.oai.openapi+json; charset=utf-8",
      Link: AGENT_LINK_HEADER,
    },
  })
}
