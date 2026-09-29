# TOP 10 WORLD

An independent editorial publication for thoughtful Top 10 rankings, essays, guides, travel, technology, culture, products, and ideas.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/top10-world run dev` — run the TOP 10 WORLD website
- `pnpm --filter @workspace/top10-world run typecheck` — typecheck the website
- `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/top10-world run build` — create the static production build
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Website: React + Vite + Tailwind CSS + Wouter + Lucide
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/top10-world/src/App.tsx` — website shell, route map, page compositions, metadata
- `artifacts/top10-world/src/content.ts` — typed editorial content source for rankings, essays, categories, and trending
- `artifacts/top10-world/src/index.css` — visual system, typography, light/dark tokens, motion
- `artifacts/top10-world/content/` — Markdown templates and editorial workflow reference
- `artifacts/top10-world/public/` — favicon, robots, sitemap, and ads.txt
- `artifacts/top10-world/CONTENT-GUIDE.md` — non-technical publishing workflow
- `artifacts/top10-world/README.md` — deployment and architecture notes

## Architecture decisions

- The public website is static and does not depend on the API server, database, authentication, or Ollama.
- The first build uses a typed local content module that mirrors the planned Markdown/frontmatter shape so the editorial surface works without runtime services.
- Vite serves the app at the root artifact path with a catch-all static rewrite for direct route access.
- Contact and newsletter actions use genuine email links instead of pretending to persist data without a mail provider.
- Advertising is opt-in by slot: the AdSense script is ready, but empty pages do not render fake ad units.
- Every published ranking and essay must have its own cover image and meaningful alt text; do not reuse generic placeholder artwork across topics.

## Product

TOP 10 WORLD gives readers a visual, editorial way to discover rankings and essays. It includes responsive navigation, category browsing, ranking filters, archive search, related content, trending content, legal pages, theme switching, and a content publishing guide.

## User preferences

- The user asked for a premium, modern, trustworthy editorial publication rather than a generic blog or ad farm.

## Gotchas

- The artifact workflow provides `PORT` and `BASE_PATH`; use the managed workflow for preview and pass both values for manual builds.
- Do not put secrets or API credentials into the static artifact.
- Keep normal publishing in content files and images; do not require React edits for editorial changes.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
