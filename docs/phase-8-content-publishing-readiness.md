# Phase 8 — Content and Publishing Readiness

## Understanding summary

- Build an editor-owned publishing workflow for case studies, industries, insights, and imagery.
- Use clearly labelled placeholder records only; do not create client proof, metrics, testimonials, photography, or editorial copy.
- Block unsafe proof publication, while keeping editorial quality guidance advisory where appropriate.
- Exclude content that is not `publishedReady` from public routes, lists, static parameters, and the sitemap.
- Keep permissions, review notes, and image-rights confirmations inside private Sanity fields; public queries do not request them.
- Preserve the existing server-rendered architecture, CMS fallback behavior, and proof/claims policy.

## Editorial workflow

1. Create or update a document in `draft`.
2. Move it to `inReview` when the editor has completed the relevant content fields.
3. A reviewer verifies proof, permissions, classification, rights, image metadata, and attribution where applicable.
4. Mark it `approved` while changes or scheduling remain.
5. Set it to `publishedReady` only when validation passes. Only this status is eligible for the public site.

## Hard publication gates

### Case studies

`publishedReady` requires a non-placeholder project identity; an approved proof review; a verified permission or classification disclosure; all required case-study narratives; attribution limitations; at least one related service; and only images with confirmed rights, approved editorial review, and non-placeholder alternative text.

### Industries and insights

`publishedReady` requires a non-placeholder title, a slug, and approved body content. When an insight has a featured image, it must have confirmed rights, editorial approval, and non-placeholder alternative text.

## Advisory warnings

Industry and insight SEO fields issue an editor warning when an SEO title or description is absent. Images remain optional for those types; reviewers decide whether captions, relationships, or imagery are appropriate before approval.

## Privacy and proof rules

- Do not place legal agreements, client contacts, personal data, or confidential source material in Sanity review notes.
- Use the structured permission/disclosure status rather than free-text assertions as the publication control.
- Image approval confirms suitability, rights, alternative text, and caption accuracy. It does not turn an unapproved asset into proof.
- Classifications must remain visible wherever public case-study work appears.

## Decision log

| Decision | Alternatives considered | Reason |
| --- | --- | --- |
| Native Sanity readiness fields | Custom Studio dashboard; external workflow | Enforceable with the smallest maintenance cost. |
| Fail-closed public queries | Advisory-only display | Prevents accidental public discovery. |
| Hard proof gates | Warnings only | Enforces the PRD proof and claims policy. |
| SEO warnings | Blocking all editorial gaps | Keeps optional quality guidance useful without artificial publishing friction. |
| Structured statuses | Free-text review state | Supports consistent queries and review ownership. |
