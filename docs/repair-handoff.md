# Conversion journey repair — Nadia → Quinn

The intake sections describe the Phase 7A-1 local cutover. The dated conversion
repair evidence below is historical; it does not verify this cutover or any
remote deployment.

## Authorized approach

Repair evidenced contracts in the existing App Router application. Preserve offer text,
CTA wording, dependencies, and visual direction. The owner confirmed the admin portal
is launch-critical and authorized the recommended shared session implementation.

## Repair plan and affected callers

1. Use the same approved, populated Sanity case-study predicate for the Work listing,
   detail lookup, homepage proof, static params, and sitemap. Remove static proof
   fallbacks and fabricated results/technology claims. Add editor validation and an
   explicit approval field; existing documents require owner review before appearing.
   Files: `lib/sanity/{queries,fetch}.ts`,
   `sanity/schemaTypes/caseStudy.ts`, marketing home/Work pages, Hero,
   FeaturedWork, ProjectCard, and RichText.
2. Validate public requests at `/api/intake`, then write through the in-repo D1
   Worker. Validate the Worker's receipt before showing success, bound network
   waiting, and keep private data out of logs and analytics. Retain form values
   on rejected, malformed, or failed responses.
   Callers: `components/forms/request-form.tsx`, `lib/validation/request.ts`,
   `app/api/intake/route.ts`.
3. Replace process-local admin sessions with expiring hashed-token documents in the
   existing Sanity project. Validate on every protected route/API and delete on logout.
   Missing configuration/storage failures fail closed. Files: session helper, route
   guard, admin APIs, and dashboard logout caller. Requires a server-only write token.
4. Correct pricing fallback to the existing `pricingOffers` collection, including empty
   CMS results. Do not invent Rescue Sprint terms or revise existing offers.
5. Suppress missing/placeholder GTM configuration. Preserve the current event contract
   until Elliot confirms the final one. Keep proof controls visible to touch/keyboard;
   gate GSAP motion with the user's live reduced-motion preference.

## Boundaries and risks

- Phase 7A-1 does not authorize remote provisioning or deployment. Use the
  [intake deployment runbook](../workers/intake-worker/DEPLOY.md) only after
  separate Gate 7B approval.
- Marcus's concurrently added `docs/design-review/` studies are explicitly provisional
  for Sloane's review. They were read and left untouched. Their identity/token and
  layout proposals are not treated as implementation approval. Dax-approved proof/
  Rescue Sprint terms and Elliot-specific sign-off remain unavailable in the inspected
  sources. Theme reconciliation and visual acceptance depend on those approvals.
- Static offers remain byte-for-byte unchanged; this does not certify their approval.
- Requiring proof approval intentionally removes unapproved examples from public links.
- Sanity-backed admin sessions require configuration and network availability. Failed
  validation denies access; failed revocation must not masquerade as successful logout.

## Verification plan

The original conversion repair used `node:test` with stubbed upstream and
storage boundaries for the request route, in-memory GROQ queries, pricing, proof
rendering, and admin session validation/revocation. For Phase 7A-1, the Worker
check runs its SQL migration against in-memory SQLite, not a remote D1 database:

```bash
cd workers/intake-worker
node --test worker.test.mjs
```

Use synthetic data only. Record observed results separately; instructions and
added coverage are not evidence of a pass or a working deployment.

## D1 intake runtime contract

`/contact` sends public form data to Next.js `POST /api/intake`. Next.js validates
the form and sends a flat JSON body with `requestType`, `name`, `email`, `company`,
`projectType`, `budgetRange`, and `message` to Worker `POST /requests`. The
Worker requires `Authorization: Bearer <WORKER_SECRET>` on request routes and
writes to D1 before returning `201 { ok: true, id, reference, createdAt }`.
After validating that receipt, Next.js returns HTTP 200 with
`{ success: true, message: "Request received successfully.", reference }`. The
reference is a receipt, not an access credential or proof of human review.

| Session-protected Next.js endpoint | Worker endpoint | Success response bodies |
| --- | --- | --- |
| `GET /api/admin/requests` | `GET /requests` (optional `status` and `limit` query parameters on the Worker) | Worker: `200 { ok: true, requests }`. Next.js: `200 { success: true, requests }`. |
| `PATCH /api/admin/requests/[id]` | `PATCH /requests/:id` | Worker: `200 { ok: true, request }`. Next.js: `200 { success: true, request }`. |

