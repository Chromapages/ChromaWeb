This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cloudflare Worker (intake) Deployment

For the current implementation, configuration dependencies, known Worker defects,
verification evidence, and rollback/QA steps, read the
[Nadia → Quinn conversion repair handoff](docs/repair-handoff.md). The deployment
instructions below are reference material; this repair did not deploy or verify
the operational Worker.

The site forwards form submissions to a Cloudflare Worker that creates Linear issues and routes them to the local `cmd/intake` dispatcher. The Worker is **not** part of this repo — it lives outside the project root.

- **Worker location:** `D:\claude-bridge-sandbox\intake-worker\` (Windows path; lives on the D: drive, not in the F: drive project)
- **Deploy command:** from that directory, run `wrangler deploy`
- **Required secrets** (set via `wrangler secret put <NAME>`):
  - `LINEAR_API_KEY`
  - `LINEAR_TEAM_ID`
  - `PATH_SECRET`
  - `INTAKE_FORMS`
  - `DEFAULT_LABELS` (JSON array, e.g. `["intake/web","cmd/intake"]`)
- **After deploy**, copy the printed Worker URL (e.g. `https://intake-worker.<account>.workers.dev`) into `WORKER_URL` in this project's `.env.local`.
- **Full step-by-step:** see `D:\claude-bridge-sandbox\intake-worker\DEPLOY.md`.

The local dispatcher on the dev machine reads Linear issues tagged `cmd/intake` on its tick and runs the intake handler to classify and re-route them.
