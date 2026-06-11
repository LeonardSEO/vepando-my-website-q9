"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect, useState } from "react"

function detectTheme(): "light" | "dark" {
  const manualTheme = document.documentElement.getAttribute("data-theme")
  if (manualTheme === "dark" || manualTheme === "light") {
    return manualTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function CalEmbed() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const updateTheme = () => setTheme(detectTheme())
    updateTheme()

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", updateTheme)

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      mediaQuery.removeEventListener("change", updateTheme)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "adviesgesprek" })
      cal("ui", {
        theme,
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#4f46e5",
            "cal-brand-emphasis": "#4338ca",
            "cal-brand-subtle": "#e0e7ff",
            "cal-brand-text": "#ffffff",
          },
          dark: {
            "cal-brand": "#4f46e5",
            "cal-brand-emphasis": "#6366f1",
            "cal-brand-subtle": "#1e1b4b",
            "cal-brand-text": "#ffffff",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [theme])

  return (
    <Cal
      namespace="adviesgesprek"
      calLink="vepando/adviesgesprek"
      style={{ width: "100%", height: "100%", overflow: "scroll", border: "none" }}
      config={{ layout: "month_view", theme }}
    />
  )
}
