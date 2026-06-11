import Image from "next/image"

const companies = [
  {
    name: "Maatwerk Online",
    logo: "/images/maatwerk-online-logo.webp",
    width: 140,
  },
  {
    name: "Vloerenconcurrent",
    logo: "/images/vloerenconcurrent-logo.webp",
    width: 160,
  },
  {
    name: "Search Signals",
    logo: "/images/search-signals-logo.png",
    width: 120,
  },
]

const stats = [
  { dot: "bg-green-400", label: "30+ AI Agents live" },
  { dot: "bg-blue-400", label: "Live binnen 30 dagen" },
  { dot: "bg-purple-400", label: "100% Nederlandse MKB" },
]

export default function SocialProofSection() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10" aria-labelledby="social-proof-heading">
      <div className="max-w-6xl mx-auto text-center">
        <h2 id="social-proof-heading" className="sr-only">
          Vertrouwd door MKB-bedrijven
        </h2>

        <div className="mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-muted-foreground font-medium tracking-wide uppercase mb-6">
            Vertrouwd door MKB-bedrijven die vooroplopen
          </p>

          <div className="flex items-center justify-center mb-8" aria-hidden="true">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-md"></div>
            <div className="mx-4 w-2 h-2 rounded-full bg-primary/30"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full max-w-md"></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8 lg:gap-12">
          {companies.map((company) => (
            <div
              key={company.name}
              className="group opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <div className="relative flex items-center justify-center h-12 w-40 sm:min-w-[120px]">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain"
                  loading="lazy"
                  quality={90}
                  sizes="160px"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 sm:gap-x-8 text-xs sm:text-sm text-muted-foreground">
            {stats.map((stat, index) => (
              <span key={stat.label} className="flex items-center gap-4">
                {index > 0 && <span className="hidden sm:block w-px h-4 bg-border" aria-hidden="true" />}
                <span className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${stat.dot}`} aria-hidden="true"></span>
                  <span>{stat.label}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
