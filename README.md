# Family Command Center PWA V4.8.20 — Stable Rollback Baseline

This package rolls the app code back to the last stable troubleshooting baseline.

## Why this rollback point

This app code is based on **V4.8.12**:

- V4.8.11 proved that cloud data was readable and `cloud.ready = true`.
- V4.8.12 fixed the Step 3 owner/member repair hang.
- V4.8.13–V4.8.19 added several sync experiments that made the app slower and harder to troubleshoot.

## What is kept from later versions

The included `firestore.rules` keeps the safer V4.8.15 owner-aware rules for:

- `fadlon1980@gmail.com`
- `fadlonmay@gmail.com`

## What is intentionally removed

This rollback avoids the later experimental sync tools:

- aggressive auto reconnect watchdog
- REST-first save path
- SDK/REST write test buttons
- reset sync/testing state
- later sync health changes

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-20
```

## Troubleshooting plan

1. Confirm login works.
2. Confirm family space loads.
3. Run diagnostics.
4. Confirm family document, member record, and shared state are readable.
5. Add one Shopping item.
6. Check if it appears in Firestore `state/main`.
7. Only then test Maayan/device-to-device sync.
