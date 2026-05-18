# Family Command Center PWA V4.8.32 — Code Cleanup / Remove Duplicate Listeners

This version is based on V4.8.31 and focuses only on cleanup. It does not change the Firestore data model, manual save rules, or sync behavior.

## What changed

### Removed duplicate / dead listeners

- Removed dead original Quick Capture submit handler.
- Kept the active V4.8 smart Quick Capture handler.
- Removed standalone auth/calendar backup delegation calls.
- Removed duplicate cloud recovery / diagnostics wiring outside the load handler.
- Removed early standalone `render()` call.
- Removed keyword-specific `unhandledrejection` listeners.
- Kept the generic diagnostic `unhandledrejection` listener.

### Added wiring guards

Added idempotent guards to key wiring functions so if a function is accidentally called twice, it will not attach duplicate click handlers.

### Fixed reset behavior under manual save mode

`resetSharedFamilyData()` now calls `manualSaveLocalChangesToCloud()` instead of the disabled automatic `saveCloudNow()` path.

## Still included

- V4.8.31 Firestore rules safety
- V4.8.31 service worker safety
- V4.8.30 Phase 1 quota-burn fix
- Manual cloud save mode
- Global Manual Save Bar
- No automatic cloud save
- Payments / School labels

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-32
```

## Firestore rules

No Firestore rules change is required if V4.8.31 rules are already published.
