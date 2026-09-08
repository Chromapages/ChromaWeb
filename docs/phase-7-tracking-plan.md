# Phase 7 analytics tracking plan

GA4 is loaded directly with `gtag.js` only after explicit analytics consent. Event payloads must never contain form values, email addresses, names, query strings, or other user-entered data.

| Event | Trigger | Parameters | Status |
| --- | --- | --- | --- |
| `page_view` | Consented route view | `page_location`, `page_path` | Implemented |
| `cta_click` | Consented click on an explicitly marked primary CTA | `cta_location`, `destination` | Implemented |
| `offer_view` | Consented service-detail route view | `offer_slug` | Implemented |
| `case_study_view` | Consented case-study route view | `case_study_slug` | Implemented |
| `industry_view` | Consented industry-detail route view | `industry_slug` | Implemented |
| `insight_view` | Consented insight-detail route view | `insight_slug` | Implemented |
| `project_fit_view` | Consented contact route view | `page_path` | Implemented |
| `project_fit_start` | First meaningful interaction with the future live form | No form values; implementation parameters to be approved | Deferred until form wiring |
| `project_fit_complete` | Confirmed successful future form submission | No form values; implementation parameters to be approved | Deferred until form wiring |

The GA4 measurement ID is supplied through `NEXT_PUBLIC_GA_MEASUREMENT_ID`. When it is absent, consent controls remain available but no analytics script is requested.
