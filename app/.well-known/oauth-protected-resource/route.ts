import { NextResponse } from "next/server"
import { OAUTH_PROTECTED_RESOURCE_METADATA } from "@/lib/agent-discovery"

export function GET() {
  return NextResponse.json(OAUTH_PROTECTED_RESOURCE_METADATA, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  })
}
