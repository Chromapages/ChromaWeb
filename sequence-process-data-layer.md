# Sequence process data layer

## Goal

Make the Process sequence CMS-driven, proof-point structured, count-aware, and analytics-ready.

## Tasks

- [x] Add Process-only Sanity schemas for typed steps and industry overrides. → Verify the Process document accepts the new fields without changing offer delivery steps.
- [x] Add a server-side normalizer that validates IDs/orders, selects overrides, and returns ordered render records. → Verify generic and industry-specific records resolve predictably.
- [x] Replace regex-derived badges with `proofPoints[]` and count-aware grid/connector rendering. → Verify 3, 4, and 6 steps have valid sequence labels and layouts.
- [x] Add consent-respecting section-view and CTA-click analytics with constrained parameters. → Verify event names and parameter shapes are registered.
- [x] Add targeted unit tests and run the project verification suite. → Verify tests, lint, strict type checking, and build pass.

## Done When

- [x] Process content has a stable, extensible CMS model with safe generic fallback.
- [x] Sequence rendering has no fixed four-step assumption.
- [x] Analytics contains only `step_count` and CTA identifier for these events.
