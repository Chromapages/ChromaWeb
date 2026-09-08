# Proof classification contract

## Goal

Enforce one proof-classification source of truth for public case studies.

## Tasks

- [x] Add the registry and use it in Studio labels and public UI. → Verified: six approved values and labels are covered by tests.
- [x] Require public-safe content and artifact approval before a record can publish. → Verified: unsafe confidential records fail validation.
- [x] Restrict queries, routes, metadata, sitemap, and analytics to the same classification contract. → Verified: public consumers receive only public-safe fields.
- [x] Run focused tests, type check, lint, and build. → Verified: 25 tests, type check, lint, and production build pass.
