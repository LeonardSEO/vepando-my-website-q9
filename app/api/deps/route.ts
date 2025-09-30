import { type NextRequest, NextResponse } from "next/server"

// Import the dependency checker - now using require since it's a CommonJS module
const { checkDependencies } = require("../../../scripts/check-deps.js")

export async function GET(request: NextRequest) {
  try {
    const result = checkDependencies()

    return NextResponse.json({
      status: "success",
      timestamp: new Date().toISOString(),
      ...result,
    })
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // You can add specific dependency checks here based on the request body
    const result = checkDependencies()

    return NextResponse.json({
      status: "success",
      action: "dependency_check",
      timestamp: new Date().toISOString(),
      ...result,
    })
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
