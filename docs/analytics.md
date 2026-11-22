# Analytics

## Purpose
This document defines the analytics strategy for the Chromapages marketing website, including GA4/GTM event tracking, conversion goals, and implementation guidance.

The goal is to measure how users move through the site, which paths produce qualified intent, and where friction exists. Analytics should support business decisions, not create noise.

---

## 0. Current measurement status and ratified contract — 2026-10-24 (Elliot)

### 0.1 Status (Observed / Unknown)

- **GTM / GA4 are not configured (Observed).** `.env.local` has no `NEXT_PUBLIC_GTM_ID`. `app/layout.tsx` loads the container only when the ID matches `^GTM-[A-Z0-9]+$` and is not the `GTM-XXXX…` placeholder, so the loader and its `<noscript>` iframe are suppressed. **No container ⇒ no GA4 ⇒ no destination receives events.**
- **No production events have been observed as received.** The earlier handoff placeholder `GTM-XXXXXX` is correctly rejected, so it cannot be evidence that a container exists. Do not report traffic, conversions, or receipt until a valid container is installed and once-only delivery is verified in the destination account.
- **Events still push to `window.dataLayer` (Observed).** `lib/analytics/events.ts` creates `window.dataLayer` and pushes regardless of GTM, so events are emitted but unconsumed until a valid container is published.
- **Production GTM container ID, GA4 property, and receipt status: Unknown.**

### 0.2 Ratified event contract (decision — supersedes the snake_case examples below)

The **implemented and tested camelCase contract is canonical**. The `snake_case` parameter names in §5 and §6 below are illustrative only and are **superseded for parameter names**. Evidence for this decision: `components/ui/button.tsx`, `components/forms/request-form.tsx`, `components/sections/faq-accordion.tsx`, and the repository contract tests (`tests/conversion.test.cjs`). The prior repair handoff flagged this as an explicit contract decision; this section resolves it in favor of the shipped code.

Every event is pushed as `{ event: <name>, name: <name>, ...parameters }`. The payload always contains the `event` key GTM triggers on, and also a duplicate `name` key.

**Privacy rule:** never send names, email addresses, company names, freeform messages, admin notes, request IDs, receipt references, or credentials to analytics. The conversion tests check that `form_submit` omits private form fields and the reference. See the [API spec](api-spec.md) for the separate server-side intake and admin contracts.

### 0.3 Event taxonomy — separate the four stages

| Stage | Business meaning | Event | Fires when | Implemented |
|---|---|---|---|---|
| **CTA click** | Intent signal, **not** a conversion | `click_cta` | A tracked `Button`/link with an `analyticsLabel` is clicked | Yes |
| **Accepted inquiry** | The intake Worker stored the request in D1 and Next.js returned a receipt | `form_submit` | Only after `intakeResponseSchema` confirms `{ success: true, reference }` | Yes |
| **Qualified lead** | A human/system judged the inquiry a fit | *(no website event)* | Not a page event — belongs to qualification (Chroma lead scoring / human review) | No — do not fabricate as a web event |
| **Actual booking** | A scheduled call exists | `booking_complete` | A scheduler redirect/webhook confirms a booking | No — **no scheduler is wired** (`site.bookingHref = "/contact"`) |

Keeping these distinct prevents three common reporting errors: counting a CTA click as a lead, counting a stored request as a qualified lead, and counting a click on "Book A Call" (which currently opens the contact page) as a completed booking.

### 0.4 Implemented events (exact contract)

| Event | Exact parameters pushed | Trigger / notes |
|---|---|---|
| `click_cta` | `event`, `name="click_cta"`, `label`, `location`, `destination` (link buttons only), `pagePath`, `pageType` (`"home"` \| `"marketing"`) | Any `Button` with an `analyticsLabel`. A `Button` **without** `analyticsLabel` emits nothing (see §0.5). |
| `form_start` | `event`, `name="form_start"`, `location="request-form"`, `pagePath`, `pageType="request"` | First focus inside the request form; guarded to fire once per mount. |
| `form_submit` | `event`, `name="form_submit"`, `location="request-form"`, `pagePath`, `pageType="request"` | Only after a validated intake receipt. No PII or receipt reference. |
| `faq_expand` | `event`, `name="faq_expand"`, `location="faq"`, `label=<question>` | FAQ item toggled (fires on **open and close**; no `pagePath`/`pageType`). Currently only on `/pricing`. |

