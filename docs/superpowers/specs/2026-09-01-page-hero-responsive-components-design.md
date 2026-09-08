# Responsive Page Hero Components

## Goal

Create distinct global desktop and mobile page-hero compositions for every page that currently uses `PageHero`, while leaving the bespoke homepage hero unchanged.

## Scope

`PageHero` remains the public component and keeps its current typed props. It will compose:

- `DesktopPageHero` for `lg` (1024px) and wider: the existing narrative-plus-metadata-card grid.
- `MobilePageHero` below `lg`: breadcrumb, eyebrow and badges, heading, body, CTAs, then an optional full-width metadata card in a single column.

The components will be server-rendered. Both variants can be present for responsive CSS, but the inactive variant will use `display: none`, keeping duplicate headings and links out of the accessibility tree at its inactive breakpoint.

## Shared building blocks

The two layouts will share small presentational building blocks for:

- breadcrumb navigation;
- eyebrow, numeral, and badge row;
- hero narrative and CTA group;
- optional metadata card and metrics.

This preserves text, CTA destinations, analytics attributes, focus treatments, brand tokens, and the single public `PageHeroProps` contract.

## Migration

No current `PageHero` call site changes. Work, case studies, services, industries, offers, Process, About, Contact, and Insights inherit the responsive layouts through the existing component. The homepage remains on its separate bespoke hero path.

## Accessibility and performance

- The active layout retains one visible `h1`, semantic breadcrumb navigation, and existing focus-visible styles.
- Neither global component is a Client Component; no browser JavaScript is added.
- Mobile CTAs retain their current links and become a wrapping/full-width-friendly group without altering destinations.

## Verification

- Static rendering tests assert both breakpoint variants, optional metadata, breadcrumbs, and CTA analytics render from the same props.
- Run tests, ESLint, strict TypeScript, and production build.
