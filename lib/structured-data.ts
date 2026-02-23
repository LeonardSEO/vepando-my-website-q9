export const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Agent Development voor MKB",
  provider: {
    "@type": "Organization",
    name: "VEPANDO",
  },
  description: "Wij bouwen binnen 30 dagen een AI Agent die repetitieve taken automatiseert voor MKB bedrijven",
  serviceType: "AI Automation",
  areaServed: "Nederland",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Agent Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marketing Agent",
          description: "AI agent voor marketingcampagne automatisering en Google Ads optimalisatie",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Klantenservice Agent",
          description: "24/7 AI chatbot voor klantenservice en CRM automatisering",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Administratie Agent",
          description: "AI voor factuurverwerking en boekhouding automatisering",
        },
      },
    ],
  },
} as const
