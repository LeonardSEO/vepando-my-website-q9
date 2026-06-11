import { timingSafeEqual } from "node:crypto"
import { type NextRequest, NextResponse } from "next/server"
import packageJson from "@/package.json"

const criticalDeps = ["next", "react", "react-dom", "@vercel/analytics"] as const
type CriticalDependency = (typeof criticalDeps)[number]

function checkDependencies() {
  const dependencies = packageJson.dependencies
  const devDependencies = packageJson.devDependencies
  const dependencyVersions = new Map<string, string>([...Object.entries(dependencies), ...Object.entries(devDependencies)])
  const installedCriticalDeps = Object.fromEntries(
    criticalDeps.map((dependency) => [dependency, dependencyVersions.get(dependency) ?? null]),
  ) as Record<CriticalDependency, string | null>
  const missingDeps = criticalDeps.filter((dependency) => !installedCriticalDeps[dependency])

  return {
    success: missingDeps.length === 0,
    dependencies: Object.keys(dependencies),
    devDependencies: Object.keys(devDependencies),
    installedCriticalDeps,
    missingDeps,
  }
}

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