### 0.5 Homepage CTA coverage

| Placement | `click_cta` coverage |
|---|---|
| Header | “Send an inquiry” is tracked separately from the desktop header (`header`) and mobile disclosure (`mobile-menu`). |
| Hero | Primary inquiry and secondary Work or Services link (`hero`). |
| Services | “Explore service: …” for each featured service and “View all services” (rendered as “View all 5 services”), all at `homepage-services`. |
| Work | “View all work” and each “View project” (`homepage-work`), only when approved work is shown. |
| Process | “View the process” (`homepage-process`). |
| Closing inquiry | “Send an inquiry” (`homepage-bottom`). |

Routine navigation links and the footer are not tracked as CTAs. This records application event coverage, not receipt by GTM or GA4.

### 0.6 Documented but not implemented

`view_page`, `view_service`, `view_case_study`, `view_pricing`, `booking_click`, `booking_complete`, `phone_click`, `email_click`, `scroll_depth`.

Notes: `view_page` is normally served by GA4 page-view measurement; the other `view_*` events would need explicit page-type wiring. `booking_click`/`booking_complete` cannot fire until a scheduler exists. `phone_click` is impossible today — there are no `tel:` links in the site. The contact "Email us" `mailto:` link is tracked as a generic `click_cta` (label `Email us`), not `email_click`.

### 0.7 Analytics launch checks

| # | Check | Owner | Status |
|---:|---|---|---|
| 1 | Set a valid, real `NEXT_PUBLIC_GTM_ID` in production and publish the container with a GA4 configuration tag. | Builder/Dev + Elliot | Open |
| 2 | Confirm once-only event receipt in GA4 DebugView / Tag Assistant for `click_cta`, `form_start`, `form_submit`. | Elliot | Pending release |
| 3 | Mark `form_submit` (and optionally `booking_click`/`phone_click` once real) as conversions; keep the conversion set tight. | Elliot + Owner | Open |
| 4 | Confirm `form_submit` fires only on confirmed acceptance and carries no PII (test-covered; re-verify in production). | Elliot | Pending release |
| 5 | Decide CTA coverage gaps in §0.5. | Elliot + Owner | Open |
| 6 | Decide the scheduler strategy; only then implement `booking_click`/`booking_complete`. | Owner + Builder/Dev | Open |
| 7 | Establish UTM conventions for paid/email traffic; note the intake schema currently captures no `source`/UTM field (see `docs/api-spec.md` gap). | Elliot + Owner | Open |

### 0.8 Owners

| Role | Owner |
|---|---|
| Measurement strategy & verification | Elliot |
| Approvals / conversion definitions | Owner (Eric Black, Tier 0) |
| Environment + GTM/GA4 + scheduler implementation | Builder-Dev — **Unknown** (not named in inspected sources) |
| Delivery / acceptance source of truth | Intake Worker owner — **Unknown** (per `docs/repair-handoff.md`) |
| Qualification (qualified-lead reporting) | **Unknown** — lives outside the website |

### 0.9 Unresolved dependencies (measurement)

1. **Valid GTM container ID + GA4 property** (Unknown) — nothing is measured without these.
2. **Verified intake delivery** — `form_submit` means the configured Worker returned a confirmed D1 receipt. It does not prove human review or qualification. Preview and production delivery still require separate verification per [repair handoff](repair-handoff.md).
3. **Scheduler decision** — blocks real booking measurement.
4. **Qualification source of truth** — the site intentionally has no "qualified lead" event; CRM/qualification reporting must own it.
5. **Attribution capture** — no UTM/`source` field exists in the intake schema today.

### 0.10 Changes applied in this pass

