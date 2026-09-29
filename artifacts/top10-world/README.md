# TOP 10 WORLD

TOP 10 WORLD is a premium international editorial website for useful,
visual, and well-researched Top 10 rankings, comparisons, guides, reviews,
software, apps, tools, travel, sports, products, and culture.

## Architecture

This project is a static, client-rendered Vite artifact with a local
content model designed to mirror the Markdown and frontmatter workflow. It
uses no database, authentication, paid CMS, or required backend service.
Cloudflare Pages can serve the generated `dist/public` directory.

## Commands

```bash
pnpm --filter @workspace/top10-world run dev
pnpm --filter @workspace/top10-world run typecheck
pnpm --filter @workspace/top10-world run build
```

## Content workflow

Copy a template, rename it, edit the Markdown and frontmatter, add licensed
images, set `published: true`, and commit to GitHub. See `CONTENT-GUIDE.md`
for the full non-technical workflow.

## SEO and advertising

The app includes route-aware titles and descriptions, canonical links, Open
Graph and Twitter metadata, JSON-LD for the publication and editorial pages,
`robots.txt`, a build-ready sitemap, and the requested `ads.txt` publisher
record. Ads are intentionally secondary to the editorial experience.

## Cloudflare Pages

Build command: `pnpm --filter @workspace/top10-world run build`

Output directory: `artifacts/top10-world/dist/public`

No server runtime or database is required after the build.

## Future Ollama workflow

Ollama may be used later to create draft Markdown locally. Drafts must be
reviewed, edited, fact-checked, and committed by a human before publication.
The website does not depend on Ollama being online.