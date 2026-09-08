# Industry Verticals Data Layer

## Purpose

Provide one typed, testable data contract for the Industry Verticals section. The contract supports active and Coming Soon verticals without fabricated destinations, duplicate interactive regions, or empty conversion-action UI.

## Public contract

```ts
export type IndustryVertical = {
  id: string;
  order: number;
  categoryLabel: string;
  title: string;
  hookQuote?: string;
  hookQuoteLink?: string;
  description: string;
  conversionActions: string[];
  exploreLink?: string;
  isPriority: boolean;
  isComingSoon: boolean;
};
```

`exploreLink` is optional only because Coming Soon entries are explicitly non-interactive. `hookQuoteLink` is retained as an optional contract field for future supported editorial links, but no current entry will set it.

## CMS boundary

Sanity remains the source of directory fields. The directory GROQ query includes `_id`, status, priority rank, slug, and card copy. A pure mapper converts each query result into `IndustryVertical`.

- `id`: Sanity `_id`, falling back to the slug only in local fallback data.
- `order`: one-based array position after the query sort; it is not displayed unless a future design has a meaningful total count.
- `categoryLabel`: `listEyebrow`.
- `hookQuote`: `hook`.
- `conversionActions`: `conversionGoals`, normalized to an empty array.
- `exploreLink`: `/industries/{slug}` only for published, active entries.
- `isPriority`: `directoryStatus === "featured"`.
- `isComingSoon`: `directoryStatus === "comingSoon"` or a missing explore link.

The existing two active cards and three Coming Soon fallback cards are normalized through the same mapper.

## Interaction and analytics

Only the Explore control on an active card is interactive. The rest of the card, including `hookQuote`, is static content. This avoids nested anchors and preserves a clear, keyboard-accessible target.

`IndustryExploreLink` is a small client component. On an Explore click it sends both events using the established consent-aware `trackEvent` helper:

- `industry_vertical_card_click`
- `industry_vertical_explore_click`

Both events include `vertical_id` and `position`. No event fires for Coming Soon entries because they have no destination or link.

## Rendering behavior

- Active cards display a plain italic `hookQuote` when present. A hook has no link-like color or affordance.
- `conversionActions` render as semantic list items styled as pills.
- When `conversionActions` is empty, the entire conversion-actions box is omitted.
- Coming Soon cards remain visible and non-interactive.
- The existing auto-fit CSS grid continues to support any number of cards without hardcoded numeric labels.

## Tests

Add Vitest for focused unit tests of the pure mapper and visible-card eligibility. Tests cover:

1. two input records: order, priority, and active links;
2. three input records: a Coming Soon entry remains non-interactive;
3. six input records: sequential derived order and stable link mapping;
4. missing optional fields: no hook link, no Explore link for Coming Soon, and an empty conversion-action array.

Lint, TypeScript checking, Vitest, and the production build must pass.
