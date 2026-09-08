# Phase 6 — Remaining CMS Pages Design

## Understanding summary

- Replace the remaining placeholder experiences: Process, industry detail pages, About, Insights index, insight detail pages, and Contact / Project Fit.
- Help qualified prospects understand the delivery process, relevance, point of view, and next step.
- Use clearly labeled CMS placeholders until copy and assets are approved.
- Include a semantic, non-submitting Project Fit form that does not collect, store, or transmit visitor information.
- Continue enforcing the Phase 4 case-study classification and completeness rules wherever related work appears.
- Preserve the current accessible, server-rendered Precision Chroma implementation.
- Do not create final copy, unsupported proof, client identities, analytics, or form submission handling.

## Assumptions

- Process, About, and Contact use dedicated singleton Sanity documents.
- Industry and insight detail pages use their existing canonical document types.
- The Contact form uses a disabled `fieldset` and an explicit future-submission notice.
- CMS reads revalidate every 60 seconds; absent or unavailable content renders truthful empty states.
- Initial content volume does not require search, filtering, pagination, personalization, or a general-purpose page builder.
- Editors own publishing, placeholders, image permissions, and document relationships.

## Design

### Content model

Create `processPage`, `aboutPage`, and `contactPage` singleton documents. Each document provides a title, introductory content, structured sections appropriate to its route, and an optional CTA. The existing `industry` schema remains responsible for buyer problems, positioning, related offers, related case studies, body content, and CTA. The existing `insight` schema remains responsible for category, author, featured image, content, SEO fields, and related offers.

### Routes and components

Use revalidated Server Component queries for all routes. Process, About, and Contact use reusable editorial page sections. Industry pages include related offers and only eligible classified case studies. Insights uses an accessible article list that remains empty until legitimate documents are published. Insight detail displays metadata, an optional approved featured image, safe text output, and related offers. Contact renders labeled disabled fields and an explicit notice that no submission is available yet.

### Error handling and validation

Missing documents and CMS failures retain the project’s truthful `[placeholder]` states. Image rendering uses `next/image`; no new client-side form handling or rich-text dependency is introduced. Validate with `pnpm lint`, `pnpm build`, and representative public-route rendering.

## Decision log

| Decision | Alternatives considered | Reason |
| --- | --- | --- |
| Use dedicated singleton documents | Extend `siteSettings`; generic page builder | Clear ownership with lower complexity. |
| Keep industry and insight schemas canonical | Duplicate page-specific content | Prevents drift and retains existing editorial fields. |
| Use a disabled contact form | Client-side submit prevention; real submission endpoint | Prevents PII collection or loss before a backend and privacy policy exist. |
| Use reusable editorial sections | Generic modular renderer | Keeps a small, reviewable page system. |
| Render no placeholder insights | Seed fictitious articles | Prevents fabricated expertise and claims. |

## Risks and deferred decisions

- The PRD has not selected the first industries for approved content.
- A shared footer and legal links remain launch-readiness work unless explicitly added later.
- Production performance and real submission behavior require deployment and approved operational decisions.
