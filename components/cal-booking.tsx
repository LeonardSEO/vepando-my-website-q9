"use client"

import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { analytics } from "@/lib/analytics"

const CalEmbed = lazy(() => import("./cal-embed"))

function LoadingState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Agenda wordt geladen...</p>
      </div>
    </div>
  )
}

/**
 * Defers loading the (heavy) Cal.com embed bundle until the booking
 * section scrolls into view, so it never competes with above-the-fold work.
 */
export default function CalBooking() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setShouldLoad(true), 0)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          analytics.bookingCalendarLoad()
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg overflow-hidden relative">
      {shouldLoad ? (
        <Suspense fallback={<LoadingState />}>
          <CalEmbed />
        </Suspense>
      ) : (
        <LoadingState />
      )}
    </div>
  )
}