**No analytics code was changed.** The existing event contract in `lib/analytics/events.ts` and its callers was preserved; this document was updated to ratify and define that contract, mark the `snake_case` examples superseded, and separate CTA clicks, accepted inquiries, qualified leads, and bookings.

---

## 1. Analytics Goals

The analytics setup should help Chromapages answer:

- which channels are driving qualified traffic
- which pages are driving conversion intent
- where users drop off before contacting
- which CTA placements work best
- whether service pages and proof pages are supporting conversion
- whether the website is improving lead generation over time

---

## 2. Recommended Stack

## Baseline Recommendation
- **GA4** for core analytics
- **GTM** for flexible tag/event management
- optional **Meta Pixel** or other ad platform pixels when campaigns are active

### Why GTM
GTM makes it easier to:
- deploy and adjust event tracking
- manage tags without hardcoding every change
- support future ad and conversion tracking
- maintain cleaner frontend event logic

### Implementation Philosophy
Track what matters:
- page engagement
- CTA interaction
- lead intent
- form completion
- booking completion

Do not overload the site with vanity events that create clutter.

---

## 3. Core Conversion Goals

## Primary Conversions
These are the main business outcomes the site should measure.

1. **Discovery Call Booking**
2. **Qualified Contact Form Submission**

## Secondary Conversions
These are supporting indicators of purchase intent.

- click on primary CTA
- click into contact page
- start of contact form
- view of pricing page
- view of service detail page
- view of case study page
- click on booking link
- phone click if phone is displayed
- email click if email is displayed

---

## 4. Event Tracking Plan

## Core Events

| Event Name | Trigger | Category | Priority |
|---|---|---|---:|
| `view_page` | page view | engagement | High |
| `click_cta` | click on tracked CTA | engagement | High |
| `view_service` | service detail page viewed | content | Medium |
| `view_case_study` | case study page viewed | proof | Medium |
| `view_pricing` | pricing page viewed | qualification | High |
| `form_start` | user begins interacting with contact form | lead | High |
| `form_submit` | successful contact form submission | lead | High |
| `booking_click` | click to scheduler | lead | High |
| `booking_complete` | confirmed booking completion event | lead | High |
| `phone_click` | click on tel link | lead | Medium |
| `email_click` | click on mailto link | lead | Low |
| `faq_expand` | FAQ item opened | engagement | Low |
| `scroll_depth` | key scroll thresholds reached | engagement | Low |

---

## 5. Event Definitions

> The camelCase contract in §0.2–§0.4 is canonical. Other parameter names below are illustrative planning examples. Events absent from §0.4 are not implemented.

## `view_page`
### Trigger
Any page view

### Parameters
- `page_path`
- `page_title`
- `page_type`

### Notes
This may be handled by GA4’s built-in page view tracking, but custom parameters should still support page classification where useful.

---

## `click_cta`
### Trigger
User clicks a tracked CTA button or CTA link

### Recommended Parameters
- `cta_label`
- `cta_location`
- `destination_url`
- `page_path`
- `page_type`

### Example
```json
{
  "cta_label": "Book A Call",
  "cta_location": "hero",
  "destination_url": "/contact",
  "page_path": "/",
  "page_type": "home"
}
```

### Why It Matters
This is one of the clearest signals of intent prior to form or booking completion.

---

## `view_service`
### Trigger
User views a service detail page

### Parameters
- `service_name`
- `page_path`

---

## `view_case_study`
### Trigger
User views an individual case study page

### Parameters
- `case_study_slug`
- `industry`
- `page_path`

---

## `view_pricing`
### Trigger
User views the pricing page

### Parameters
- `page_path`

### Why It Matters
Pricing views are often a strong qualification or decision-stage signal.

---

## `form_start`
### Trigger
User interacts with the first field of the contact form

### Parameters
- `form_id`
- `page_path`
- `page_type`

### Why It Matters
Shows intent even when the user does not submit.

---

## `form_submit`
### Trigger
The Contact form receives a validated D1 receipt from `POST /api/intake`.

### Parameters
See the exact `form_submit` payload in §0.4. Do not include the receipt reference
or any submission data.

