import { timingSafeEqual } from "node:crypto"
import { type NextRequest, NextResponse } from "next/server"

// Import the dependency checker - CommonJS module shared with local scripts
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { checkDependencies } = require("../../../scripts/check-deps.js")

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET

  // Allow local development without a secret, but require auth in production.
  if (!secret) {
    return process.env.NODE_ENV !== "production"
  }

  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return false
  }

  const provided = authHeader.slice("Bearer ".length)
  const expectedBuf = Buffer.from(secret)
  const providedBuf = Buffer.from(provided)

  if (expectedBuf.length !== providedBuf.length) {
    return false
  }

  return timingSafeEqual(expectedBuf, providedBuf)
}

function unauthorized() {
  return NextResponse.json({ status: "error", error: "Unauthorized" }, { status: 401 })
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return unauthorized()
  }

  try {
    const result = checkDependencies()

    return NextResponse.json(
      {
        status: "success",
        timestamp: new Date().toISOString(),
        ...result,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
