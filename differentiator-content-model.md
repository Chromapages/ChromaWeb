# Reusable differentiator content model

## Goal

Make operational commitments CMS-ready, semantically ordered, and reusable without conflating them with process stages.

## Tasks

- [x] Add the shared ordered-content and differentiator types plus legacy normalization. → Verified stable ids/orders and optional proof links in unit tests.
- [x] Add a reusable semantic differentiator list that relies on native ordered-list markers. → Verified its static markup contains one `<ol>`, `<li>` items, and no injected numeral text.
- [x] Add the `differentiatorItem` Sanity object and optional Process page field; project it through the existing query. → TypeScript accepts both migrated and legacy Process data.
- [x] Render Process operating principles through the reusable list, preserving approved legacy copy and omitting unavailable proof links. → The fallback remains available during migration.
- [x] Extend the process-step type from the shared base without changing its richer proof-point/override schema. → Existing 3-, 4-, and 6-step tests pass.
- [x] Run tests, lint, type-check, and production build. → All checks passed; the build used its known Sanity network fallback.

## Done when

- [x] The Process standards have native `<ol>/<li>` semantics and no duplicate visual numbering.
- [x] Future differentiator lists have a documented CMS and TypeScript contract.
- [x] Existing sequence, offer, home, and About lists retain their correct, distinct process semantics.