The admin API validates the session cookie before calling the Worker. PATCH
accepts `status` and/or `notes` (up to 5,000 characters). Each `IntakeRequest`
has string fields `id`, `reference`, `status`, `requestType`, `name`, `email`,
`company`, `projectType`, `budgetRange`, `message`, `notes`, `createdAt`, and
`updatedAt`. Status is `new`, `active`, `in_review`, or `done`; request type is
`prospect`, `client`, or `question`.

Direct persistence supports follow-up from the portal but puts names, email
addresses, freeform messages, and internal notes in Cloudflare D1. Restrict
portal and Cloudflare access, keep private data and authorization headers out
of logs and analytics, and define retention and deletion procedures before
accepting real requests. A public reference should not enter analytics.

## Implemented status and file inventory

| Work item | Result |
| --- | --- |
| Proof listing/detail | Shared approval/populated-content predicate; home consumes the same source; no static example links; intentional Work empty state. Detail projection includes excerpt and slug. Static params and sitemap inherit eligibility from `getCaseStudies`. |
| Results | Missing results and tags produce no invented outcome/technology claims. CMS URLs in rich text reject unsafe schemes. Case-study images have reserved aspect ratio and responsive sizes. |
| Intake | Shared validation and a D1 receipt contract. The form retains values on failure and records success only after confirmed acceptance. Remote delivery and configuration are not verified by Phase 7A-1. |
| Admin | Shared expiring hashed-token sessions, Node Proxy guard, awaited validation/revocation, confirmed-logout UI, and session-protected D1 list and update routes. Session storage outage fails closed. |
| Pricing | Missing, failed and empty CMS fetches use existing `pricingOffers` without changing their text. Exact commercial approval/Rescue Sprint terms remain blocked. |
| Interaction | Featured case-study actions visible at rest, request tabs have visible keyboard focus, reveals expose focused/reduced-motion content, Hero GSAP follows live motion preference and reverts on cleanup. Broader design/token work is blocked. |
| Measurement | Missing/placeholder/malformed GTM IDs load no container. Existing event names/parameters remain unchanged pending Elliot. No private form fields or request reference are added to form analytics. |

Application files:

- `app/(marketing)/page.tsx`
- `app/(marketing)/work/page.tsx`
- `app/(marketing)/work/[slug]/page.tsx`
- `app/api/intake/route.ts`
- `app/api/admin/login/route.ts`
- `app/api/admin/logout/route.ts`
- `app/api/admin/requests/route.ts`
- `app/api/admin/requests/[id]/route.ts`
- `app/layout.tsx`
- `app/portal-admin/page.tsx`
- `components/cards/project-card.tsx`
- `components/forms/request-form.tsx`
- `components/sections/featured-work.tsx`
- `components/sections/hero.tsx`
- `components/ui/rich-text.tsx`
- `components/ui/scroll-reveal.tsx`
- `lib/admin-session.ts`
- `lib/sanity/fetch.ts`
- `lib/sanity/queries.ts`
- `lib/validation/request.ts`
- `sanity/schemaTypes/caseStudy.ts`
- `proxy.ts` replaces `middleware.ts` using the installed Next 16 convention.

Conversion repair coverage: `tests/load-ts.cjs`, `tests/conversion.test.cjs`,
and `tests/admin-session.test.cjs`. That repair left dependencies, the lockfile,
static offers, theme tokens, and CMS content records unchanged. The D1 Worker
and its local test are in [`workers/intake-worker/`](../workers/intake-worker/).

## Historical verification evidence — 2026-10-23 (pre-cutover)

- Clean `main` checkout confirmed before edits. Installed and locked versions agree:
  Next.js `16.2.2`, React `19.2.4`, Sanity `5.19.0`, next-sanity `12.2.1`.
  Node `24.11.1`, TypeScript `5.9.3`, GSAP `3.14.2` inspected.
- Before production edits, the regression baseline reproduced seven contract failures;
  the eighth baseline failure was a test default-export mock, corrected separately.
- `node --test tests/conversion.test.cjs tests/admin-session.test.cjs`: **23 passed,
  0 failed**. Tests execute actual TS/TSX modules with mocked network/storage/hook
  boundaries and real GROQ evaluation. This is not a build, typecheck, browser test,
  or evidence that production credentials/storage work. The pricing offline-case
  warning is expected from the intentionally failing mocked CMS request.
