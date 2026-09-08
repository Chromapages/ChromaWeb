# CMS-backed Industry Directory Design

## Goal

Make `/industries` scale beyond the two current dedicated pages while preserving a truthful distinction between published industry pages and approved, non-interactive coming-soon entries.

## Canonical public scope

The public directory is planned for five verticals:

1. Tax, Accounting & Advisory
2. Restaurant & QSR Growth Brands
3. Insurance & Financial Risk
4. B2B Professional Services
5. Multi-Location Hospitality

Contractors & Trade Services and Churches & Non-Profits remain intake-routing categories for BuiltExpert and ServeStrategy, not Chromapages directory entries.

## Content model

Extend the existing `industry` document with:

- `directoryStatus`: `featured`, `listed`, or `comingSoon`.
- `priorityRank`: optional positive integer, required only for `featured`.
- `listEyebrow`: required directory category label.
- `hook`: required short editorial question or statement.
- `listDescription`: required directory summary.
- `conversionGoals`: array of one to three labels. These are descriptive goals, not links or analytics events.

The existing fields remain the authoritative detail-page model: name, slug, publishing status, buyer problems, positioning, services, related case studies, content, and CTA.

## Publishing and fallback rules

| Directory status | Public treatment | Detail route |
| --- | --- | --- |
| `featured` | Featured priority card; included in the full directory | Link only when `publishingStatus` is `publishedReady` |
| `listed` | Standard directory card | Link only when `publishingStatus` is `publishedReady` |
| `comingSoon` | Visible non-interactive card with an explicit coming-soon label | No link |

Only published-ready records may produce public detail pages. A coming-soon record may be shown before it is published-ready only when its list card has approved non-placeholder directory copy. Missing related case studies do not block a published vertical; the existing no-eligible-work state remains visible on its detail page.

## Queries and routing

- Add an industry-directory query that returns approved directory fields, filters to `featured`, `listed`, and `comingSoon`, and orders featured items by `priorityRank` followed by the remaining items by title.
- Keep the current detail-page query and its `publishedReady` filter.
- Add an industry-index data function and render `/industries` from it.
- `generateStaticParams` remains limited to published-ready industry slugs; coming-soon cards cannot generate routes.

## Layout behavior

- Featured section: render at most two `featured` records in a two-column desktop grid.
- Directory section: one column on mobile, two columns from tablet, and three columns on wide desktop when there are five or more directory records.
- The directory is `/industries` itself. A “Browse all industries” CTA is not placed there; teaser sections elsewhere, such as the homepage, link to it.
- Detail-ready cards use the existing CTA-only navigation model. Coming-soon cards have no link, hover affordance, or focusable control.

## Conversion-goal taxonomy

Rename the current visual label from “Core Conversion Actions” to “Conversion goals.” The labels describe the target end-user journey, not a Chromapages site conversion event. A goal may only become a trackable action after it has a real destination URL and an approved analytics event.

## Accessibility

- Directory cards are semantic articles.
- Non-interactive coming-soon cards contain no focusable controls.
- Each card's optional link has a descriptive label.
- Existing color tokens and responsive spacing utilities remain in use.

## Decisions already made

- Use the existing `industry` document as the single content source.
- Show Insurance, B2B Professional Services, and Multi-Location Hospitality as explicit coming-soon cards until their detail content is ready.
- Keep only the bottom CTA interactive on detail-ready cards.

## Open stakeholder decisions

1. Confirm the five-vertical public directory as the canonical launch scope.
2. Approve the exact directory copy and conversion-goal labels for the three coming-soon records.
3. Confirm whether any currently featured vertical should lose priority status when more entries are added.
4. Approve a future URL and analytics event for any conversion goal that should become a real action.
