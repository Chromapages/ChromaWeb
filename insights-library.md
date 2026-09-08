# Insights library

## Goal

Turn Insights into a CMS-driven guide library with draft-only starter content and a safe public/published boundary.

## Tasks

- [x] Add the `insightsPage` singleton and extend article metadata; verify schema registration and Studio navigation.
- [x] Centralize published-insight eligibility and typed CMS queries; verify drafts cannot enter public index, route, metadata, or sitemap data.
- [x] Build the editorial index and semantic article renderer; verify zero, one, and multi-article states with accessible descriptive links.
- [x] Add Studio-only review surfaces for the singleton and draft article content; verify public routes retain the published CMS perspective.
- [x] Add three idempotent draft guide documents and an Insights singleton seed; verify the artifact contains no public-ready status or fabricated client proof.
- [x] Add automated coverage, inspect responsive/keyboard behavior, then run tests, TypeScript, lint, and production build.

## Done when

- [x] Editors can configure the landing page and review three draft guides in Studio without publishing them.
- [x] Visitors see only approved, published-ready content and an intentional empty state otherwise.
- [x] The Insights index and articles communicate useful guidance with semantic, accessible structure.
