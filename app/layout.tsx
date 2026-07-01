import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Fraunces } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vepando.com"),
  title: "VEPANDO - AI Agents voor MKB | Binnen 30 dagen live",
  description:
    "Wij bouwen binnen 30 dagen een AI Agent die jouw repetitieve werk overneemt. Marketing, klantenservice en administratie automatisering voor het Nederlandse MKB. Gratis strategiesessie.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://vepando.com",
    siteName: "VEPANDO",
    title: "VEPANDO - AI Agents voor MKB | Binnen 30 dagen live",
    description:
      "Huur een AI-collega die 24/7 voor je werkt. Binnen 30 dagen live, voor een vaste prijs die je vooraf kent.",
    images: [
      {
        url: "/images/vepando-logo-main.png",
        width: 1200,
        height: 630,
        alt: "VEPANDO - AI Agents voor MKB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VEPANDO - AI Agents voor MKB",
    description:
      "Huur een AI-collega die 24/7 voor je werkt. Binnen 30 dagen live, voor een vaste prijs die je vooraf kent.",
    images: ["/images/vepando-logo-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <head>
        {/* Theme detection runs before paint to prevent a flash of wrong theme */}
        <Script src="/js/theme-bootstrap.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${GeistSans.className} bg-[radial-gradient(1200px_800px_at_50%_-200px,rgba(26,58,99,0.10),transparent)]`}
      >
        {/* Liquid Glass lens — referenced by .liquid-glass-navbar's backdrop-filter.
            The SDF displacement map (public/images/liquid-lens-map.png) is neutral
            grey in the center and ramps toward the rounded rim, so the backdrop is
            only bent at the curved edges. Negative scale = magnifying lens, the way
            Apple's Liquid Glass refracts content inward at the borders. Three passes
            (R/G/B) at slightly different scales add chromatic aberration.
            Kept in the server-rendered layout (not the client navbar) so the static
            SVG never triggers a hydration mismatch. */}
        <svg
          aria-hidden="true"
          focusable="false"
          style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
        >
          <filter id="liquid-lens" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage
              href="/images/liquid-lens-map.png"
              preserveAspectRatio="none"
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="map"
            />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-44" xChannelSelector="R" yChannelSelector="G" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="dR" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-42" xChannelSelector="R" yChannelSelector="G" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="dG" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-40" xChannelSelector="R" yChannelSelector="G" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="dB" />
            <feBlend in="dR" in2="dG" mode="screen" result="dRG" />
            <feBlend in="dRG" in2="dB" mode="screen" />
          </filter>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
