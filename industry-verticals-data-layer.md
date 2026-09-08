# Industry Verticals Data Layer

## Goal

Provide a typed, analytics-aware industry-card contract that supports active and Coming Soon entries without empty UI or nested interaction.

## Tasks

- [x] Add Vitest and a test script → Verify: focused TypeScript tests run through `pnpm test`.
- [x] Add the raw CMS type, public `IndustryVertical` type, and pure mapping function → Verify: 2, 3, 6, and incomplete-record cases derive stable order, links, and fallbacks.
- [x] Extend the directory query and data fetcher to return raw records, then map them at the page boundary → Verify: Sanity `_id` drives the public `id`.
- [x] Add the two approved analytics event names and a client-only Explore link → Verify: an active Explore click emits both event names with vertical ID and position.
- [x] Refactor directory rendering to use the public contract and hide an empty conversion-actions box → Verify: Coming Soon entries are non-interactive and active cards have exactly one link.
- [x] Verify quality last → Run `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`.

## Done When

- [x] No static numeric labels or nested interactive regions remain.
- [x] Hook quotes are plain text unless future content provides an approved destination.
- [x] The data layer supports 2 through 8+ cards without component changes.
