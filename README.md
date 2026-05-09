# Family Command Center PWA V4.8.16 — Fast Sync & Anti-Hang Fix

This version addresses slow/hanging behavior when pressing **Sync now**.

## What changed

- Sync now runs only one sync at a time.
- Sync now disables itself while syncing.
- Firestore save has a 10-second timeout.
- Background sync watchdog is relaxed from 15 seconds to 60 seconds.
- Local changes are batched for 2.5 seconds before saving.
- The app avoids full re-render loops when the Firestore snapshot is unchanged.
- Pull latest now has a visible busy state.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-16
```

No Firestore rules change is required if V4.8.15 rules are already published.
