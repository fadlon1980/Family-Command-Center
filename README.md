# Family Command Center PWA V4.8.21 — Smarter Quick Capture Parser

This version is based on the stable V4.8.20 rollback baseline and changes only the quick-capture logic.

## Main improvement

The Quick Capture line now understands requests that should create more than one item.

Example:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

Creates:

- Payment: Hebrew lesson, $260, due 15 May, Kids category
- Calendar event: Payment due reminder on 15 May for Daniel

## Other examples

```text
Pay soccer fee $120 by Monday for Maya
Daniel science exam next Friday
Maya math homework due tomorrow
Daniel Hebrew lesson Tuesday 5pm
```

## Important

This is a local rule-based parser, not an external AI service. It does not send family data to any AI API.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-21
```

No Firestore rules change is required if V4.8.20 or V4.8.15 rules are already published.
