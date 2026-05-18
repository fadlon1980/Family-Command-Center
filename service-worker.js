# Family Command Center PWA V4.8.34 — Parser Hardening / Quick Capture Fixes

This version is based on V4.8.33 and implements Phase 3 parser hardening.

## What changed

### Better date parsing

Quick Capture now supports:

- `15 May`
- `May 15`
- `15th of May`
- `May 15th`
- `2026-05-15`
- `5/15`
- `tomorrow`
- `today`
- weekdays like `Friday`

### Safer time parsing

The app no longer treats random numbers as times.

Examples that should **not** become a time:

- `$260`
- `Kid 2`
- `Buy 5 bags`

Examples that should become a time:

- `3pm`
- `3:30pm`
- `10:00`

### Better amount parsing

The app now prefers currency/amount signals such as:

- `$260`
- `260 dollars`
- `260 USD`
- `tuition 260`

This avoids reading the `15` in `15 May` as the payment amount.

### Ambiguous Quick Capture asks

When a prompt can fit more than one bucket, the app asks you to choose.

Example:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

Possible choices include:

- Payment + calendar due-date reminder
- Calendar event

### Payment creates calendar reminder

A future unpaid payment creates:

- one payment
- one calendar due-date reminder

Paid items do not create future reminders.

## Still included

- V4.8.33 mobile save bar fix
- V4.8.32 code cleanup
- V4.8.31 Firestore rules safety
- V4.8.30 quota-burn fix
- Manual save mode
- Global Manual Save Bar
- No automatic cloud save

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-34
```

No Firestore rules change is required if V4.8.31 rules are already published.
