"use client"

import { useEffect } from "react"

type JsonObject = Record<string, unknown>

type WebMcpTool = {
  name: string
  description: string
  inputSchema: JsonObject
  execute: (input: unknown) => JsonObject | Promise<JsonObject>
}

type ModelContext = {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => void | Promise<void>
  unregisterTool?: (name: string) => void | Promise<void>
}

declare global {
  interface Navigator {
    modelContext?: ModelContext
  }

  interface Document {
    modelContext?: ModelContext
  }
}

const services = [
  {
    name: "Marketing Agent",
    description: "Automatiseert campagnes, advertenties, doelgroepen en Google Ads-optimalisatie.",
    url: "https://vepando.com/#diensten",
  },
  {
    name: "Klantenservice Agent",
    description: "Beantwoordt klantvragen, routeert tickets en werkt CRM-informatie bij.",
    url: "https://vepando.com/#diensten",
  },
  {
    name: "Administratie & Facturatie Agent",
    description: "Leest PDF-facturen, controleert bedragen en boekt in boekhoudsoftware.",
    url: "https://vepando.com/#diensten",
  },
] as const

const sectionUrls = {
  services: "https://vepando.com/#diensten",
  process: "https://vepando.com/#werkwijze",
  booking: "https://vepando.com/#booking",
  reviews: "https://vepando.com/#reviews",
} as const

function getObjectInput(input: unknown): JsonObject {
  return input && typeof input === "object" && !Array.isArray(input) ? (input as JsonObject) : {}
}

function registerTool(modelContext: ModelContext, tool: WebMcpTool, signal: AbortSignal) {
  try {
    void Promise.resolve(modelContext.registerTool?.(tool, { signal })).catch(() => undefined)
  } catch {
    // WebMCP is still experimental; failed registration must not break normal browsing.
  }
}

export default function WebMcpProvider() {
  useEffect(() => {
    const modelContext = window.navigator.modelContext ?? window.document.modelContext

    if (!modelContext?.registerTool) {
      return
    }

    const controller = new AbortController()
    const tools: WebMcpTool[] = [
      {
        name: "get_vepando_services",
        description: "Return VEPANDO's AI Agent services and the booking URL for a free strategy session.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          properties: {},
        },
        execute: () => ({
          services,
          bookingUrl: sectionUrls.booking,
          contactEmail: "info@vepando.com",
        }),
      },
      {
        name: "navigate_vepando_site",
        description: "Navigate the current browser page to a relevant VEPANDO section.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          properties: {
            section: {
              type: "string",
              enum: Object.keys(sectionUrls),
              description: "The VEPANDO page section to open.",
            },
          },
          required: ["section"],
        },
        execute: (input) => {
          const section = getObjectInput(input).section

          if (typeof section !== "string" || !(section in sectionUrls)) {
            return {
              ok: false,
              error: "Unsupported section. Use one of: services, process, booking, reviews.",
            }
          }

          const url = sectionUrls[section as keyof typeof sectionUrls]
          window.location.href = url

          return {
            ok: true,
            url,
          }
        },
      },
    ]

    tools.forEach((tool) => registerTool(modelContext, tool, controller.signal))

    return () => {
      controller.abort()
      tools.forEach((tool) => {
        try {
          void Promise.resolve(modelContext.unregisterTool?.(tool.name)).catch(() => undefined)
        } catch {
          // WebMCP cleanup is best-effort in browsers with partial trial support.
        }
      })
    }
  }, [])

  return null
}
