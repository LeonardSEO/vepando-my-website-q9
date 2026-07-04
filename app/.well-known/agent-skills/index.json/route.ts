import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { AGENT_SKILL_MARKDOWN, SITE_URL } from "@/lib/agent-discovery"

function sha256(value: string) {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`
}

export function GET() {
  return NextResponse.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "vepando-site-discovery",
          type: "skill-md",
          description: "Discover VEPANDO public services, agent-readable summaries, and read-only discovery endpoints.",
          url: `${SITE_URL}/.well-known/agent-skills/vepando-site/SKILL.md`,
          digest: sha256(AGENT_SKILL_MARKDOWN),
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
  )
}
