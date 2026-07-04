import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AGENT_LINK_HEADER, HOME_MARKDOWN, MARKDOWN_TOKEN_COUNT } from "./lib/agent-discovery"

function acceptsMarkdown(request: NextRequest) {
  const accept = request.headers.get("accept")?.toLowerCase() ?? ""

  return request.nextUrl.pathname === "/" && accept.split(",").some((value) => value.trim().startsWith("text/markdown"))
}

function addVary(response: NextResponse, headerName: string) {
  const vary = response.headers.get("Vary")

  if (!vary) {
    response.headers.set("Vary", headerName)
    return
  }

  const values = vary.split(",").map((value) => value.trim().toLowerCase())

  if (!values.includes(headerName.toLowerCase())) {
    response.headers.set("Vary", `${vary}, ${headerName}`)
  }
}

export function proxy(request: NextRequest) {
  const isHomepage = request.nextUrl.pathname === "/"
  const response = acceptsMarkdown(request)
    ? new NextResponse(HOME_MARKDOWN, {
        headers: {
          "Cache-Control": "public, max-age=300",
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": MARKDOWN_TOKEN_COUNT.toString(),
        },
      })
    : NextResponse.next()
  const isDev = process.env.NODE_ENV !== "production"
  const isHttps = request.headers.get("x-forwarded-proto") === "https" || request.nextUrl.protocol === "https:"

  if (isHomepage) {
    response.headers.set("Link", AGENT_LINK_HEADER)
    addVary(response, "Accept")
  }

  response.headers.set("X-Frame-Options", "SAMEORIGIN") // SAMEORIGIN (not DENY) for the Cal.com embed
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none") // Cal.com compatibility

  if (isHttps) {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  }

  // 'unsafe-inline' is required for Next.js inline runtime scripts on statically
  // rendered pages (a per-request nonce would force dynamic SSR on every route).
  const scriptSrc = [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://cal.com https://app.cal.com https://embed.cal.com https://static.cloudflareinsights.com https://cloudflareinsights.com",
  ]
    .filter(Boolean)
    .join(" ")

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://cal.com https://app.cal.com https://embed.cal.com",
    "img-src 'self' data: blob: https://cal.com https://app.cal.com https://embed.cal.com https://avatars.githubusercontent.com",
    "font-src 'self' https://cal.com https://app.cal.com https://embed.cal.com",
    "connect-src 'self' https://api.cal.com https://app.cal.com https://cal.com https://embed.cal.com https://vitals.vercel-insights.com https://static.cloudflareinsights.com https://cloudflareinsights.com wss://cal.com wss://app.cal.com",
    "frame-src 'self' https://cal.com https://app.cal.com https://embed.cal.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://cal.com https://app.cal.com",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ")

  response.headers.set("Content-Security-Policy", csp)

  const permissionsPolicy = [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "payment=()",
    "usb=()",
    "magnetometer=()",
    "gyroscope=()",
    "accelerometer=()",
    "autoplay=()",
    "encrypted-media=()",
    "fullscreen=(self)",
    "picture-in-picture=()",
  ].join(", ")

  response.headers.set("Permissions-Policy", permissionsPolicy)

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
