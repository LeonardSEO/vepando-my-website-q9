export const SITE_URL = "https://vepando.com"

export const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/markdown"',
  '</auth.md>; rel="service-doc"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
].join(", ")

export const HOME_MARKDOWN = `# VEPANDO - AI Agents voor MKB

VEPANDO bouwt binnen 30 dagen AI Agents die repetitieve taken automatiseren voor MKB-bedrijven in Nederland.

## Services

- Marketing Agent: automatiseert campagnes, advertenties, doelgroepen en Google Ads-optimalisatie.
- Klantenservice Agent: beantwoordt klantvragen, routeert tickets en werkt CRM-informatie bij.
- Administratie & Facturatie Agent: leest PDF-facturen, controleert bedragen en boekt in boekhoudsoftware.

## Werkwijze

1. Gratis strategiesessie met analyse van tijdvreters, AI Blueprint en vaste prijs.
2. VEPANDO bouwt en traint de agent op de processen en systemen van de klant.
3. De agent gaat binnen 30 dagen live met menselijke controle bij twijfelgevallen.

## Contact

- Boek een gratis strategiesessie: ${SITE_URL}/#booking
- E-mail: info@vepando.com
- LinkedIn: https://www.linkedin.com/company/vepando-ai/

## Agent Discovery

- API catalog: ${SITE_URL}/.well-known/api-catalog
- API documentation: ${SITE_URL}/docs/api
- OpenAPI description: ${SITE_URL}/openapi.json
- LLM summary: ${SITE_URL}/llms.txt
`

export const MARKDOWN_TOKEN_COUNT = HOME_MARKDOWN.trim().split(/\s+/).length

export const API_DOC_MARKDOWN = `# VEPANDO Agent-Facing API Documentation

VEPANDO publishes a small public discovery surface for AI agents. These endpoints are read-only and do not require authentication.

## Endpoints

- \`GET /.well-known/api-catalog\`: RFC 9727 API catalog in \`application/linkset+json\`.
- \`GET /openapi.json\`: OpenAPI 3.1 description for public discovery endpoints.
- \`GET /api/health\`: Public health/status endpoint.
- \`GET /llms.txt\`: Markdown summary of the VEPANDO website for LLM and agent consumption.
- \`GET /.well-known/agent-skills/index.json\`: Agent Skills discovery index.
- \`GET /.well-known/oauth-protected-resource\`: OAuth Protected Resource Metadata describing the current public resource auth posture.
- \`GET /.well-known/mcp/server-card.json\`: MCP Server Card describing browser-side WebMCP tools.

## Authentication

There is no public OAuth/OIDC-protected API for third-party agents at this time. See \`/auth.md\` for the current registration status.
`

export const AGENT_SKILL_MARKDOWN = `# VEPANDO Site Discovery Skill

Use this skill when an agent needs to understand VEPANDO's public services and discovery endpoints.

## Resources

- Read \`${SITE_URL}/llms.txt\` for a concise service summary.
- Read \`${SITE_URL}/.well-known/api-catalog\` for machine-readable API discovery.
- Read \`${SITE_URL}/docs/api\` for public discovery endpoint documentation.

## Actions

- To plan an intake, send the user to \`${SITE_URL}/#booking\`.
- To inspect available agent-facing resources, start from the API catalog.

## Constraints

- VEPANDO does not currently expose a public OAuth/OIDC-protected API for third-party agents.
- Do not assume server-side MCP support unless a future MCP server card advertises a live MCP endpoint.
`

export const API_CATALOG = {
  linkset: [
    {
      anchor: `${SITE_URL}/`,
      "service-desc": [
        {
          href: `${SITE_URL}/openapi.json`,
          type: "application/vnd.oai.openapi+json",
          title: "VEPANDO public discovery OpenAPI description",
        },
      ],
      "service-doc": [
        {
          href: `${SITE_URL}/docs/api`,
          type: "text/markdown",
          title: "VEPANDO agent-facing API documentation",
        },
      ],
      status: [
        {
          href: `${SITE_URL}/api/health`,
          type: "application/json",
          title: "VEPANDO public health check",
        },
      ],
      describedby: [
        {
          href: `${SITE_URL}/llms.txt`,
          type: "text/plain",
          title: "VEPANDO LLM-readable site summary",
        },
        {
          href: `${SITE_URL}/.well-known/agent-skills/index.json`,
          type: "application/json",
          title: "VEPANDO Agent Skills discovery index",
        },
        {
          href: `${SITE_URL}/.well-known/mcp/server-card.json`,
          type: "application/json",
          title: "VEPANDO browser WebMCP server card",
        },
      ],
    },
  ],
} as const

export const OAUTH_PROTECTED_RESOURCE_METADATA = {
  resource: SITE_URL,
  resource_name: "VEPANDO public site",
  resource_documentation: `${SITE_URL}/auth.md`,
  bearer_methods_supported: [],
} as const

export const MCP_SERVER_CARD = {
  serverInfo: {
    name: "vepando-webmcp",
    version: "1.0.0",
  },
  transport: {
    type: "webmcp",
    endpoint: `${SITE_URL}/`,
    note: "Browser-side WebMCP tools are registered on page load. VEPANDO does not currently expose a server-side MCP transport endpoint.",
  },
  capabilities: {
    tools: [
      {
        name: "get_vepando_services",
        description: "Return VEPANDO's AI Agent services and the booking URL for a free strategy session.",
      },
      {
        name: "navigate_vepando_site",
        description: "Navigate the current browser page to a relevant VEPANDO section.",
      },
    ],
    resources: [
      `${SITE_URL}/llms.txt`,
      `${SITE_URL}/.well-known/api-catalog`,
      `${SITE_URL}/docs/api`,
    ],
    prompts: [],
  },
} as const

export const OPENAPI_SPEC = {
  openapi: "3.1.0",
  info: {
    title: "VEPANDO Public Discovery API",
    version: "1.0.0",
    description: "Read-only public discovery endpoints for AI agents and crawlers.",
  },
  servers: [{ url: SITE_URL }],
  paths: {
    "/.well-known/api-catalog": {
      get: {
        summary: "Return the RFC 9727 API catalog",
        responses: {
          "200": {
            description: "API catalog",
            content: {
              "application/linkset+json": {
                schema: {
                  type: "object",
                  properties: {
                    linkset: { type: "array" },
                  },
                  required: ["linkset"],
                },
              },
            },
          },
        },
      },
    },
    "/openapi.json": {
      get: {
        summary: "Return this OpenAPI description",
        responses: {
          "200": {
            description: "OpenAPI description",
            content: {
              "application/vnd.oai.openapi+json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
    "/api/health": {
      get: {
        summary: "Return public site health",
        responses: {
          "200": {
            description: "Health response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    service: { type: "string" },
                    checkedAt: { type: "string", format: "date-time" },
                  },
                  required: ["status", "service", "checkedAt"],
                },
              },
            },
          },
        },
      },
    },
    "/.well-known/oauth-protected-resource": {
      get: {
        summary: "Return OAuth Protected Resource Metadata",
        responses: {
          "200": {
            description: "OAuth Protected Resource Metadata",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
    "/.well-known/mcp/server-card.json": {
      get: {
        summary: "Return the VEPANDO MCP Server Card",
        responses: {
          "200": {
            description: "MCP Server Card",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
  },
} as const
