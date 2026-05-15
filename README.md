# Family Command Center PWA V4.8.31 — Rules + Service Worker Safety

This version is based on V4.8.30 and focuses only on safety.

## What changed

### 1. Firestore rules hardening

The included `firestore.rules` keeps the V4.8.27 manual-save protection and adds extra hardening:

- only `families/{familyId}/state/main` can be written
- writes require `writeMethod == "manual-save-mode"`
- writes require `updatedBy == request.auth.uid`
- writes require `updatedByEmail == request.auth.token.email`
- only expected top-level state fields are allowed
- `/users/{uid}` writes remain blocked
- member updates are restricted to family managers
- family `createdBy` cannot be changed
- arbitrary `state/{docId}` documents are blocked

### 2. Service worker safety

The service worker is updated to reduce risk from old cached app versions:

- new cache name: `family-command-center-v4-8-31`
- deletes old caches on activation
- calls `skipWaiting()` and `clients.claim()`
- uses network-first for navigation and HTML
- never caches Firebase / Google API calls
- uses stale-while-revalidate for static files

### 3. Stable manifest description

The manifest description is no longer a changelog. It now describes the app.

## Still included

- Phase 1 quota-burn fix from V4.8.30
- Manual cloud save mode
- Global Manual Save Bar
- No automatic cloud save
- No background write retry loops
- Payments / School labels

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-31
```

## Important setup step

Publish the included `firestore.rules`:

```text
Firebase Console → Firestore Database → Rules → paste firestore.rules → Publish
```

Publishing rules does not consume Firestore document write quota.
