# Insights library migration design

Date: 2026-09-06

Status: Implemented on 2026-09-06. The Insights page and three starter guides are in Sanity as drafts; no guide has been published.

## Purpose and boundaries

Build a practical guide library for prospective Chromapages clients. Help readers understand website strategy, performance, and delivery, then provide a clear route into a project conversation.

Use the existing shared desktop/mobile page heroes, brand tokens, capped page container, and editorial visual language. Do not change the homepage or unrelated pages. No filter UI, newsletter signup, invented proof, stock client imagery, or new public preview authentication subsystem.

## Current implementation

- `/insights` renders an empty-state hero when its query returns no public articles. This is the currently observed state; it does not establish the number of unpublished CMS records.
- Populated index copy and the hero metadata panel are hardcoded; there is no Insights landing-page singleton.
- The existing `insight` document includes title, slug, category, author, Portable Text content, SEO, optional image, related offers, and publishing readiness.
- Public queries use the published perspective and require `publishingStatus == "publishedReady"`.
- Detail rendering flattens Portable Text into plain text, losing heading/list/link semantics. Reading time is hardcoded to five minutes.
- `/insights` is currently noindex when there are no public articles.
- There is no implemented authenticated website draft-preview route. Sanity Studio is the available editorial authentication boundary.

## Page composition

1. **Editorial hero:** CMS-controlled title and concise introduction. Reuse the shared hero's editorial variant. A library jump link appears only when the library exists; do not render a misleading static metadata panel.
2. **Featured guide:** one explicitly selected eligible article. Title is the primary descriptive link, followed by its summary, topic, and available metadata. Optional approved media gets a storytelling role rather than becoming a mandatory placeholder.
3. **Latest perspectives:** a restrained editorial list, not an equal-card image wall. Use the same title, summary, topic, and metadata hierarchy. Sort by publication date with a deterministic tie-breaker. Exclude the featured article from this list.
4. **Closing CTA:** CMS-controlled heading and navigation action using the existing project-conversation styling. No additional lead-capture service.

All sections use meaningful headings. Article information is visible without hovering. Below desktop widths, featured media and text stack in DOM reading order. Body text has a readable measure, links have visible focus, and interactive targets are at least 44px high where presented as actions.

## CMS model

### New `insightsPage` singleton

Use fixed document ID `insightsPage` and a dedicated Studio navigation entry.

- `title`: required public heading.
- `introduction`: concise public introduction.
- `featuredHeading`: public section heading.
- `featuredInsight`: optional reference to one `insight`.
- `latestHeading`: public library heading.
- `emptyStateHeading`, `emptyStateBody`: intentional public copy when no approved guides exist.
- `ctaHeading`, `cta`: optional closing project-conversation action.
- `seo`: existing SEO object.

Public rendering reads the published singleton only. Missing singleton data uses a clean, minimal public fallback, never CMS setup instructions. A configured reference cannot bypass article readiness checks.

### Extend `insight` without replacing existing fields

- `summary`: concise buyer-oriented article summary.
- `publishedAt`: editorial publication datetime; do not set a fictitious publication date on drafts.
- Keep `category` and `author` compatible with existing records. Do not invent a named author; omit the byline until approved.
- Keep Portable Text as the article body source of truth.
- Reuse existing SEO, image permissions, related-offer references, and readiness workflow.

Require summary, substantive article body, valid slug, and publication date for published-ready articles. Validate fields in Studio and enforce eligibility in the public data layer as well. Audit existing records before tightening the gate; report any that would become ineligible instead of silently rewriting them.

Reading time is derived from the actual body text and labeled as an estimate, not stored as an arbitrary five-minute value. Do not label creation timestamps as publication dates.

## Article detail rendering

- Use the title, summary, optional byline, publication date, category, and estimated reading time from actual data.
- Render supported Portable Text paragraphs, headings, lists, emphasis, and safe links semantically. Preserve paragraph order and editorial content.
- Keep one article H1 and meaningful subordinate headings; do not turn the complete article into a generic section named "Perspective".
- Respect existing approved-image requirements and render captions/alternative text intentionally.
- Show only public-eligible related offers, with descriptive links.
- Preserve canonical URLs and article metadata. Drafts do not enter public detail routes, static parameters, or the sitemap.

