import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Create response
  const response = NextResponse.next()

  // Enhanced Security Headers
  response.headers.set("X-Frame-Options", "SAMEORIGIN") // Changed from DENY to allow Cal.com embed
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // Cross-Origin-Opener-Policy - Relaxed for Cal.com
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none") // Changed for Cal.com compatibility

  // Strict Transport Security
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")

  // Enhanced Content Security Policy - Cal.com + Cloudflare friendly
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://embed.typeform.com https://js.stripe.com https://cal.com https://app.cal.com https://embed.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://cloudflareinsights.com",
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
