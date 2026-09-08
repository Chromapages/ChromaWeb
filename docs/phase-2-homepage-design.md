# Phase 2 Homepage Design

## Understanding summary

- Build the homepage only, following the PRD narrative: mismatch, consequence, solution, standard, evidence, offers, and next step.
- Serve growth-minded service businesses without making unsupported claims.
- Give editors direct control of each homepage section through a singleton Sanity document.
- Reuse existing offer, industry, and case-study records rather than duplicating their content.
- Preserve a deliberate Precision Chroma editorial treatment using the existing tokens.
- Keep the initial experience server-rendered and avoid unapproved imagery, metrics, logos, testimonials, or motion.

## Assumptions

- Placeholder copy is acceptable until final copy is approved, provided every instance is visibly labeled.
- Case-study evidence is empty until a classified, approved record is published.
- The first industry pages are not yet selected; an empty state is appropriate.
- A one-minute revalidation period is suitable for Phase 2.

## Decision log

| Decision | Alternatives considered | Rationale |
| --- | --- | --- |
| Use a `homePage` singleton | Extend `siteSettings`; create a flexible page builder | A dedicated structured document is clear for editors and avoids premature page-builder complexity. |
| Query existing offers, industries, and case studies | Duplicate cards inside homepage content | Referencing canonical documents prevents drift and preserves classification rules. |
| Use simple text and structured steps | Portable Text throughout | Phase 2 needs a reviewable, constrained narrative before rich editorial composition is approved. |
| Show proof empty state when no approved work exists | Seed fictional work | Satisfies the evidence-first policy. |
| No imagery in the initial composition | Stock/AI imagery or speculative assets | No approved assets are available and the PRD prohibits misrepresenting imagery as documentary proof. |

## Final design

`homePage` contains the hero, problem, solution, Chromapages Standard, proof, offers, process, industry relevance, and closing CTA. A reusable section object holds an eyebrow, title, and supporting copy; a structured sequence object holds ordered steps. The homepage queries that document alongside offers, classified case studies, and industries. It uses only Server Components and revalidates CMS reads every 60 seconds. Missing content receives intentional `[placeholder]` empty states.