### Why It Matters
This is a primary conversion event.

---

## `booking_click`
### Trigger
User clicks a booking link or scheduler CTA

### Parameters
- `scheduler_name`
- `cta_location`
- `page_path`

---

## `booking_complete`
### Trigger
Confirmed completed booking event from scheduler redirect or webhook

### Parameters
- `scheduler_name`
- `page_path`
- `source_page`

### Why It Matters
This is one of the highest-value conversion events.

---

## `phone_click`
### Trigger
User clicks a phone number link

### Parameters
- `page_path`
- `location_context`

---

## `faq_expand`
### Trigger
User opens an FAQ item

### Parameters
- `faq_question`
- `page_path`

### Note
This is optional and low priority. Use only if it supports real content optimization decisions.

---

## 6. Suggested GTM Data Layer Structure

Where possible, CTA and conversion interactions should push structured data to the GTM data layer.

### Example CTA Push
```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "click_cta",
  cta_label: "Book A Call",
  cta_location: "hero",
  destination_url: "/contact",
  page_path: "/",
  page_type: "home"
});
```

### Example Form Submit Push
```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "form_submit",
  name: "form_submit",
  location: "request-form",
  pagePath: "/contact",
  pageType: "request"
});
```

---

## 7. Conversion Goals In GA4

## Mark As Conversions
The following GA4 events should be marked as conversions:

- `form_submit`
- `booking_complete`

### Optional Conversion Events
Depending on business priorities, consider also marking:
- `booking_click`
- `phone_click`

### Recommendation
Keep the official conversion set tight. Too many conversion events will dilute reporting clarity.

---

## 8. Funnel Views To Monitor

## Primary Funnel
1. Landing on homepage or service page
2. CTA click
3. Contact page or booking entry
4. Form start or booking click
5. Form submit or booking complete

## Supporting Funnel
1. Homepage
2. Work / case study
3. Pricing or process
4. Contact
5. Conversion

### Why These Funnels Matter
They help identify:
- whether proof is doing its job
- whether pricing creates drop-off
- whether CTA placement is effective
- whether contact flow is too heavy

---

## 9. UTM And Campaign Tracking

### Recommendation
All paid, email, and campaign traffic should use UTMs consistently.

### Minimum UTM Parameters
- `utm_source`
- `utm_medium`
- `utm_campaign`

### Optional
- `utm_content`
- `utm_term`

### Why
This allows the team to evaluate:
- campaign quality
- landing page performance
- lead source effectiveness

---

## 10. Privacy And Data Handling Notes

### Do Not Send
- freeform message body text
- personally sensitive details
- unnecessary PII in custom analytics events

### Safe Principle
Track behavior and structured qualification signals, not private conversation content.

---

## 11. Reporting Priorities

The main reporting questions should be:

- Which pages create the most contact intent?
- Which CTAs produce the best downstream conversions?
- Which services are drawing the most engaged traffic?
- Are users reaching pricing, process, and work before converting?
- What percentage of form starts become submissions?
- Which channels drive the highest-quality conversion behavior?

### Monthly Review Focus
- total sessions
- qualified conversion volume
- top entry pages
- top-performing service pages
- CTA click-through trends
- form completion rate
- booking completion rate

---

## 12. Implementation Notes

### Frontend Recommendations
- standardize CTA tracking through a shared utility
- classify pages with a simple `page_type`
- use GTM dataLayer events consistently
- avoid duplicating events from both direct JS and GTM triggers without control

### QA Checklist
- page views firing correctly
- CTA events fire once per click
- form_start triggers only once per session/form interaction if intended
- form_submit fires only on success
- booking events are validated
- conversions appear in GA4 debug/testing tools

---

## 13. Final Recommendation

For launch, the minimum viable analytics setup is:

- GA4 installed correctly
- GTM configured
- tracked CTA clicks
- tracked form starts
- tracked form submissions
- tracked booking clicks
- booking completion tracking if possible

That is enough to make useful business decisions without drowning the project in analytics overhead.