- `npm run dev -- --hostname 127.0.0.1 --port 3100`: Next dev server became ready.
  Local HTTP inspection returned **200** for `/`, `/services`, `/work`, `/process`,
  `/pricing`, `/about`, `/contact`, `/thank-you`, `/privacy-policy`.
  `/work` contained the intentional empty state; the removed static example URL
  `/work/service-site-refresh` returned **404**. `/portal-admin` returned **307** to
  login and `/api/admin/requests` returned **401** without a session. Those HTML
  responses contained no GTM loader. This proves development route rendering only.
- `git diff --check`: no whitespace errors (Git emitted line-ending notices).
- In-app browser navigation timed out; no browser screenshots or visual-verdict score
  exist. Build/lint/typecheck were not run. No external submission or deployment occurred.

## Configuration and operational dependencies

| Configuration | Requirement |
| --- | --- |
| `WORKER_URL` | Next.js server-only HTTPS Worker root, without a path, credentials, query string, or fragment. |
| `WORKER_SECRET`, `INTAKE_SECRET` | Server-only shared secret: the Next.js `WORKER_SECRET` must match the Worker's `INTAKE_SECRET`. No `NEXT_PUBLIC_` prefix, secret URLs, or logging. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Existing Sanity project; dataset defaults to `production`. Project ID absent locally. Every application instance must use the same dataset. |
| `SANITY_API_WRITE_TOKEN` | New server-only session credential in the existing Sanity project. Needs `adminSession` read/create/delete access. Never use `NEXT_PUBLIC_` for it. No raw session tokens/passwords are stored in CMS. |
| `ADMIN_PASSWORD` | Existing server-only administrator password. Successful real login remains unverified. |
| `NEXT_PUBLIC_GTM_ID` | Absent locally. Supply Elliot's actual container and verify destination receipt; placeholder/invalid values stay disabled. |

Host must support the Next 16 Node Proxy, not a static export. Session creation and
deletion wait for Sanity query visibility; validation bypasses the CDN and Next cache.
Session requests time out after 10 seconds without automatic retries. Expired documents
remain stored but cannot authenticate; establish operational housekeeping separately.

## Reproducible QA handoff — Quinn → Sloane

1. Run the applicable focused local checks above and record the actual results.
   Run release-environment checks only when authorized. Capture real desktop,
   mobile, keyboard, and screen-reader evidence for release acceptance.
2. With CMS absent, empty, or unreachable, confirm no broken proof links and honest
   empty states. With owner-approved populated documents, follow every public card and
   sitemap URL to its detail. Draft/incomplete/missing projects must not appear.
   Verify optional results/tags disappear when absent; approve every published claim.
3. Locally, use synthetic data to check validation and the D1 create/list/update
   contract. Check invalid JSON/fields, honeypot, absent configuration, rejection,
   timeout, and malformed receipts. The form retains values on failure; accepted
   requests emit one `form_submit` with no private text or reference. A lost
   acknowledgement can leave a stored request; do not assume failure means no
   write. After Gate 7B approval, verify the same synthetic flow on the intended
   deployment, including persisted message contents (over 500 characters),
   authenticated portal listing, status/notes updates, and request logging settings.
4. Configure the existing shared session store. Login on instance A, access portal/API
   on B, logout on B, and replay the old cookie against A: access must be denied.
   Missing, forged, expired and revoked cookies fail closed. Simulate storage failure:
   login issues no cookie, validation denies access, logout reports failure and retains
   the current cookie. Check secure/HttpOnly/SameSite cookie attributes in HTTPS preview.
5. Compare pricing against Dax/owner's exact approved source in all CMS states; fallback
   correctness is not approval of commercial terms. No Rescue Sprint terms were added.
6. After Sloane/Marcus approve the design package, reconcile missing semantic tokens
   and implement the approved states. Verify touch links, focus visibility, live
   reduced-motion changes, and content availability with JavaScript disabled.
7. Elliot confirms final event parameter names, actual GTM configuration and once-only
   receipt in the destination account. Current camelCase dataLayer fields differ from
   generic snake_case examples in `docs/analytics.md`; this remains an explicit contract
   decision, not silently resolved in this patch.

Release acceptance is **pending** these independent checks and approval dependencies.

## Rollback

Restoring the pre-repair application revision logs administrators out and restores
the previous known authentication defect. Rotate/remove the dedicated session write
token if abandoning shared sessions. Do not restore fabricated proof claims.
Rolling back application code does not delete requests already stored in D1.
