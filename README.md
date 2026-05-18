# Family Command Center PWA V4.8.36 — Restore Edit Buttons

This version is based on V4.8.35 and restores Edit buttons and edit handlers.

## What was fixed

V4.8.35 had the parser fixes, but the Edit buttons were not active in the visible item lists.

V4.8.36 adds Edit buttons for:

- Tasks
- Calendar events
- Payments
- School items
- Shopping
- Prep items
- Decisions
- Admin items

## Payment edit behavior

Payments can now edit:

- Payment name
- Amount
- Due date
- Category
- Owner / child
- Frequency
- Payment method
- Status
- Paid date
- Notes

When editing a payment, the app asks if linked calendar reminders should be updated too.

## Still included

- V4.8.35 active Quick Capture parser fix
- V4.8.34 parser hardening
- V4.8.33 mobile save bar fix
- V4.8.32 code cleanup
- V4.8.31 rules and service worker safety
- V4.8.30 quota-burn fix
- Manual save mode
- Global Manual Save Bar
- No automatic cloud save

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-36
```

No Firestore rules change is required if V4.8.31 rules are already published.
