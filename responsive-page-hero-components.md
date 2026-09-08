# Responsive Page Hero Components

## Goal

Give every shared page hero distinct desktop and mobile compositions without changing page call sites or the bespoke homepage hero.

## Tasks

- [x] Extract global desktop/mobile hero components from `PageHero`, sharing its existing typed props and semantic subparts. → Existing hero props render through both variants.
- [x] Keep desktop metadata grid at `lg` and introduce the mobile single-column metadata flow below it. → Static markup covers the breakpoint classes.
- [x] Add unique heading IDs per responsive variant and preserve breadcrumb/CTA accessibility. → The variants use unique heading IDs and CSS-hidden inactive layouts.
- [x] Add hero rendering tests, then run tests, ESLint, strict TypeScript, and production build. → All commands succeeded.

## Done when

- [x] `DesktopPageHero` and `MobilePageHero` are exported global components behind `PageHero`.
- [x] Existing non-home page hero consumers migrate automatically through the unchanged wrapper.
