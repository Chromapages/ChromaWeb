# Chromapages Marketing Website

Chromapages is a premium web design and development studio marketing platform built with Next.js (App Router), TypeScript, Tailwind CSS, and Sanity CMS.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components by default)
- **UI & Styling:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Content Management:** [Sanity CMS v6](https://www.sanity.io/) (`next-sanity`)
- **Typography:** Plus Jakarta Sans (Headings, via `next/font/google`) & Inter (Body, via `@fontsource-variable`)
- **Analytics:** Google Analytics 4 (GA4) with consent management
- **Package Manager:** `pnpm` (>= 11.x)
- **Runtime:** Node.js >= 20.9.0

---

## Quick Start

### 1. Prerequisites

Ensure you have Node.js (>= 20.9.0) and `pnpm` installed:

```bash
node -v
pnpm -v
```

### 2. Installation

```bash
pnpm install
```

### 3. Environment Configuration

The repository is pre-configured with default public identifiers for the Chromapages Sanity dataset. To configure local environment overrides or enable GA4 analytics, create a `.env.local` file:

```bash
cp .env.example .env.local
```

Key environment variables:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Project ID | `13w6gq5t` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity Dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API Version | `2026-08-15` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID | *(Optional)* |

> [!NOTE]
> Never commit secrets or API tokens. Sanity project IDs and dataset names are public identifiers.

### 4. Run Development Server

```bash
pnpm dev
```

- **Website:** [http://localhost:3000](http://localhost:3000)
- **Embedded Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `pnpm dev` | `next dev` | Starts local Next.js development server |
| `pnpm build` | `next build --webpack` | Builds production application bundle |
| `pnpm start` | `next start` | Starts production server after build |
| `pnpm lint` | `eslint .` | Runs ESLint validation across codebase |
| `pnpm sanity` | `next dev` | Serves embedded Sanity Studio at `/studio` |
| `pnpm sanity:seed` | `sanity datasets import ...` | Imports Phase 1 seed data (safe & non-destructive) |
| `pnpm sanity:seed:phase-6` | `sanity datasets import ...` | Imports Phase 6 pages seed data |

---

## Project Structure

```text
├── docs/                      # PRD, design specs, discovery & tracking plans
├── sanity/
│   └── seed/                  # Seed datasets (ndjson)
├── src/
│   ├── app/                   # Next.js App Router (pages, layouts, routes)
│   │   ├── about/             # /about route
│   │   ├── contact/           # /contact route
│   │   ├── industries/        # /industries/[slug] dynamic routes
│   │   ├── insights/          # /insights & /insights/[slug] routes
│   │   ├── process/           # /process route
│   │   ├── services/          # /services/[slug] dynamic routes
│   │   ├── studio/            # /studio embedded Sanity Studio route
│   │   ├── work/              # /work & /work/[slug] case study routes
│   │   ├── layout.tsx         # Root layout (fonts, header, footer, analytics)
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable UI components
│   │   ├── analytics/         # GA4 & Consent Banner components
│   │   ├── content/           # Page templates (Industry, Insights, Singleton)
│   │   ├── home/              # Homepage sections & components
│   │   └── offer/             # Service offer templates
│   ├── lib/                   # Utilities (SEO, analytics, formatting)
│   └── sanity/                # Sanity configuration, schemas, queries & client
│       ├── lib/               # Sanity client, queries, and fetch helpers
│       └── schemaTypes/       # Document & object schemas
├── public/                    # Static assets (favicons, logos)
├── AGENTS.md                  # Project rules and conventions for AI agents
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

---

## Design & Brand Tokens

| Token | Hex / Value | Usage |
|---|---|---|
| **Indigo** | `#2C3892` | Primary brand accent |
| **Teal** | `#23698C` | Secondary brand accent |
| **Off-White** | `#EFEFED` | Surface / background tone |
| **Ink** | `#0F1115` | Text and high-contrast elements |
| **Headings Font** | `Plus Jakarta Sans` | H1–H6 typography |
| **Body Font** | `Inter` | Body copy and UI interfaces |

---

## Standards & Quality Guidelines

- **Accessibility:** Targeted at **WCAG 2.2 AA** (semantic HTML, keyboard navigable, visible focus rings, ARIA labels).
- **Core Web Vitals:** Optimized image loading via `next/image`, font preloading, minimal client JavaScript.
- **Type Safety:** Strict TypeScript across entire stack.
- **Content Authenticity:** No fabricated metrics, testimonials, or unauthorized client assets. Empty states show labeled `[placeholder]` indicators until official CMS records are published.

---

## Documentation

Full project requirements, discovery briefs, and phase plans are located in the [`docs/`](docs/) directory:

- [Product Requirements Document (PRD)](docs/chromapages-prd.md)
- [Website Discovery Brief](docs/Chromapages%20Website%20Discovery%20Brief%20v1.0.md)
- [SEO & Analytics Design](docs/phase-7-seo-analytics-design.md)
- [Tracking Plan](docs/phase-7-tracking-plan.md)
