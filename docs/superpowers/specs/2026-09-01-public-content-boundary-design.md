# Public content boundary design

## Objective

Prevent internal editorial and implementation state from entering the public Chromapages experience. A visitor-facing route may show approved content, a neutral unavailable message, or a not-found result; it must not reveal CMS vendors, content queues, publication checks, setup instructions, schema status, or placeholder tokens.

## Boundary

`PublicPageUnavailable` is the shared visitor-only fallback. It accepts only a visitor-facing title, optional neutral description, and optional destination. It intentionally has no CMS result, route, publication status, or diagnostic props.

Data-fetching status stays in `src/sanity/lib/fetchPage.ts` for server-side route decisions. Studio remains separate at `/studio`; public components do not render those states.

## Migration rules

- A missing singleton document uses `PublicPageUnavailable` with `noindex, follow` metadata.
- A missing dynamic document returns `notFound()` rather than rendering incomplete copy.
- A list with no records renders a concise neutral empty state with no count, queue, vendor, or publishing explanation.
- Optional sections are omitted when their approved content is absent.
- Default metadata is human-facing and neutral; it contains no placeholder or CMS wording.
- Visitor-facing marketing copy refers generically to a structured content system where a vendor name previously appeared.

## Verification

Tests assert public fallback markup contains neither `placeholder` nor `Sanity`; a repository scan covers public app/component files. Type check, lint, tests, and production build complete successfully.
