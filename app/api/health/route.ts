import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "vepando-public-site",
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}
