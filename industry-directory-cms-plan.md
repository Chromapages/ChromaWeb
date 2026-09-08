# CMS-backed Industry Directory

## Goal

Replace the hardcoded Industry Verticals cards with a Sanity-backed directory that supports featured, listed, and explicit coming-soon verticals.

## Tasks

- [x] Extend `src/sanity/schemaTypes/documents/industry.ts` with directory status, priority rank, list-card copy, and conversion-goal fields; validate visible directory records → Verify: Sanity schema type-checks and enforces required fields by status.
- [x] Add an industry-directory GROQ query and `getIndustryDirectory` data function in `src/sanity/lib/queries.ts` and `src/sanity/lib/contentPages.ts` → Verify: query returns featured/listed/coming-soon fields while detail and slug queries remain published-ready only.
- [x] Add approved seed or fallback directory data for the two featured verticals and three coming-soon verticals → Verify: the full five-item directory renders without relying on network CMS access.
- [x] Refactor `src/app/industries/page.tsx` into featured and directory sections with CTA-only published cards and non-interactive coming-soon cards → Verify: 1-column mobile, 2-column tablet, and 3-column wide-desktop directory behavior; no dead links.
- [x] Rename the existing card label to “Conversion goals” and preserve all approved labels → Verify: goals render as semantic lists and are not represented as trackable actions.
- [x] Verify quality last → Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`; inspect `/industries` at mobile, tablet, and desktop widths.

## Done When

- [x] `/industries` is driven by one CMS content model and renders up to two featured verticals plus the full directory.
- [x] Coming-soon entries are visible, explicitly labeled, and non-clickable.
- [x] Only published-ready entries generate detail routes.
- [x] The final page has no fabricated proof, dead links, or ambiguous conversion-action claims.
