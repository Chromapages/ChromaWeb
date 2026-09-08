# Work Evidence Index design

## Goal

Make `/work` a buyer-confidence system that publishes only complete, classified case studies. It must never present empty CMS state, fabricated project slots, or internal publishing workflow as public portfolio content.

## Chosen approach

The existing Sanity `completeCaseStudyFilter` remains the publication authority. The Work page consumes the fetch status as well as the returned records and renders one of three intentional public states:

1. **Published index** — one or more eligible records. The page describes the index, reports the computed published-record count, and presents cards with the approved classification, project identity, description, evidence summary, disclosure context, image, and a working case-study route.
2. **No published records** — the CMS is reachable but no record passes the readiness filter. The page explains the evidence standard without fake cards, CMS references, placeholder labels, or invented client work.
3. **Temporarily unavailable** — CMS configuration or retrieval is unavailable. The page gives a neutral public message without exposing technical state.

States 2 and 3 use `noindex, follow`; the evidence index becomes indexable only when it contains at least one eligible public record. Case-study detail pages, sitemap entries, and static route generation continue to use the same strict filter.

## Information architecture

- **Hero:** `Evidence Index`, a concise explanation of the published-record standard, and a summary card showing the computed record count and transparency requirements.
- **Index cards:** the page never invents a result. It displays only schema-backed classification, identity, project summary, optional editorial image, concise evidence statement, and attribution limitations. The card action is the only navigation to the detail route.
- **Standards section:** a public-language explanation of the eligibility bar: classification, project context, evidence limitations, and approved imagery. It does not mention Sanity, CMS queues, developer setup, or unpublished slots.
- **Empty/unavailable pages:** one clear status block and primary contact CTA; no faux portfolio grid.

## Metadata and discoverability

`/work` retains its canonical URL and builds normal social metadata from the site settings when records are present. When no eligible record exists or the source is unavailable, it emits page-level `noindex, follow` to avoid indexing an incomplete proof page. Detail routes and the sitemap remain limited to the same eligible record set.

## Constraints

- No client relationships, results, metrics, testimonials, or project claims are created in code.
- No schema weakening: a record must continue to meet classification, evidence, disclosure, rights, and content requirements before it can render.
- The current production site is not this workspace’s deployment. Releasing these changes and removing its existing unclassified cards / broken route requires deployment authority and verification after release.

## Verification

- Unit tests cover published, empty, and unavailable rendering paths and confirm only schema-backed routes are rendered.
- Type check, lint, tests, and production build pass.
- Browser checks verify the published-state layout only when real records exist, and verify no visible CMS/developer language or placeholder labels in the local empty state.
