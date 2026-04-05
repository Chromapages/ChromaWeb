# Forms And Leads

## Purpose
This document defines how forms, lead routing, notifications, spam protection, and post-submission handling should work for the Chromapages marketing website.

This is the operational spec for lead capture.

---

## 1. Lead Capture Goals

The form system should:
- make it easy for qualified leads to reach out
- collect enough data to qualify inquiries
- avoid unnecessary friction
- prevent spam and junk submissions
- route submissions reliably
- support analytics and future CRM integration

---

## 2. Primary Lead Capture Paths

### Main Paths
1. Contact form submission
2. Booking link / scheduler
3. Optional phone or email click

### Primary Business Goal
Drive discovery calls and qualified inquiries.

---

## 3. Contact Form Spec

## Required Fields
- Name
- Email
- Project Type
- Message

## Optional Qualification Fields
- Company
- Website
- Budget Range
- Timeline

### Field Notes
- keep the form short enough to complete easily
- use optional qualification fields to improve lead quality without overloading the user
- do not ask for information that will not be used

---

## 4. Field Definitions

| Field | Required | Purpose | Notes |
|---|---:|---|---|
| Name | Yes | identify lead | full name |
| Email | Yes | response contact | valid email |
| Company | No | business context | |
| Website | No | review current site | URL if provided |
| Project Type | Yes | qualify inquiry | select or controlled input |
| Budget Range | No | fit signal | structured options preferred |
| Timeline | No | urgency/fit signal | structured options preferred |
| Message | Yes | project details | freeform |
| Honeypot | No | spam prevention | hidden, must stay empty |

---

## 5. Form Behavior

### On Success
- show clear success message or thank-you redirect
- confirm inquiry was received
- explain next steps
- optionally offer a booking path if not already booked

### On Error
- show clear validation messages
- preserve entered values where possible
- do not clear the full form unnecessarily
- explain what needs to be fixed

### Analytics
Track:
- form_start
- form_submit
- page_path
- project type if safe

---

## 6. Project Type Options

Suggested options:
- Marketing Website
- Landing Page
- E-Commerce
- Web App / MVP
- Ongoing Support
- Not Sure Yet

### Recommendation
Use a controlled list, not fully open text, for cleaner qualification and analytics.

---

## 7. Budget Range Options

Suggested options:
- Under $2,500
- $2,500–$5,000
- $5,000–$10,000
- $10,000+
- Not Sure Yet

### Note
These are just placeholders. Final options should match actual offer strategy.

---

## 8. Timeline Options

Suggested options:
- ASAP
- Within 30 Days
- 1–3 Months
- 3+ Months
- Just Exploring

---

## 9. Lead Routing

## Primary Destination
- owner email notification and/or workflow inbox

## Optional Secondary Destinations
- webhook automation
- CRM intake
- spreadsheet/log
- Slack or internal alerting

### Recommendation
For launch, keep routing simple and reliable:
1. notification email
2. optional webhook logging

Do not overbuild lead ops before volume justifies it.

---

## 10. Notification Rules

### On New Lead
Send notification containing:
- name
- email
- company
- project type
- budget range
- timeline
- message
- source page if available

### Notification Destination
- primary owner inbox
- optional backup destination

### Response Expectation
Set an internal target response time and mirror that expectation lightly in form success messaging.

---

## 11. Spam Protection

### Required
At minimum, implement:
- honeypot
- server-side validation

### Recommended
Depending on spam volume:
- rate limiting
- lightweight bot checks
- CAPTCHA only if needed

### Rule
Do not add heavy friction before it becomes necessary.

---

## 12. Lead Qualification Principles

The form should help identify:
- service fit
- budget fit
- urgency
- seriousness of inquiry

### But Avoid
- making the form feel like an interrogation
- requiring too many fields
- asking for sensitive details unnecessarily

---

## 13. Thank-You Behavior

### Options
- inline success state
- dedicated thank-you page

### Required Success Content
- confirmation
- what happens next
- optional booking prompt
- optional link back to Work or Home

---

## 14. Scheduler / Booking Notes

### Booking Path
If the primary CTA routes to booking:
- scheduler should be easy to access
- booking_click should be tracked
- booking_complete should be tracked if possible

### Recommendation
Forms and booking can coexist:
- booking for ready-now leads
- form for people who need to explain more context

---

## 15. Future CRM Considerations

When volume grows, the lead system may need:
- CRM sync
- lead status tracking
- automated follow-up
- source attribution storage
- qualification routing rules

Do not build this on day one unless clearly needed.

---

## 16. Recommendation

For launch, the lead capture system only needs to be:
- clear
- low-friction
- spam-resistant
- reliable
- measurable

That alone will outperform a more complicated system that breaks or gets ignored.
