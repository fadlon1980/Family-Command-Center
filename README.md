# Family Command Center PWA V4.8.25 — Protect Local Edits Until Cloud Save

This version fixes the issue where an edit changes immediately in the app, but disappears after refresh.

## Root cause

The edit worked locally, but after refresh the app loaded the older Firestore state and overwrote the local edited copy before the edit was safely saved to cloud.

## Fixed in V4.8.25

- Local edits are marked as pending cloud save.
- Pending status is stored in localStorage.
- If the app refreshes before cloud save completes, it protects the local edited copy.
- Older cloud snapshots are skipped while local edits are pending.
- Once cloud reconnects, pending local edits are pushed back to Firestore.
- Pending flag is cleared after successful cloud save.

## How to test

1. Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-25
```

2. Add a payment using Quick Capture.
3. Edit the amount.
4. Refresh immediately.
5. Confirm the edited amount remains.
6. Check Firestore `families → FAM-59ATQF5R → state → main`.

No Firestore rules change is required if V4.8.20 or V4.8.15 rules are already published.
