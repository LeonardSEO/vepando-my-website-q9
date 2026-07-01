import { track } from "@vercel/analytics"

// Custom analytics events for VEPANDO
export const analytics = {
  // Hero section interactions
  heroCtaClick: () => {
    track("hero_cta_click", {
      section: "hero",
      action: "cta_click",
      label: "Ontdek AI Agent",
    })
  },

  // Navigation events
  navLogoClick: () => {
    track("nav_logo_click", {
      section: "navigation",
      action: "logo_click",
    })
  },

  navCtaClick: () => {
    track("nav_cta_click", {
      section: "navigation",
      action: "cta_click",
      label: "Adviesgesprek",
    })
  },

  // Service section interactions
  serviceCardView: (serviceName: string) => {
    track("service_card_view", {
      section: "services",
      action: "card_view",
      service: serviceName,
    })
  },

  // Reviews section
  reviewSliderInteraction: () => {
    track("review_slider_interaction", {
      section: "reviews",
      action: "slider_pause",
    })
  },

  reviewScoreClick: () => {
    track("review_score_click", {
      section: "reviews",
      action: "score_click",
      destination: "testimonials",
    })
  },

  // Social proof
  socialProofLogoHover: (companyName: string) => {
    track("social_proof_logo_hover", {
      section: "social_proof",
      action: "logo_hover",
      company: companyName,
    })
  },

  // Booking section
  bookingCalendarLoad: () => {
    track("booking_calendar_load", {
      section: "booking",
      action: "calendar_load",
    })
  },

  bookingFallbackClick: (method: "phone" | "email" | "cal_link") => {
    track("booking_fallback_click", {
      section: "booking",
      action: "fallback_click",
      method,
    })
  },

  // Footer interactions
  footerLinkClick: (linkType: string) => {
    track("footer_link_click", {
      section: "footer",
      action: "link_click",
      link_type: linkType,
    })
  },

  // Page performance
  pageLoadComplete: (loadTime: number) => {
    track("page_load_complete", {
      section: "performance",
      action: "load_complete",
      load_time: loadTime,
    })
  },

  // Error tracking
  imageLoadError: (imageSrc: string) => {
    track("image_load_error", {
      section: "performance",
      action: "image_error",
      image_src: imageSrc,
    })
  },

  calEmbedError: (error: string) => {
    track("cal_embed_error", {
      section: "booking",
      action: "embed_error",
      error_message: error,
    })
  },
}
