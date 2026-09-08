# AGENTS.md

## Project

Chromapages — premium web design/dev studio marketing site. Next.js (App Router) + TypeScript + Sanity CMS.
Full requirements live in `/docs/chromapages-prd.md`. Read it before any structural or content-model decision.

## Setup

- `pnpm install`
- `pnpm dev` — local development server
- `pnpm build` — production build; must pass before work is complete
- `pnpm lint` — must pass with zero errors
- `pnpm sanity` — embedded Sanity Studio at `/studio`

## Conventions

- TypeScript strict mode; no `any` unless justified in a comment.
- App Router only. Use Server Components by default and Client Components only for required interactivity.
- Use Tailwind CSS for styling; no inline styles or CSS-in-JS libraries for the marketing UI.
- Use Plus Jakarta Sans for headings and Inter for body/interface text, loaded with `next/font`.
- Brand tokens: indigo `#2C3892`, teal `#23698C`, off-white `#EFEFED`, ink `#0F1115`.
- Marketing page content belongs in Sanity, except legal boilerplate and clearly labeled empty-state placeholders.
- Every case study requires one of the classifications specified in the PRD. Never render an unclassified case study.
- Do not add placeholder client logos, fake metrics, fabricated testimonials, or unsupported claims.
- Target WCAG 2.2 AA: semantic HTML, visible focus states, keyboard access, and image alternatives.
- Preserve strong Core Web Vitals: use `next/image` for content images and avoid unnecessary client JavaScript.

## Do not

- Do not invent business copy, pricing, or claims that are not in the PRD.
- Do not commit secrets or `.env` files.
- Do not mark a task complete while `pnpm build` or `pnpm lint` fails.

## Commits

Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
