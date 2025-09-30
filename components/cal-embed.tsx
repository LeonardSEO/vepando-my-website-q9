"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

export default function CalEmbed() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "adviesgesprek" })
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#4F46E5" },
          dark: { "cal-brand": "#4F46E5" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  return (
    <Cal
      namespace="adviesgesprek"
      calLink="vepando/adviesgesprek"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  )
}
