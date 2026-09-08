# Proof classification contract design

## Goal

Make proof classification a single, enforceable source of truth for every public case-study decision. No public view may infer a client relationship from an unclassified, confidential, white-label, concept, prototype, or owned-brand record.

## Registry

A framework-independent registry defines the six approved values, their Studio titles, public disclosure labels, and identity rules:

- `real-public-client` — Client work; approved public identity permitted.
- `confidential-client` — Confidential engagement; public-safe descriptor only.
- `white-label` — White-label engagement; public-safe descriptor only.
- `concept-study` — Concept study; never client proof.
- `internal-prototype` — Prototype system; never client proof.
- `owned-brand` — Owned-brand work; never client proof.

The registry is imported by Sanity validation, UI label rendering, route metadata, and analytics attributes.

## Public-safe content model

Case studies retain internal record fields for Studio use, but public queries use only `publicTitle`, `publicProjectIdentity`, and `publicSummary`. A published-ready record requires these fields, a classification-matched disclosure permission, approved proof review, approved images, and a public-artifact approval. This deliberately suppresses legacy records until migrated rather than risking an unsafe disclosure.

## Public consumers

The strict public query filter accepts only registry values and returns only public-safe fields. Work cards, case-study routes, industry references, home proof references, static params, and sitemap records continue to derive from that filter. Detail metadata includes the registry’s disclosure label so non-client classifications cannot look like named client work in search or shared previews.

Case-study link and route-view analytics receive the classification from the same server-rendered record; no browser-side inference is used.

## Verification

Tests cover all six registry records, confidential disclosure requirements, safe public query projections, disclosure labels, and analytic attributes. Type check, lint, and production build are required.
