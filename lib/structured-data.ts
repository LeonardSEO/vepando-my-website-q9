const ORGANIZATION = {
  "@type": "Organization",
  "@id": "https://vepando.com/#organization",
  name: "VEPANDO",
  url: "https://vepando.com",
  logo: "https://vepando.com/images/vepando-logo-main.png",
  email: "info@vepando.com",
  sameAs: [
    "https://www.linkedin.com/company/vepando-ai/",
    "https://www.linkedin.com/in/leonard-van-hemert/",
  ],
  founder: {
    "@type": "Person",
    name: "Leonard van Hemert",
    jobTitle: "Founder & AI Architect",
    sameAs: "https://www.linkedin.com/in/leonard-van-hemert/",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@vepando.com",
    contactType: "sales",
    availableLanguage: ["Dutch", "English"],
  },
  areaServed: {
    "@type": "Country",
    name: "Netherlands",
  },
} as const

export const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZATION,
    {
      "@type": "ProfessionalService",
      "@id": "https://vepando.com/#service",
      name: "AI Agent Development voor MKB",
      provider: { "@id": "https://vepando.com/#organization" },
      description:
        "VEPANDO bouwt binnen 30 dagen een AI Agent die repetitieve taken automatiseert voor MKB-bedrijven, voor een vaste prijs die de klant vooraf kent.",
      serviceType: "AI automation consulting",
      areaServed: "Nederland",
      url: "https://vepando.com",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Agent Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Marketing Agent",
              description:
                "AI agent voor marketingcampagne-automatisering en Google Ads-optimalisatie",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Klantenservice Agent",
              description: "24/7 AI chatbot voor klantenservice en CRM-automatisering",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Administratie Agent",
              description: "AI voor factuurverwerking en boekhoudautomatisering",
            },
          },
        ],
      },
    },
  ],
} as const

export const FAQ_ITEMS = [
  {
    question: "Wat kost een AI Agent?",
    answer:
      "Je betaalt een vaste, eenmalige prijs. Die prijs hoor je tijdens de gratis strategiesessie, voordat je iets beslist. Geen abonnement op dure software en geen uurtje-factuurtje.",
  },
  {
    question: "Hoe snel is mijn AI Agent live?",
    answer:
      "Binnen 30 dagen na akkoord. In die periode bouwen en trainen we de agent op jouw processen, en koppelen we hem aan je bestaande systemen.",
  },
  {
    question: "Heb ik technische kennis nodig?",
    answer:
      "Nee. Wij bouwen, trainen en koppelen de agent. Jij vertelt ons hoe je werkt; wij zorgen dat de agent dat werk overneemt. Na oplevering blijven wij je aanspreekpunt.",
  },
  {
    question: "Wat voor AI Agents kunnen jullie bouwen?",
    answer:
      "Praktisch alles wat herhaalbaar en regelgebonden is: van marketing en klantenservice tot administratie, planning en rapportages. De drie agents hierboven zijn voorbeelden. In de strategiesessie bepalen we samen welk proces bij jou de meeste tijd kost, en daar bouwen we een agent voor op maat.",
  },
  {
    question: "Met welke tools werkt een AI Agent?",
    answer:
      "Met de tools die je al gebruikt: denk aan Google Sheets, Asana, e-mail, je CRM of boekhoudsoftware. Voor de AI zelf gebruiken we bekende modellen zoals ChatGPT en Claude, vaak gekoppeld via n8n. Jij hoeft niets te installeren; wij zorgen dat het achter de schermen samenwerkt.",
  },
] as const

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const
