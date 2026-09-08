# Work Evidence Index

## Goal

Replace the public placeholder portfolio with a truthful, indexable-only-when-ready Evidence Index.

## Tasks

- [x] Extend the Work query/card shape with approved evidence and disclosure fields; retain the existing readiness filter. → Verified: the original strict filter is unchanged.
- [x] Pass CMS fetch status into the Work UI and implement published, empty, and unavailable public states. → Verified by rendering tests: no placeholder/CMS queue text or faux project cards render.
- [x] Redesign the populated index around computed count and schema-backed evidence context. → Verified: each rendered card links only to its filtered `/work/[slug]` route.
- [x] Make zero/unavailable states `noindex, follow`; preserve canonical metadata. → Verified in the route’s metadata logic.
- [x] Add focused rendering tests, then run type check, lint, tests, and production build. → Verified: all commands pass.

## Done When

- [x] `/work` is a factual Evidence Index in all data states.
- [x] No unclassified, incomplete, or imaginary work can render.
- [x] The local change is documented for a production deployment that replaces the currently divergent page.