## Draft review and public presentation

Use a **Studio-only preview view** for the landing-page singleton and articles. The Studio's authenticated client can retrieve draft content for this view; the public server client remains published-only. Preview uses the same presentation components with an explicit preview data adapter.

Any draft labels, missing-field guidance, and setup information stay inside Studio. Do not add a public query parameter that exposes drafts. Do not send write credentials to a public route. Do not cache authenticated draft data in the public page cache.

The first implementation must verify preview behavior in the existing Studio environment. If authenticated CMS access is unavailable, complete local code and import assets, then report the exact CMS action blocked; do not claim records were created or publicly visible.

## Zero, one, and multiple article states

- **Zero eligible public articles:** intentional hero, CMS-approved empty-state copy, and available closing CTA. Hide featured/library containers and dead jump links. Retain noindex, follow. Draft examples remain visible only in Studio preview.
- **One eligible article:** render once. If selected as featured, suppress an empty latest section; otherwise use the library presentation.
- **Multiple eligible articles:** optional selected feature plus remaining dated articles. Do not force a feature when none is selected or create empty categories.
- **Invalid/unpublished featured reference:** omit the feature without exposing an editorial diagnostic; valid articles remain in the library.
- **CMS failure:** safe public fallback; errors remain server-side. Never present failure as a verified inventory count.

## Initial content documents

Create three substantive drafts for the user-approved topics:

1. What to prepare before a website redesign.
2. How to evaluate website performance beyond a speed score.
3. What a controlled website launch should include.

Each draft includes a summary, proposed category, useful structured body, SEO draft, and appropriate existing related-offer references where verified. Draft content must provide practical guidance, not pretend to describe completed client engagements. Source technical guidance from current primary documentation during writing; qualify targets and distinguish lab measurements from field outcomes.

Create a draft `insightsPage` document with proposed public copy and a reference to the first guide, allowing the complete composition to be reviewed in Studio. No record is automatically published or marked published-ready. Public visibility requires the user's editorial review and publication.

Use deterministic IDs, inspect existing records first, and create missing drafts without overwriting either published records or existing editorial drafts. Store a repeatable, reviewable seed/import artifact in the repository. Do not include secrets in files or command output.

## Implementation sequence

1. Inspect existing CMS inventory and available authenticated write access; fetch current Sanity/Next documentation for the APIs actually used.
2. Add and register the singleton, article metadata fields, and validation rules; add the Studio navigation entry.
3. Define typed index/detail data adapters and a shared eligibility policy for index, detail, metadata, and sitemap.
4. Build the editorial index and semantic article renderer using existing design tokens.
5. Add the authenticated Studio preview views without changing the public client perspective.
6. Write the three sourced draft guides and singleton seed document; create missing CMS drafts when authenticated access is available.
7. Run automated and browser verification. Report publication status separately from local implementation status.

## Acceptance checks

- Automated coverage for zero, one, and multiple articles; featured de-duplication; missing/unpublished references; optional metadata; reading-time calculation; semantic rich text; unsafe URLs; draft/public separation; and idempotent draft creation.
- Public HTML and serialized data contain no draft guide content or internal setup diagnostics.
- CMS preview renders the proposed sections while public eligibility remains unchanged.
- Verify mobile and desktop layouts at 320, 375, 768, 1024, 1280, 1440, and 1920px, including natural long-title wrapping and no horizontal overflow.
- Verify keyboard order, useful link names, focus visibility, text contrast, heading hierarchy, and optional-image alternatives.
- Check public article routing, missing/draft 404 behavior, index robots state, canonical URLs, and sitemap exclusion of drafts.
- `pnpm test`, TypeScript, `pnpm lint`, and `pnpm build` must pass before implementation is called complete.

## Approval and remaining boundaries

The page structure and three topics are approved and implemented. This document selects Studio-only preview as the lowest-scope way to review unpublished sections. Actual publication and attribution of the starter guides remain separate editorial decisions; neither is inferred from approval to build the page.
