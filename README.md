# Family Command Center PWA V4.8.37 — Manual Save Conflict Detection

This version is based on V4.8.36 and adds conflict detection before manual cloud save.

## Why this matters

The app stores the family state in one shared Firestore document:

```text
families/{familyId}/state/main
```

If two devices both make local changes and both save, the second save can overwrite the first.

## What changed

### Pull latest now stores cloud version

When you click **Pull latest**, the app stores the cloud document's `clientUpdatedAt` value in localStorage.

### Save to cloud checks for conflicts

Before saving, the app reads `state/main` metadata and compares:

- current cloud `clientUpdatedAt`
- this device's last pulled/saved cloud version

If cloud is newer, the app warns:

```text
Someone else may have saved newer cloud changes.
Saving now may overwrite their changes.
```

You can then:

- Cancel and Pull latest first
- Or continue and save anyway

### Successful save updates the local version marker

After a successful save, the app stores the new `clientUpdatedAt` as the last known cloud version.

## Still manual only

This version does not add auto-save.

Still included:

- V4.8.36 Edit buttons
- V4.8.35 active Quick Capture parser fix
- V4.8.33 mobile save bar fix
- V4.8.32 cleanup
- V4.8.31 rules and service worker safety
- V4.8.30 quota-burn fix
- Manual save mode
- Global Manual Save Bar
- No automatic cloud save

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-37
```

No Firestore rules change is required if V4.8.31 rules are already published.
