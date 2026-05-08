# Manic Docs

Official documentation site for the Manic framework.

- Live docs: [manicjs.tech/docs](https://manicjs.tech/docs)
- Repo: [manic-js/docs](https://github.com/manic-js/docs)

## Tech Stack

- Next.js (App Router)
- Fumadocs + MDX
- Bun runtime and package manager
- TypeScript

## Local Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Important Scripts

- `bun run dev` - start dev server
- `bun run build` - production build
- `bun run start` - run production server
- `bun run types:check` - generate types + TypeScript check
- `bun run lint` - run oxlint

## Content Structure

- `content/docs/` - all documentation pages (`.mdx`)
- `app/docs/` - docs routes and page shell
- `lib/source.ts` - content source loader
- `source.config.ts` - MDX/Fumadocs source configuration

## SEO Notes

- Canonical domain is `https://manicjs.tech`
- Robots and sitemap are generated via Next metadata routes:
  - `app/robots.ts`
  - `app/sitemap.ts`

## Troubleshooting

If you see an error like `Export docs doesn't exist` from Fumadocs collections, regenerate sources:

```bash
bunx fumadocs-mdx
```

Then restart the dev server.
