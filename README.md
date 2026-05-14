# Family Command Center PWA V4.8.22 — Edit Items

This version is based on the working V4.8.21 quick-capture baseline and adds lightweight editing.

## New

Most lists now include an **Edit** button:

- Tasks
- Calendar events
- Payments
- Homework / exams
- Shopping
- Prep items
- Decisions
- Admin / school items

## Why this matters

If Quick Capture creates something like:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

you can now edit the generated payment fields:

- payment name
- amount
- due date
- category
- owner / child
- frequency
- method
- status
- paid date
- notes

When editing a payment, the app will ask whether to update matching linked calendar reminders too.

## How editing works in V4.8.22

This is a lightweight first version using browser prompt dialogs. It is intentionally small and stable.

Later we can replace it with a nicer full edit form / modal.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-22
```

No Firestore rules change is required if V4.8.20 rules are already published.
