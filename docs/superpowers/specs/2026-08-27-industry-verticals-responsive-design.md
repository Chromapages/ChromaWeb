# Industry Verticals Responsive Behavior

## Goal

Keep Industry Vertical cards legible and non-overflowing from 320px to desktop while preserving the existing page container, typography scale, and bottom-aligned Explore controls.

## Breakpoints

- 320px–639px: one full-width card column and 24px card padding.
- 640px–1023px: one full-width card column and 32px card padding.
- 1024px and above: the existing auto-fit grid with a 400px minimum card width and 40px card padding. Its fixed container supports two columns and wraps additional cards into rows.

The 1024px boundary is inclusive: 1024px is desktop; 1023px and below is stacked.

## Card behavior

- Titles and hook quotes retain natural text wrapping. No manual line breaks are added.
- Conversion-action pills retain their semantic list and flex wrapping. Pills use a maximum width and emergency wrapping to prevent a long label from expanding the viewport.
- The existing `margin-top: auto` footer keeps active Explore links bottom-aligned within the established card minimum height.
- The section has no corner-bracket decoration. Borders and dividers remain CSS-only and cannot overlap mobile card content.
- The page already uses the CTA-only interaction model, so no full-card tap target is introduced. The real Explore link remains the only target.

## Visual regression coverage

Add Playwright with a Chromium project. The regression suite visits `/industries` at 320, 375, 768, 1024, 1280, and 1440px.

At every viewport it asserts that the document does not horizontally overflow and captures the Industry Verticals region. The current fallback data includes the shortest Coming Soon description and the longest active title/description/action combinations, providing representative content-length coverage at 375px and 768px.

## Validation

Run Playwright snapshots, Vitest, lint, TypeScript, and the production build. Snapshot updates are explicit rather than automatic.
