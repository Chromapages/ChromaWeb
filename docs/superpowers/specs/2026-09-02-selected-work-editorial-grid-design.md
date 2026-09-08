# Selected Work editorial grid design

## Goal

Present the desktop Work index as a constrained editorial sequence, not an ecommerce card catalog, while preserving one consistent evidence hierarchy for every preview.

## Editorial priority model

Case studies gain two public-safe, approval-gated fields:

- `workIndexFeatured`: an explicit editorial-placement decision.
- `workIndexRank`: a positive integer for stable index order.

At most one public case study may be featured. Featured placement is not a claim about commercial performance, proof strength, client importance, or classification. It is an editorial presentation decision only. A published-ready record must have a rank; records cannot share a featured slot.

## Desktop grid

The existing `max-w-main` container remains the outer boundary. A 12-column CSS grid provides shared horizontal alignment. If an approved featured record exists, it occupies the first full row and spans the full editorial width, with larger approved media and the established Problem → Intervention → Evidence information hierarchy. Supporting records use two aligned columns beneath it.

Without a featured record, all records use the two-column supporting layout in rank order. The layout never uses masonry, horizontal dragging, hover-only information, or artificial business ranking through different supporting-card sizes.

Cards remain content-complete at rest: classification, identity, title link, problem, intervention, strongest legitimate proof with stated limits, disciplines, and a secondary named destination. Controlled asymmetry comes only from the single editorially selected lead placement and media scale.

## Responsive behavior

Desktop begins at `lg`; the feature span and two-column arrangement collapse to a single aligned sequence below that breakpoint. The same information order and title-first link treatment remain at all sizes.

## Data, query, and validation

The strict public case-study filter remains the eligibility source of truth. Queries return the editorial fields, order the featured record first, then rank, then creation date. Validation requires a unique positive rank for published-ready records and prevents more than one featured record at the document-validation level where possible; Studio filtering also limits the selection to already eligible records.

## Verification

Tests cover no feature, one feature, rank ordering, the shared preview hierarchy, and desktop grid semantics. Type check, lint, and production build pass.
