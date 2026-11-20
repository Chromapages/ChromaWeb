# Conversion journey repair — Nadia → Quinn

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
2. Reuse the request schema at `/api/intake`. Validate the actual Worker's acceptance
   response, bound network waiting, and avoid logging upstream bodies or secret URLs.
   Retain form values and expose persistent errors on rejected, malformed, or failed
   responses. Callers: `components/forms/request-form.tsx`,
   `lib/validation/request.ts`, `app/api/intake/route.ts`.
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

- No deployment, production configuration changes, dependency additions, scheduler,
  new auth platform, or external Worker edits.
- Marcus's concurrently added `docs/design-review/` studies are explicitly provisional
  for Sloane's review. They were read and left untouched. Their identity/token and
  layout proposals are not treated as implementation approval. Dax-approved proof/
  Rescue Sprint terms and Elliot-specific sign-off remain unavailable in the inspected
  sources. Theme reconciliation and visual acceptance depend on those approvals.
- Static offers remain byte-for-byte unchanged; this does not certify their approval.
- Requiring proof approval intentionally removes unapproved examples from public links.
- Sanity-backed admin sessions require configuration and network availability. Failed
  validation denies access; failed revocation must not masquerade as successful logout.
- The legacy ContactForm calls `/api/contact`, but no page imports it. Leave both
  untouched until an actual caller requires that duplicate delivery path.

## Verification plan

Use dependency-free `node:test` coverage with the installed TypeScript transpiler:
real intake handler with stubbed upstream, actual GROQ queries against in-memory
documents, pricing fallback states, rendered proof/results, and shared-session
validation/revocation. No live customer submissions in automated checks.
Build/lint/typecheck are not part of this pass under the workspace restriction.
Record actual execution results separately; added coverage is not evidence of a pass.

## Known external Worker evidence

Inspected source: `D:\claude-bridge-sandbox\intake-worker`, package version `0.1.0`.
Its success contract is `{ ok: true, issueId, issueIdentifier, issueUrl }`.
The deployed version, destination, and operational owner remain unknown.
Source truncates long field values and mishandles/ignores routing labels; acceptance
alone does not prove complete delivery or dispatcher processing. Quinn must verify
these with the operational owner before intake can be marked launch-ready.

## Implemented status and file inventory

| Work item | Result |
| --- | --- |
| Proof listing/detail | Shared approval/populated-content predicate; home consumes the same source; no static example links; intentional Work empty state. Detail projection includes excerpt and slug. Static params and sitemap inherit eligibility from `getCaseStudies`. |
| Results | Missing results and tags produce no invented outcome/technology claims. CMS URLs in rich text reject unsafe schemes. Case-study images have reserved aspect ratio and responsive sizes. |
| Intake | Shared request validation, explicit Worker acceptance contract, HTTPS-only configured URL, redirect rejection, 10-second timeout, generic errors, no raw upstream logging or private issue URL returned. Form retains values on failure and records success only after confirmed acceptance. Live delivery is blocked by operational evidence below. |
| Admin | Shared expiring hashed-token sessions, Node Proxy guard, awaited validation/revocation, confirmed-logout UI. No hard-coded Linear team fallback; an explicit configured destination is required. Storage outage fails closed. |
| Pricing | Missing, failed and empty CMS fetches use existing `pricingOffers` without changing their text. Exact commercial approval/Rescue Sprint terms remain blocked. |
| Interaction | Featured case-study actions visible at rest, request tabs have visible keyboard focus, reveals expose focused/reduced-motion content, Hero GSAP follows live motion preference and reverts on cleanup. Broader design/token work is blocked. |
| Measurement | Missing/placeholder/malformed GTM IDs load no container. Existing event names/parameters remain unchanged pending Elliot. No private form fields or ticket reference are added to form analytics. |

Application files:

- `app/(marketing)/page.tsx`
- `app/(marketing)/work/page.tsx`
- `app/(marketing)/work/[slug]/page.tsx`
- `app/api/intake/route.ts`
- `app/api/admin/login/route.ts`
- `app/api/admin/logout/route.ts`
- `app/api/admin/requests/route.ts`
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

Coverage: `tests/load-ts.cjs`, `tests/conversion.test.cjs`,
`tests/admin-session.test.cjs`. Documentation: this file, `docs/forms-and-leads.md`,
`docs/api-spec.md`, and the README handoff link. No dependency/lockfile, static offer,
theme token, external Worker, or CMS content records were changed.

## Actual verification evidence — 2026-10-23

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
| `WORKER_URL`, `PATH_SECRET` | Server-only; configured locally by presence check, values never printed. Actual deployed Worker/destination/owner still need verification. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Existing Sanity project; dataset defaults to `production`. Project ID absent locally. Every application instance must use the same dataset. |
| `SANITY_API_WRITE_TOKEN` | New server-only session credential in the existing Sanity project. Needs `adminSession` read/create/delete access. Never use `NEXT_PUBLIC_` for it. No raw session tokens/passwords are stored in CMS. |
| `ADMIN_PASSWORD` | Existing server-only administrator password. Successful real login remains unverified. |
| `LINEAR_API_KEY`, `LINEAR_TEAM_ID` | Existing server-only portal integration; explicit intended team required. No guessed destination fallback. |
| `NEXT_PUBLIC_GTM_ID` | Absent locally. Supply Elliot's actual container and verify destination receipt; placeholder/invalid values stay disabled. |

Host must support the Next 16 Node Proxy, not a static export. Session creation and
deletion wait for Sanity query visibility; validation bypasses the CDN and Next cache.
Session requests time out after 10 seconds without automatic retries. Expired documents
remain stored but cannot authenticate; establish operational housekeeping separately.

## Reproducible QA handoff — Quinn → Sloane

1. Run the focused command above, then the authorized build/typecheck/lint checks in
   the release environment. Capture real desktop/mobile/keyboard/screen-reader evidence.
2. With CMS absent, empty, or unreachable, confirm no broken proof links and honest
   empty states. With owner-approved populated documents, follow every public card and
   sitemap URL to its detail. Draft/incomplete/missing projects must not appear.
   Verify optional results/tags disappear when absent; approve every published claim.
3. In a controlled preview with the Worker owner, submit a synthetic inquiry containing
   **more than 500 characters**. Verify exact full message retention, intended business
   destination receipt, labels/dispatcher routing, deployed Worker version and owner.
   Check invalid JSON/fields, honeypot, absent configuration, upstream rejection, timeout,
   offline and malformed-success responses. Error UI retains values; no success event.
   An accepted ticket emits one `form_submit`, containing no private text or reference ID.
   A lost acknowledgement may leave an accepted issue; no automatic retry is performed.
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

Revert this bounded repair diff and restore the previous application revision. No
content migration or external deployment is performed here. Reverting sessions logs
administrators out and restores the previous known authentication defect; rotate/remove
the dedicated session write token if abandoning this implementation. Do not restore
fabricated proof claims as an operational workaround.
