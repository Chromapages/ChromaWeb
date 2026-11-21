# API Spec

## Current implemented intake contract

`POST /api/intake` is the public Contact form endpoint. Send JSON with `name`,
`email`, `requestType` (`prospect`, `client`, or `question`), and `message`.
`company`, `projectType`, `budgetRange`, and an empty `honeypot` are optional.
The form constrains project and budget choices. The message must contain at
least 10 characters after trimming for validation; the original text is stored.

| HTTP | Response or meaning |
|---|---|
| `200` | `{ "success": true, "message": "Request received successfully.", "reference": "REQ-0001" }` |
| `400` | Invalid JSON/fields or filled honeypot. A field validation response may include `errors` keyed by field name, with arrays of messages. |
| `502` | Worker rejection, malformed receipt or network failure. |
| `503` | Missing or invalid server-side Worker configuration. |
| `504` | Worker timeout (10 seconds). |

Success requires Worker `POST /requests` to persist the request in Cloudflare D1
and return `201 { ok: true, id, reference, createdAt }`. The browser receives only
the public receipt; `reference` is not an access credential or a promise of
human review. Upstream diagnostics are not forwarded. A lost acknowledgement can
leave a stored request; there is no automatic retry.

## Admin requests

Both endpoints require a valid admin session cookie; otherwise they return
`401`. Responses are not cacheable.

| Endpoint | Input | `200` response |
|---|---|---|
| `GET /api/admin/requests` | None | `{ success: true, requests: IntakeRequest[] }`, newest first, up to 50. |
| `PATCH /api/admin/requests/[id]` | Request UUID and JSON with `status`, `notes`, or both. Notes may be cleared with an empty string and cannot exceed 5,000 characters. | `{ success: true, request: IntakeRequest }`. |

`IntakeRequest` has string fields `id`, `reference`, `status`, `requestType`,
`name`, `email`, `company`, `projectType`, `budgetRange`, `message`, `notes`,
`createdAt`, and `updatedAt`. Status is `new`, `active`, `in_review`, or `done`.
PATCH returns `400` for invalid input or `404` for an unknown UUID. Both routes
use the same `502`/`503`/`504` Worker error mapping as intake.

## Next.js to Worker

Set server-only `WORKER_URL` to the Worker's HTTPS origin. Next.js sends
`Authorization: Bearer <WORKER_SECRET>`; the value must match the Worker's
`INTAKE_SECRET`. Requests go to `/requests` (POST/GET) or `/requests/:id` (PATCH).
Do not put secrets in URLs or expose them to the browser. See the
[Worker deployment runbook](../workers/intake-worker/DEPLOY.md) and
[repair handoff](repair-handoff.md) for preview and release checks.

## Current CMS revalidation contract

`POST /api/revalidate` requires a JSON `secret` matching the server-only
`REVALIDATE_SECRET`, plus `path`, `paths`, or both (maximum 50 total). It accepts
the core marketing routes and literal lowercase, hyphen-delimited `/services/`
and `/work/` slugs. A valid batch returns `200` with `{ success: true, revalidated }`.
Missing server configuration returns `503`, incorrect credentials return `401`,
and an invalid path batch returns `400` without revalidating any path.

The remaining sections are historical planning notes, not a list of live routes.

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

## Proposed endpoints (not implemented)

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| `/api/booking-event` | POST | Optional booking completion tracking relay | Public or signed |
| `/api/preview/enable` | GET or POST | Enable CMS preview mode | Protected |
| `/api/preview/disable` | GET or POST | Disable CMS preview mode | Protected |
| `/api/health` | GET | Basic health check | Public |
| `/api/webhooks/cms-revalidate` | POST | Revalidate pages after CMS changes | Signed webhook |

Not every endpoint must exist on day one. Only build what is needed.

---

## 1. Intake

See the implemented intake and admin contracts above. The removed contact route
and proposed email/webhook delivery are not part of the current API.

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
Public endpoints can receive private contact data. Validate inputs and do not
expose that data in public responses, logs, or analytics.

Examples:
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

Use the implemented intake contract above for request fields and validation.

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

Keep the API to the implemented surface above until a product need warrants
adding one of the historical proposals.
