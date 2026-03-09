import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { headers } from "next/headers"
import Script from "next/script"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

/* eslint-disable @next/next/no-css-tags */

export const metadata: Metadata = {
  title: "VEPANDO - AI Agents voor MKB | 30 Dagen naar Automatisering",
  description:
    "Wij bouwen binnen 30 dagen een AI Agent die jouw repetitieve werk overneemt. Marketing, klantenservice & administratie automatisering voor MKB. Gratis adviesgesprek.",
    generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Force dynamic rendering so Next can propagate CSP nonces from middleware
  // to its internal inline/runtime scripts.
  await headers()

  return (
    <html lang="nl" suppressHydrationWarning className={GeistSans.variable}>
      <head>
        {/* 🎯 DEFINITIEVE CONFIGUREERBARE LIQUID GLASS - Juiste volgorde! */}
        {/* EERST: De configuratie (variabelen) */}
        <link rel="stylesheet" href="/css/glass-config.css" />
        {/* DAARNA: De structuur (die de variabelen gebruikt) */}
        <link rel="stylesheet" href="/css/glass.css" />

        {/* Theme detection bootstrap is external to avoid inline-script CSP exceptions */}
        <Script src="/js/theme-bootstrap.js" strategy="beforeInteractive" />

      </head>
      <body
        className={`${GeistSans.className} bg-[radial-gradient(1200px_800px_at_50%_-200px,rgba(79,70,229,0.12),transparent)]`}
      >
        {/* 🎯 CONFIGUREERBARE SVG FILTERS - Nu met meerdere varianten */}
        <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            {/* Hoofdfilter - configureerbaar via CSS variabelen */}
            <filter id="liquid-distortion" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Subtielere variant */}
            <filter id="liquid-distortion-subtle" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.010 0.020" numOctaves="2" seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Extreme variant */}
            <filter id="liquid-distortion-extreme" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.025 0.035" numOctaves="4" seed="12" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Crystal variant - voor ultra-clear effect */}
            <filter id="liquid-distortion-crystal" filterUnits="userSpaceOnUse">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.015" numOctaves="1" seed="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
