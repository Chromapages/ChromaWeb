# Analytics

## Purpose
This document defines the analytics strategy for the Chromapages marketing website, including GA4/GTM event tracking, conversion goals, and implementation guidance.

The goal is to measure how users move through the site, which paths produce qualified intent, and where friction exists. Analytics should support business decisions, not create noise.

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
Successful contact form submission

### Parameters
- `form_id`
- `page_path`
- `project_type`
- `budget_range` if appropriate and privacy-safe
- `timeline` if appropriate and privacy-safe

### Note
Do not send sensitive freeform message content to analytics.

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
  form_id: "contact_form",
  page_path: "/contact",
  page_type: "contact",
  project_type: "Marketing Website"
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
