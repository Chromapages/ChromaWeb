# Editorial section migration

## Goal

Remove the empty eyebrow-only left rail from all editorial templates.

## Tasks

- [x] Make `EditorialSection` permanently full-width and migrate Process to its default API. → Verify Context and Sequence share one content start line.
- [x] Replace Offer and Case Study local split wrappers with the shared section. → Verify no local `0.7fr / 1.3fr` content rails remain.
- [x] Update the dormant HomeSection primitive and Case Study related-services block to full width. → Verify future callers cannot recreate the defect.
- [x] Add regression assertions and run tests, lint, type checking, and a production build. → Verify all checks pass.

## Done When

- [x] Every listed affected section uses a full-width editorial header.
- [x] No empty left editorial rail remains in the codebase.
