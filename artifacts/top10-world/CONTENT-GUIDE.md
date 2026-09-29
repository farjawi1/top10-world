# TOP 10 WORLD content guide

TOP 10 WORLD is designed so a normal editor can publish without editing React.
The long-term source of truth is the `content` directory and every published
file is reviewed before it becomes public.

## Publish a Top 10

1. Copy `content/templates/top10-template.md`.
2. Rename the copy using a short lowercase slug.
3. Edit the YAML frontmatter between the `---` markers.
4. Write the introduction, methodology, ranking entries, useful facts, FAQ, and conclusion.
5. Add one image or logo for every ranked item under `public/images/top10/`.
6. Confirm every image has meaningful alt text and a legal source or credit.
7. Set `published: true` only after human review and fact checking.
8. Commit the Markdown and images to GitHub.
9. Cloudflare Pages builds the static site and the page goes live.

## Frontmatter

- `title`, `slug`, `description`: the reader-facing identity.
- `category`: one of the supported editorial categories.
- `tags`: a small list used for discovery and related content.
- `published`: drafts stay out of public indexes until this is `true`.
- `featured` and `trending`: editorial controls for the home page.
- `date` and `updated`: visible publication history.
- `author`: use a real byline; do not invent credentials.
- `coverImage`: the page cover path.
- `seoTitle` and `seoDescription`: search metadata.

## Articles and categories

Use `content/templates/article-template.md` for long-form articles. Articles
should use headings, lists, tables, inline images, captions, and sources rather
than one uninterrupted block of text. Category files describe the editorial
angle and automatically collect published content with the same category.

## Images

Keep files in:

- `public/images/top10/` for ranking covers and item art
- `public/images/articles/` for article covers and inline images
- `public/images/categories/` for category artwork

Use lowercase names with hyphens. Prefer original, licensed, public-domain, or
official press assets. Never scrape copyrighted images from search results.
Missing optional images should fall back to the site's editorial artwork instead
of breaking a page.

## Updating or unpublishing

Edit the Markdown, change `updated`, and commit the change. To temporarily hide
a page, set `published: false`; it will be removed from public navigation and
indexing on the next build. AI-generated drafts must remain drafts until a
person reviews, edits, and fact-checks them.

## Local development

The current preview includes a structured local content module so the site can
be reviewed without a database or API. When the Markdown loader is connected,
the same fields and editorial rules apply. The static site remains useful with
ads disabled and never requires Ollama, authentication, or a server database.