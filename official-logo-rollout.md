# Official Logo Rollout

## Goal
Replace every visual Chromapages wordmark in the public website UI with the supplied official logo while preserving navigation behavior, accessibility, and performance.

## Tasks
- [x] Add `/Users/mimac/Downloads/Logos (3).svg` to `public/brand/` under a stable, descriptive filename; retain the supplied file as the source of truth. → Verified: `public/brand/chromapages-logo.svg` retains the `0 0 375 50.249999` viewBox.
- [x] Produce a web-safe version only if metadata removal materially reduces the current ~893 KB size, without altering artwork, color, transparency, or proportions. → Skipped: the supplied 892,725-byte SVG is used unchanged because its embedded raster layers cannot be visually verified after optimization with the available tooling.
- [x] Replace the textual `Chromapages` home link in `src/components/SiteHeader.tsx` with the logo asset, keeping the link’s accessible name and existing keyboard focus treatment. → Verify: the header contains no visible text wordmark, the logo links to `/`, and a screen reader receives “Chromapages home.”
- [ ] Size the wide wordmark responsively within the current header so it remains legible without crowding or wrapping the navigation. → Verify: inspect narrow mobile, tablet, and desktop widths for clipping, distortion, layout shift, and navigation overlap.
- [ ] Re-scan the public UI for visual logo/wordmark treatments and replace any additional instances found; leave editorial mentions, metadata, CMS/Studio labels, domain names, and analytics consent copy as text. → Verify: `rg` shows no remaining visual wordmark implementation outside the official asset, while legitimate textual references remain unchanged.
- [ ] Run `pnpm lint` and `pnpm build`, then visually check the header on representative public routes and confirm `/studio` still has no website navbar. → Verify: both commands pass with zero errors and route behavior matches expectations.

## Done When
- [ ] The official artwork is the only public-facing visual Chromapages logo/wordmark.
- [ ] The logo is crisp, proportional, accessible, responsive, and does not introduce a meaningful performance regression.

## Notes
The current inventory found one visual wordmark: the `Chromapages` text link in `src/components/SiteHeader.tsx`. The SVG contains embedded PNG data, so optimization must be validated visually rather than assumed safe.
