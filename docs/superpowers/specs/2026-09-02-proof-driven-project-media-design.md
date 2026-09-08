# Proof-driven project media design

## Goal

Use Chromapages’ Page Stack and Chroma Edge language to present only media that explains a case study’s transformation. Public project media must not use decorative mockups, browser chrome, device piles, or fabricated 3D scenes.

## Scope

This applies to the Work evidence index and full case-study routes. The homepage and its existing Page Stack usage are unchanged.

## Content model

Each case-study image receives these required public fields in addition to the existing rights and editorial approvals:

- `mediaRole`: one of interface crop, before/after comparison, responsive composition, system screen, design-system artifact, code/performance evidence, process diagram, or content structure.
- `storytellingJob`: a concise public statement of what the asset explains or proves.
- `publicDisplayApproved`: explicit confirmation that the asset is approved for this public role and purpose.
- `proofSignalType` (optional): links an asset to one approved case-study proof category when it directly supports that proof.

The validation and public queries include only images with rights confirmed, editorial approval, a valid role, a non-placeholder storytelling job, and public-display approval. Existing images without these fields are withheld rather than inferred or defaulted.

## Visual system

### Work cards

The optional card lead asset renders as a single Page Stack frame. The actual image remains a real, tightly cropped project artifact. Page Stack layers supply depth; a contained Chroma Edge supplies registration detail. Neither treatment invents an interface or changes the evidence represented by the asset.

The frame presents the asset’s role and storytelling job in the visible card content. If a published project has no qualifying lead asset, the card remains complete without a visual filler.

### Full case studies

The case study presents proof hierarchy immediately after the hero. Approved media follows in purpose-led groups, ordered by the linked proof category where present. An unlinked asset can appear only as supporting narrative material after the associated scope, challenge, strategy, design, or development section.

Each media group contains real artifacts only, a role label, the storytelling job, and the existing descriptive caption when supplied. The Page Stack frame is reserved for a primary visual; secondary media stays in a simple responsive grid with Chroma Edge only when it clarifies grouping, never as replacement content.

## Accessibility and performance

- Meaningful media retains descriptive alternative text; decorative Page Stack and Chroma Edge layers are `aria-hidden`.
- Role labels and storytelling jobs remain visible text, so the intended significance is available without seeing the image.
- Images continue through `next/image`, preserve explicit dimensions, and use responsive `sizes` values.
- The frame adds no interactive controls or keyboard stops.

## Validation and safety

Published-ready case studies require at least one public-safe, approved proof signal, but do not require media. A media asset becomes public only when all public display checks pass. This permits text-first case studies when no appropriate artifact is approved and prevents incomplete media records from producing a conventional portfolio wall.

## Testing

Tests cover public media filtering, withheld legacy assets, valid role/job rendering, a no-media Work card, and proof-led ordering on full case studies. Type check, lint, and the production build must pass.
