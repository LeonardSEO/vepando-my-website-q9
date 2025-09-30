"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { useTheme } from "@/hooks/use-theme"

type ThemeContextType = {
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeData = useTheme()

  return <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}
