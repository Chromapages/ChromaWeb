# Sequence process data layer

## Decision

Process steps use a Process-specific typed record rather than the shared `deliveryStep` object. Each record has a stable `id`, explicit `order`, title, description, and `proofPoints`. An optional `industryOverrides` array selects a full replacement for title, description, and proof points by `industrySlug`; the generic record remains the required fallback.

## Rendering and layout

The server normalizes, validates, and orders records before rendering. `SequenceStepGrid` renders only the structured proof-point array. The grid uses count-aware column classes: three columns for three steps; two columns for four or six; and a sensible two-column fallback for five. Each card includes a directional connector except the final card, preserving DOM order without fixed 2×2 divider assumptions.

## Analytics and CTA

A small client component emits `process_sequence_section_view` once with `step_count`. The existing navigation CTA remains a real `Link`; its click emits `process_sequence_cta_click` with only `step_count` and a sanitized CTA identifier. No user-entered or content-copy values are sent.

## Verification

Unit tests cover generic normalization, industry overrides, and three-, four-, and six-step grid configurations. Lint, strict type checking, and a production build remain required.
