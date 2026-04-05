# API Spec

## Purpose
This document defines the expected API surface for the Chromapages marketing website.

Because this is a marketing site, the API layer should stay intentionally small. The goal is not to invent a large backend. The API should only support the features the site actually needs: lead capture, optional booking tracking, content preview helpers if needed, and future lightweight integrations.

---

## API Philosophy

### Keep The Surface Area Small
This website does not require a large application backend.

Use APIs only for:
- contact form submission
- optional lead qualification routing
- webhook forwarding
- spam protection
- preview mode support if needed
- lightweight analytics helper endpoints only if necessary

### Default Rule
If a feature can be handled cleanly by:
- the frontend,
- the CMS,
- or a trusted external tool,

do not create a custom API for it.

---

## Base Path

If using Next.js route handlers or API routes, the API base path should be:

```txt
/api
```

---

## Endpoint Summary

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| `/api/contact` | POST | Submit lead/contact form | Public |
| `/api/booking-event` | POST | Optional booking completion tracking relay | Public or signed |
| `/api/preview/enable` | GET or POST | Enable CMS preview mode | Protected |
| `/api/preview/disable` | GET or POST | Disable CMS preview mode | Protected |
| `/api/health` | GET | Basic health check | Public |
| `/api/webhooks/cms-revalidate` | POST | Revalidate pages after CMS changes | Signed webhook |

Not every endpoint must exist on day one. Only build what is needed.

---

## 1. Contact Form Submission

### Endpoint
```txt
POST /api/contact
```

### Purpose
Accept a lead form submission from the website and process it for:
- validation
- spam prevention
- email notification or webhook forwarding
- CRM intake later if needed
- analytics consistency

### Authentication
Public endpoint

### Required Protections
- server-side validation
- spam protection
- rate limiting or abuse prevention if traffic warrants it
- honeypot and/or token-based bot checks

### Request Body Example
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Acme Services",
  "website": "https://acmeservices.com",
  "projectType": "Marketing Website",
  "budgetRange": "$5k-$10k",
  "timeline": "Within 30 days",
  "message": "We need a stronger lead generation site."
}
```

### Request Schema
| Field | Type | Required | Notes |
|---|---|---:|---|
| `name` | string | Yes | Full name |
| `email` | string | Yes | Valid email required |
| `company` | string | No | Business name |
| `website` | string | No | Existing website URL |
| `projectType` | string | Yes | Selected service/project type |
| `budgetRange` | string | No | Qualification field |
| `timeline` | string | No | Qualification field |
| `message` | string | Yes | Freeform project details |
| `honeypot` | string | No | Must remain empty if used |
| `source` | string | No | Attribution source if passed |

### Success Response Example
```json
{
  "success": true,
  "message": "Inquiry received successfully."
}
```

### Error Response Example
```json
{
  "success": false,
  "message": "Invalid form submission.",
  "errors": {
    "email": "A valid email is required."
  }
}
```

### Response Codes
| Code | Meaning |
|---:|---|
| `200` | Submission accepted |
| `400` | Validation failure |
| `429` | Rate limited |
| `500` | Internal processing error |

---

## 2. Booking Event Relay

### Endpoint
```txt
POST /api/booking-event
```

### Purpose
Optional endpoint used to capture booking completion or relay a booking event from a scheduler/webhook into:
- analytics
- CRM
- internal notifications

### Authentication
Public if only receiving minimal safe event data, or signed if integrating via webhook

### Request Body Example
```json
{
  "eventType": "booking_complete",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "scheduler": "calendly",
  "scheduledAt": "2026-04-03T15:00:00Z",
  "sourcePage": "/contact"
}
```

### Success Response
```json
{
  "success": true
}
```

### Notes
This endpoint is optional. If the scheduler already provides clean analytics integration, do not duplicate complexity.

---

## 3. Preview Enable

### Endpoint
```txt
GET /api/preview/enable
```

or

```txt
POST /api/preview/enable
```

### Purpose
Enable preview mode for unpublished CMS content.

### Authentication
Protected

### Recommended Protection
- secret token in query or request body
- optional slug validation
- optional role restriction at CMS layer

### Example Query
```txt
/api/preview/enable?secret=PREVIEW_SECRET&slug=/work/example-project
```

### Success Behavior
- sets preview/draft mode
- redirects user to target page

### Failure Response
```json
{
  "success": false,
  "message": "Invalid preview token."
}
```

---

## 4. Preview Disable

### Endpoint
```txt
GET /api/preview/disable
```

or

```txt
POST /api/preview/disable
```

### Purpose
Disable preview mode and return user to normal browsing state.

### Authentication
Protected or session-based

### Success Behavior
- clears preview mode
- redirects user to homepage or requested page

---

## 5. Health Check

### Endpoint
```txt
GET /api/health
```

### Purpose
Simple endpoint to confirm the app is reachable and server logic is healthy.

### Response Example
```json
{
  "status": "ok"
}
```

### Notes
Useful for uptime checks or deployment verification. Optional for small launches.

---

## 6. CMS Revalidation Webhook

### Endpoint
```txt
POST /api/webhooks/cms-revalidate
```

### Purpose
Receive signed webhooks from the CMS and trigger page or path revalidation.

### Authentication
Signed webhook secret required

### Request Body Example
```json
{
  "type": "caseStudy",
  "slug": "client-redesign",
  "paths": [
    "/work/client-redesign",
    "/work"
  ]
}
```

### Success Response
```json
{
  "revalidated": true,
  "paths": [
    "/work/client-redesign",
    "/work"
  ]
}
```

### Failure Response
```json
{
  "revalidated": false,
  "message": "Invalid signature."
}
```

---

## Auth Methods

## Public Endpoints
Used only when the endpoint receives low-risk form or event data.

Examples:
- `/api/contact`
- `/api/booking-event`
- `/api/health`

### Protection Strategy
Public does not mean unprotected. Use:
- validation
- spam prevention
- rate limiting when needed
- input sanitization

## Protected Endpoints
Used for internal or CMS-controlled actions.

Examples:
- preview endpoints
- revalidation webhooks

### Protection Methods
- shared secret token
- signed webhook signature
- server-only environment variable checks

---

## Shared Validation Rules

### Contact Form Validation
- `name` must not be empty
- `email` must be valid
- `projectType` should match an allowed set if select-based
- `message` must meet minimum length
- optional fields should be trimmed and sanitized

### URL Validation
- if `website` is provided, it must parse as a valid URL or be normalized safely

### Payload Limits
- reject unusually large payloads
- keep marketing-site forms lightweight

---

## Standard Response Shape

### Success Shape
```json
{
  "success": true,
  "message": "Human-readable status message"
}
```

### Error Shape
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {}
}
```

Use consistent response patterns to simplify frontend handling.

---

## Integration Notes

### Likely Downstream Integrations
- email notifications
- CRM or lead sheet intake
- Zapier or webhook automation
- analytics platforms
- scheduler webhooks

### Recommendation
Keep integration logic isolated in small service utilities rather than embedding everything directly inside route handlers.

---

## Final Recommendation

For launch, the only endpoint that is definitely required is:

- `POST /api/contact`

The rest should be added only when the project actually needs them. This is a marketing website, not a SaaS product. Document only the API surface that creates real value.
