# Phase 3 Offer Pages Design

## Understanding summary

- Build the five existing service routes with one reusable offer-page template.
- Use canonical Sanity offer documents as the only content source.
- Make scope, deliverables, investment guidance, process, and next step easy to scan for qualified buyers.
- Display only investment guidance documented in the PRD, preserving its qualifying language.
- Keep buyer-problem narratives, timelines, and CTA language as visible placeholders until approved.
- Exclude Site Care, case-study proof, testimonials, outcome claims, forms, and unapproved imagery.

## Assumptions

- The five existing title-only offer documents can safely receive Phase 3 content.
- The existing 60-second CMS revalidation remains appropriate.
- The same semantic, responsive, server-rendered pattern used for the homepage is sufficient for the offer pages.

## Decision log

| Decision | Alternatives considered | Rationale |
| --- | --- | --- |
| One shared offer-page template | One handcrafted page per offer | The offers differ in data, not the underlying buyer journey; one template reduces drift. |
| Add `deliverySteps` to the offer schema | Hardcode process UI | Editors need control of delivery sequencing without changing code. |
| Store PRD investment guidance in `investmentRange` | Create pricing tables | The PRD provides guidance, not packaged or fixed-price plans. |
| Use `pt::text()` for rich-text summary projections | Add a Portable Text rendering dependency | The current page needs concise, stable copy without expanding the rendering surface. |

## Final design

Each page has a dark editorial hero, a concise positioning block, two-column problem and solution sections, a deliverables list, an investment and timeline panel, a delivery sequence, optional related industries, and a CMS-owned CTA. The route awaits its dynamic slug, fetches the matching offer through a parameterized GROQ query, and uses the same revalidated Server Component approach as Phase 2.
