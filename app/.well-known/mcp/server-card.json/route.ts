import { NextResponse } from "next/server"
import { MCP_SERVER_CARD } from "@/lib/agent-discovery"

export function GET() {
  return NextResponse.json(MCP_SERVER_CARD, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  })
}
