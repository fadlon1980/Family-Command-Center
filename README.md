# Family Command Center PWA V4.8.23 — Quick Capture Bucket Choice

This version is based on V4.8.22 and improves Quick Capture when the sentence can fit more than one bucket.

## Problem fixed

Example:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

This can look like:

- Payment, because it says `pay` and `$260`
- Calendar event, because it says `lesson`
- Homework/school item, depending on wording

Before V4.8.23, the app could place it in the wrong bucket.

## New behavior

When Quick Capture detects multiple possible buckets, it asks you to choose:

```text
1. Payment + calendar due-date reminder
2. Calendar event
3. Homework / exam
```

For the Hebrew lesson example, choose:

```text
1
```

The app will create:

- Payment
- Calendar due-date reminder

## Recommended examples

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
Pay soccer fee $120 by Monday for Maya
Daniel Hebrew lesson Tuesday 5pm
Daniel science exam next Friday
Maya math homework due tomorrow
```

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-23
```

No Firestore rules change is required if V4.8.20 rules are already published.
