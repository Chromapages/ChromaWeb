# Intake Worker deployment

Run commands from `workers/intake-worker` with Node 22.13+ (for `node:sqlite`) and the lockfile-pinned Wrangler v4. Local review requires no Cloudflare account, database IDs or secrets:

```sh
npm ci
npm test
npm run dry-run
npm run dry-run -- --env preview
```

Tests apply the real migration to in-memory SQLite. Dry runs package the Worker; they do not provision, deploy or verify a live D1 binding.

## Approved remote work only: preview first

Before running anything below, confirm remote approval, the intended Cloudflare account, and least-privileged access to manage Workers and D1. This preview is a separately deployed Wrangler environment, not a version URL of the production Worker. The two `DB` bindings must have different database IDs. Never deploy with an omitted ID: Wrangler can auto-provision a database instead of binding the intended one.

1. Create the preview D1 database. Record its returned `database_id` under `env.preview.d1_databases` in `wrangler.jsonc` and check the name and binding before migrating.

   ```sh
   npx wrangler d1 create chromaweb-intake-preview --env preview
   npx wrangler d1 migrations apply chromaweb-intake-preview --remote --env preview
   npm run deploy:preview
   npx wrangler secret put INTAKE_SECRET --env preview
   ```

   Enter a strong, preview-only token at the interactive secret prompt. Do not pass it as an argument or put it in source, URLs or execution logs. `secret put` itself deploys a new version. Until it is set, protected routes return `503`. Configure only the approved Next preview with the matching server-only `WORKER_SECRET` and the Worker’s HTTPS origin as `WORKER_URL`.

2. With synthetic data only, verify open `GET /health` (`200`), missing/incorrect Bearer (`401`), and authorized creation (`201` with a unique `REQ-…` reference). List newest first and filter by status; PATCH the test UUID’s status and notes; verify multiline Unicode messages of 501 and 2,000 characters round-trip unchanged, then DELETE only the synthetic UUIDs. Confirm the Next preview submits and the cookie-authenticated portal lists and updates those rows. Use a trusted client with no header or body logging.

3. Before production, inspect preview logs and traces. App log payloads must be fixed `intake.*` events, without credentials, contact data, messages, notes, or raw errors. Invocation logs are disabled and query strings are redacted. Platform traces still carry metadata such as paths (including request UUIDs) and parameterized SQL text; verify bound values and tokens are absent and review access, retention and any export destinations. Never put contact data or tokens in URLs. Stop if the checks fail or any unexpected sensitive data appears.

## Production and rollback

After preview acceptance and separate production approval, create `chromaweb-intake` and set the returned `database_id` in the top-level binding. Verify it differs from preview. Record the current Worker deployment/version and a D1 Time Travel recovery point before changes to an existing environment. Apply the approved migration, deploy, then set the production-only secret interactively:

```sh
npx wrangler d1 create chromaweb-intake
npx wrangler d1 migrations apply chromaweb-intake --remote
npm run deploy
npx wrangler secret put INTAKE_SECRET
```

Confirm health, authentication and observability before pointing the production Next deployment at the HTTPS origin with its matching server-only secret. If the gate fails, stop traffic cutover or revert the Next deployment. Roll back the Worker to the last compatible version via Cloudflare Deployments or `npx wrangler rollback` (add `--env preview` for preview); a first deployment has no prior version. Worker rollback does not undo D1 migrations or writes. Do not drop tables or restore D1 without separate approval and a verified recovery point.
