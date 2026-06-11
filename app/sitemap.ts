import type { MetadataRoute } from "next"

const LAST_MODIFIED = new Date("2026-06-11")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vepando.com",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://vepando.com/legal",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]
}
