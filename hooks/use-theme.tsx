"use client"

import { useState, useEffect } from "react"

// Vepando is light-first: the brand does not follow the visitor's OS colour
// scheme. This hook only reflects an explicit, user-chosen preference (for
// a future manual toggle) and otherwise defaults to light.
export function useTheme() {
  const getPreferred = () => {
    if (typeof window === "undefined") return "light"

    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored

    return "light"
  }

  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTheme(getPreferred())
      setMounted(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  return { theme, setTheme, mounted }
}
