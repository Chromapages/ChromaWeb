# Phase 7 — SEO and Consent-Gated Analytics Design

## Understanding summary

- Establish `https://chromapages.com` as the canonical site origin.
- Add route metadata, canonical URLs, sitemap, robots rules, Open Graph, and X metadata.
- Integrate Google Analytics 4 only after explicit visitor consent.
- Provide accessible accept, reject, and privacy-settings controls.
- Track only approved, PRD-aligned engagement events without personal information.
- Keep metadata and analytics failures from affecting site content or navigation.
- Exclude advertising pixels, remarketing, profiling, fabricated SEO copy, and disabled-form completion tracking.

## Assumptions

- GA4 is configured through `NEXT_PUBLIC_GA_MEASUREMENT_ID` and remains inactive when the value is absent.
- Consent defaults to denied and is stored as a first-party browser preference.
- Rejecting analytics makes no request to Google.
- Initial traffic does not require Tag Manager, a data warehouse, server-side tagging, or a custom analytics service.
- Content editors own route metadata; Chromapages owns GA4 account configuration and retention settings.
- Approved social imagery is optional; routes without it emit no social image.

## Analytics design

A global client-side consent component presents equal accept and reject actions when no preference exists. It loads and initializes GA4 only after acceptance. Automatic page views are disabled; a route-aware tracker sends controlled page views after navigation. A typed event layer accepts only known event names and stable identifier fields. It rejects visitor-entered values, arbitrary free text, email addresses, names, and query strings.

Approved events:

- `page_view`
- `cta_click`
- `offer_view`
- `case_study_view`
- `industry_view`
- `insight_view`
- `project_fit_view`

`project_fit_start` and `project_fit_complete` remain deferred until the form is enabled.

A persistent privacy-settings control allows preference changes. Revoking consent prevents future dispatch and removes locally accessible GA cookies; it cannot retract previously transmitted events.

## SEO design

The root layout defines the production metadata base and safe defaults. Shareable routes derive title, description, canonical URL, Open Graph fields, and X fields from the same canonical record used for visible content. Approved route imagery is reused when available; otherwise inherited image metadata is explicitly omitted.

`sitemap.ts` includes fixed public routes plus published offers, industries, insights, and complete classified case studies. `robots.ts` permits public marketing routes and excludes `/studio`. Placeholder, incomplete, and unpublished records are not discoverable through metadata routes.

## Validation

- Verify representative visible content and metadata match.
- Verify canonical and social URLs are absolute.
- Verify sitemap and robots exclusions.
- Verify no GA script or event occurs before consent.
- Verify missing measurement-ID behavior and event payload allow-listing.
- Run lint and production build.

## Decision log

| Decision | Alternatives considered | Reason |
| --- | --- | --- |
| Direct consent-gated GA4 | Google Tag Manager; server-side proxy | Smallest and clearest consent boundary. |
| Default denied | Load immediately; implied consent | Matches explicit-consent requirement. |
| Controlled page views | GA automatic history tracking | Keeps dispatch behind the application consent layer. |
| Identifier-only payloads | CMS copy and form values | Minimizes privacy and reporting risk. |
| Route metadata from canonical records | Hardcoded duplicates | Prevents visible content and metadata drift. |
| Omit unavailable social images | Generic or invented art | Preserves accuracy and proof policy. |

## Risks and deferred decisions

- The GA4 measurement ID has not been supplied.
- Final social imagery and approved metadata copy are not available.
- Legal review, GA retention settings, and production traffic verification remain operational work.
- Project Fit conversion measurement waits until submission is implemented.
