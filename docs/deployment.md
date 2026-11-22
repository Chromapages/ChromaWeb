# Deploy ChromaPages on Hostinger hPanel

## Release setup

1. In [hPanel → Websites → Web App](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/), import the ChromaWeb Git repository. Select **`marketing-launch`**, not `main`. Importing a repository starts deployment and future pushes to the selected branch may redeploy it. Review the branch and approved commit before proceeding.
2. Choose **Next.js**, root directory **`.`**, npm, and **Node 24.x** (or Node **22.12+**). `package.json` declares Next.js's minimum of `20.9.0`; the installed Sanity packages need a newer runtime. Use a server deployment with `npm run build` and `npm start`, not a static export. Keep Hostinger's assigned port.
3. Enter the production settings below in **Environment Variables**, then review the release and deploy. Use an isolated temporary hostname and preview intake credentials for pre-cutover form testing. Do not change the live domain or DNS without separate approval.

## hPanel environment

| Variable | Production setting |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://chromapages.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `p2r5601j` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_GTM_ID` | Optional; leave unset until the real container is approved. |
| `WORKER_URL` | `https://chromaweb-intake.chromaweb-intake.workers.dev` (HTTPS origin only). |
| `WORKER_SECRET` | Production Worker Bearer credential from the private hosting handoff. |
| `SANITY_API_WRITE_TOKEN` | Server-only token for the admin session store in the production dataset. |
| `ADMIN_PASSWORD` | Approved server-only portal password. |
| `REVALIDATE_SECRET` | Production secret from the private hosting handoff; required for webhook revalidation. |

Use `.env.worker-production.local` as the private handoff for `WORKER_URL`,
`WORKER_SECRET`, and `REVALIDATE_SECRET`. Do not upload either env file or commit
credentials. Local `.env.local` stays pointed at the Preview Worker. Next.js
loads build-time `NEXT_PUBLIC_*` settings into the client bundle; update them
in hPanel and rebuild when they change.

## Domain, Sanity and intake

- Serve both `chromapages.com` and `www.chromapages.com` over TLS. Next.js issues
  a `308` from `www` to the apex and preserves path and query. Hostinger must
  pass the original Host header for this rule to apply. Follow Hostinger's exact
  records only when DNS changes are separately approved.
- In Sanity project `p2r5601j`, allow `https://chromapages.com` with credentials
  for the embedded Studio at `/admin`. Add a specific temporary HTTPS origin
  only if Studio must be tested there. Do not use wildcard CORS.
- Optional Sanity revalidation: `POST /api/revalidate` with a JSON body containing
  `secret` and `path` or `paths`, per the [API spec](api-spec.md). If an integration
  sends only a signing header, it is not compatible with this endpoint. Do not
  put the shared secret in a URL. Without a matching secret the endpoint fails closed.
- The production intake Worker binds the `chromaweb-intake` D1 database, separate
  from `chromaweb-intake-preview`. See the [Worker runbook](../workers/intake-worker/DEPLOY.md)
  for bindings and observability. Verify persisted log/trace access and exports
  before accepting customer data.

## Smoke and rollback

- On the approved release, check apex `/`, `/contact`, `/services`, `/work`,
  `/sitemap.xml` and `/robots.txt` return `200`; check HTTPS on both hosts and `308`
  from `www` with a path and query. Check an unknown route returns `404`.
- Check `/admin` loads with the intended Sanity project, signed-out `/portal-admin`
  redirects to login, and signed-out `/api/admin/requests` returns `401`.
- Use **Preview D1 only** for synthetic submissions and admin updates. Confirm the
  receipt, unchanged stored text, status/notes after reload, logout revocation and
  deletion of only the synthetic rows. Production checks are read-only unless
  separately approved: check Worker `/health` and authenticated listing without
  printing credentials or request rows.
- Record the approved Git SHA, Hostinger deployment ID and previous known-good
  deployment. Restore that build via **Deployments**, or redeploy known-good
  source if rollback is unavailable. Restore matching hPanel settings and
  rerun the smoke checks. App rollback does not undo D1 migrations or writes;
  keep intake paused if the older build is incompatible. Do not roll back DNS,
  delete data, or restore D1 without separate approval.
