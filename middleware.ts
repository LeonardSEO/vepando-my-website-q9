import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
function generateNonce() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)

  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)

  // Create response and pass the nonce to Next so framework scripts can be nonced.
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  const isDev = process.env.NODE_ENV !== "production"
  const isHttps =
    request.headers.get("x-forwarded-proto") === "https" || request.nextUrl.protocol === "https:"

  // Enhanced Security Headers
  response.headers.set("X-Frame-Options", "SAMEORIGIN") // Changed from DENY to allow Cal.com embed
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Cross-Origin-Opener-Policy - Relaxed for Cal.com
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none") // Changed for Cal.com compatibility

  // HSTS only makes sense over HTTPS. Avoid sending preload by default.
  if (isHttps) {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  }

  // Enhanced Content Security Policy - Cal.com + Cloudflare friendly
  const scriptSrc = [
    `script-src 'self' 'nonce-${nonce}'`,
    isDev ? "'unsafe-eval'" : "",
    "https://embed.typeform.com https://js.stripe.com https://cal.com https://app.cal.com https://embed.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://cloudflareinsights.com",
  ]
    .filter(Boolean)
    .join(" ")

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cal.com https://app.cal.com https://embed.cal.com",
    "img-src 'self' data: blob: https://cal.com https://app.cal.com https://embed.cal.com https://avatars.githubusercontent.com",
    "font-src 'self' https://fonts.gstatic.com https://cal.com https://app.cal.com https://embed.cal.com",
    "connect-src 'self' https://api.cal.com https://app.cal.com https://cal.com https://embed.cal.com https://www.google-analytics.com https://vitals.vercel-insights.com https://static.cloudflareinsights.com https://cloudflareinsights.com wss://cal.com wss://app.cal.com",
    "frame-src 'self' https://cal.com https://app.cal.com https://embed.cal.com https://embed.typeform.com https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://cal.com https://app.cal.com",
    "frame-ancestors 'self' https://cal.com https://app.cal.com",
    "upgrade-insecure-requests",
  ].join("; ")

  response.headers.set("Content-Security-Policy", csp)

  // Simplified Permissions Policy - Only widely supported features
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
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
