# Phase 5 Accessibility and Performance Audit

## Scope

Public marketing routes and shared components: homepage, service templates, work index, case-study detail template, and placeholder routes. Sanity Studio is excluded because it is a third-party authoring application.

## Implemented fixes

- Added a visible-on-focus skip link and a consistent `main` target on public page templates.
- Added a global visible focus treatment for keyboard users.
- Preserved reduced-motion behavior and added a scroll offset for skip-link navigation.
- Replaced low-contrast teal text on dark and indigo surfaces with accessible off-white text while preserving teal borders and action treatments.
- Confirmed CMS images render through `next/image` with width, height, responsive `sizes`, and required alternative text fields.
- Kept public routes server-rendered with no added client JavaScript.

## Validation

- `pnpm lint`
- `pnpm build`
- Production route generation completed successfully during the build.

## Deferred

- Production Core Web Vitals require deployed real-user measurements.
- Local browser route checks depend on the active development-server environment.
- Contact-form accessibility requires the real form, which is out of scope for the current placeholder route.
- SEO and analytics are intentionally excluded from this phase, per the kickoff workflow.
