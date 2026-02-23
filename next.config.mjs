/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@calcom/embed-react'],
  },

  // Compiler options for production optimization
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Modern JavaScript target to reduce polyfills
  output: 'standalone',

  // SEO-Optimized Permanent Redirects
  async redirects() {
    return [
      // Knowledge base main pages - redirect to home
      {
        source: '/kennisbank',
        destination: '/',
        permanent: true, // 308 status for SEO
      },
      {
        source: '/kennisbank/2',
        destination: '/',
        permanent: true,
      },
      
      // Services page - redirect to services section
      {
        source: '/diensten',
        destination: '/#diensten',
        permanent: true,
      },

      // Specific AI knowledge articles - redirect to booking (most relevant for AI consultation)
      {
        source: '/kennisbank/2/chatgpt-je-nieuwe-beste-vriend-of-grootste-vijand',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-4o-complimenten-met-een-keerzijde-risico-s-ontmaskerd',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gemini-met-advertenties-de-toekomst',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ai-revolutie-verandert-de-banenmarkt',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/novo-nordisk-s-ai-50-banen-weg-de-echte-impact',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ai-surveillance-kansen-risico-s-voor-nederland',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/sora-unlimited-openai-s-nieuwe-video-revolutie',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/microsofts-majorana-1-de-toekomst-van-ai',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-o3-mensa-iq-wat-betekent-dit-voor-uw-bedrijf',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/deepseek-ban-nederlandse-bedrijven-opgelet',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/grok-3-gecensureerd-elon-musk-s-ai-onder-vuur',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ai-vs-fotograaf-e-commerce-beeld-in-crisis',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/grok-3-musk-s-ai-revolutie',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/hinton-vs-musk-ai-godfather-roept-niet-op-tot-roy-society-expulsie',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ironwood-google-s-ai-chip-verandert-alles',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/chatgpt-kans-of-bedreiging',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/google-geeft-ai-weg-(gratis-gemini-voor-studenten)',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/daagt-china-s-manus-ai-openai-s-wereldheerschappij-uit',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-4o-revolutie-in-beeld-impact-op-e-commerce-fotografie',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-5-de-ai-revolutie-komt-eraan',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/chatgpt-4o-slimmer-dan-ooit-de-toekomst-van-ai-in-nederland',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/deepseek-verbannen-20-jaar-cel-wat-doet-openai',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-4o-ai-verandert-e-commerce-fotografie',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-5-komt-eraan-klaar-voor-de-ai-revolutie',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/claude-3-7-ai-revolutie-voor-nederlandse-bedrijven',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ai-doet-dom-slimmer-dan-je-denkt',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/musk-s-openai-bod-mislukking-of-meesterzet',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/musk-s-doge-machtsgreep-in-vs-overheid',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/cl1-biologische-ai-verovert-de-toekomst-vepando',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/omnigpt-gehackt-34-miljoen-berichten-gelekt',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/altman-wint-musk-s-openai-bod-afgewezen',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/altman-vs-musk-97-miljard-drama-bij-openai',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/deepseek-s-opkomst-openai-in-paniek',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/nvidia-s-blue-robotrevolutie-begint',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/chinese-ai-tool-bedreigt-uw-privacy-dit-moet-u-weten',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ai-verwoest-outsourcing-wat-betekent-dit-voor-nl',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/chatgpt-vs-russische-propaganda-de-strijd-om-ai-waarheid',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/openai-s-agi-voelen-medewerkers-de-toekomst',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/hinton-waarschuwt-super-ai-slimmer-dan-mensen',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-4o-flatteren-of-fataal-de-gevaren-blootgelegd',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/ai-revolutie-claude-3-7-verandert-alles',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/openai-van-non-profit-naar-mega-bedrijf-musk-reageert',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-4-5-minder-hallucinaties-meer-mogelijkheden',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/openai-s-ai-biologische-wapens-van-de-toekomst',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/openai-s-ai-zegen-of-bedreiging-biowapens-ethiek',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/gpt-4o-ai-beeldrevolutie-voor-nederlandse-bedrijven',
        destination: '/#booking',
        permanent: true,
      },
      {
        source: '/kennisbank/2/musks-doge-ai-gevaarlijk-spel-met-data',
        destination: '/#booking',
        permanent: true,
      },

      // Business-focused articles - redirect to services section
      {
        source: '/kennisbank/ai-voice-bots-vastgoed',
        destination: '/#diensten',
        permanent: true,
      },
      {
        source: '/kennisbank/ai-revolutie-de-ultieme-gids-voor-ondernemers-in-nederland',
        destination: '/#diensten',
        permanent: true,
      },
      {
        source: '/kennisbank/hoe-ai-en-automatisering-efficientie-voor-mkbs-kunnen-verbeteren',
        destination: '/#diensten',
        permanent: true,
      },
      {
        source: '/kennisbank/6-onmisbare-ai-tools-voor-digitale-marketeers',
        destination: '/#diensten',
        permanent: true,
      },

      // Technical articles - redirect to home
      {
        source: '/kennisbank/sitemaptoclipboard-efficiente-tool-voor-digitale-optimalisatie',
        destination: '/',
        permanent: true,
      },

      // Catch-all for any remaining kennisbank URLs
      {
        source: '/kennisbank/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Enhanced headers for performance and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

}

export default nextConfig
