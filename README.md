# Family Command Center PWA V4.8.35 — Active Quick Capture Parser Fix

This version is based on V4.8.34 and fixes the active Quick Capture handler directly.

## What was fixed

Your QC found:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

Problems in V4.8.34:

- Bucket question did not pop.
- The item went only under Payments.
- Due date became the current date instead of 15 May.

## V4.8.35 changes

- Active Quick Capture submit handler now resolves bucket choice directly.
- If text fits multiple buckets, the bucket prompt is forced.
- `15 May`, `May 15`, `15th of May`, and `May 15th` are preserved as the typed date in the current year.
- Payment name cleaning now preserves `Hebrew lesson`.
- Only the trailing child phrase, such as `for Daniel`, is removed from the payment name.
- Unpaid payments with explicit due dates create calendar reminders, including overdue dates.
- `$260` is not treated as time.

## Test

Use Quick Capture:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

Expected:

- Bucket prompt appears.
- Choose Payment.
- One payment is created.
- One calendar reminder is created.
- Payment name = Hebrew lesson.
- Amount = 260.
- Due date = 15 May.
- No false time from $260.

## Still included

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
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-35
```

No Firestore rules change is required if V4.8.31 rules are already published.
