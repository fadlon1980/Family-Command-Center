# Family Command Center PWA V4.8.17 — Cloud Write Test & Save Retry

This version helps diagnose why changes stay local and do not reach Firestore.

## Problem this version targets

Sync health may show:

```text
no save from this device yet
last sync took 10005 ms
local changes waiting to save
```

That means the app can read cloud data but the write to Firestore is timing out.

## New buttons

Settings → Cloud sync health now includes:

- **Test cloud write**
- **Retry full save**

## How to use

1. Add or edit an item.
2. Go to Settings → Cloud sync health.
3. Click **Test cloud write**.

If test cloud write fails:
- the problem is Firestore rules, internet, or auth.

If test cloud write succeeds:
- this device can write to Firestore.
- click **Retry full save**.
- if full save still fails, the shared `state/main` document may be too large/slow and the next architecture step should split data into separate Firestore documents.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-17
```

No Firestore rules change is required if V4.8.15 rules are already published.
