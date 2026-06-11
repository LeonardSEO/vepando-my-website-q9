"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const getPreferred = () => {
    if (typeof window === "undefined") return "light"

    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
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

  useEffect(() => {
    if (!mounted) return

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light")
      }
    }

    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [mounted])

  return { theme, setTheme, mounted }
}
