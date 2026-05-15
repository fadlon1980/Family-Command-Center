# Family Command Center PWA V4.8.24 — Bucket Choice Fix

This version fixes V4.8.23 where the app did not ask which bucket to use.

## Root cause

The bucket-choice logic existed, but the active V4.8 quick-capture submit handler was still bypassing it.

## Fixed

The active Quick Capture handler now asks when a prompt can fit multiple buckets.

Example:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

Expected prompt:

```text
1. Payment + calendar due-date reminder
2. Calendar event
```

Choose:

```text
1
```

Expected result:

- Payment is created
- Calendar due-date reminder is created

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-24
```

No Firestore rules change is required if V4.8.20 or V4.8.15 rules are already published.
