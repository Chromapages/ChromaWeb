# Editorial section migration

## Decision

The empty left rail is removed. Every editorial section uses one full-width header: eyebrow and decorative rule, heading, optional body, then optional content. This is the existing Process Sequence composition and becomes the sitewide editorial baseline.

## Scope

`EditorialSection` becomes single-column by default and no longer exposes the split layout. Process Context, About, Insight, and Industry sections migrate automatically. Offer and Case Study local wrappers reuse it. The dormant homepage section primitive is rewritten to the same header order. The Case Study related-services block becomes a full-width list rather than retaining an empty rail.

## Constraints

No new supporting content is invented. Existing copy, section order, tones, and section boundaries remain unchanged. Decorative rules are aria-hidden.

## Verification

Inspect the shared component and migrated wrappers to confirm there are no remaining `0.7fr / 1.3fr` grids. Test and build the site. The shared desktop layout has one content start line at 1024px, 1280px, 1440px, and 1920px.
