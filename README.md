# Family Command Center PWA V4.8.27 — Manual Save Mode / No Auto Write Loop

This version is based on the stable rollback baseline and is designed to stop Firestore write loops.

## Why this version exists

Your Firebase project hit the no-cost limits and Firestore returned:

```text
REST save failed 429: Quota exceeded
```

So V4.8.27 disables all automatic write behavior that can loop.

## What changed

### Disabled automatic writes

- No automatic cloud save from `saveState()`
- No automatic retry of pending local changes
- No optional owner/member repair write on login
- No user profile/family mapping write on login
- No presence heartbeat write

### Added manual controls

Settings now includes:

```text
Manual cloud save mode
```

Buttons:

- **Save local changes to cloud**
- **Pull latest from cloud**
- **Clear pending local flag**

## Daily safe usage

Use this order while troubleshooting:

1. Open app.
2. Pull latest from cloud.
3. Make changes.
4. Click Save local changes to cloud once.
5. Check Firestore.
6. On another device, Pull latest from cloud.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-27
```

## Important

If Firebase quota is already exceeded, manual save may still fail until quota resets or the project is upgraded. This version prevents the app from automatically burning more writes.
