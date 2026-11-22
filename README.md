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

This project uses `next/font/local` with the checked-in Montserrat and Inter Latin variable fonts. Builds do not fetch fonts from Google.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Hostinger

Use the [Hostinger hPanel deployment runbook](docs/deployment.md) for the `marketing-launch` branch, production settings and rollback.

## Request intake

The `/contact` form posts to Next.js at `/api/intake`. Next.js validates the
submission and forwards it to the in-repo [intake Worker](workers/intake-worker/),
which stores the request in Cloudflare D1. A successful response includes a public
`reference` for the receipt; that reference does not grant access to the request
or mean that anyone has reviewed it. The session-protected `/portal-admin` reads
requests and updates status or notes through server-side Next.js routes.

Set `WORKER_URL` to the Worker's HTTPS root and `WORKER_SECRET` to the same
value as the Worker's `INTAKE_SECRET`. Keep both Next.js variables server-only
(no `NEXT_PUBLIC_` prefix); never put a secret in a URL, client bundle, or logs.
D1 retains contact details, messages, and admin notes, so restrict access and set
retention and deletion procedures before accepting real requests. Use synthetic
submissions for local checks; do not send private fields or references to analytics.

For the local-only Worker check (in-memory SQLite, no Cloudflare connection):

```bash
cd workers/intake-worker
node --test worker.test.mjs
```

Phase 7A-1 is local/offline only. The test is not a deployment or evidence of
production delivery. Do not provision remote resources or deploy without separate
Gate 7B approval; use the [deployment runbook](workers/intake-worker/DEPLOY.md)
once approved. See the [repair handoff](docs/repair-handoff.md) for the runtime
contract and verification boundaries.
