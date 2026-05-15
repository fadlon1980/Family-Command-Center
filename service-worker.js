# Family Command Center PWA V4.8.30 — Phase 1 Quota Burn Fix

This version is based on V4.8.29 and applies Phase 1 from the external review report.

## Phase 1 fixes included

### Issue 1.1 — autoAssignCurrentUserRole write loop

Fixed:

- Skip writing if role and childName already match.
- Remove `roleAutoAssignedAt: serverTimestamp()`.
- Keep owner/admin downgrade protection.

Why:

`serverTimestamp()` changes every write, which can retrigger the members `onSnapshot` listener and create a write loop.

### Issue 1.2 — applyRoleRulesToAllMembers unnecessary writes

Fixed:

- Skip members whose role and childName already match.
- Remove `roleAutoAssignedAt: serverTimestamp()`.
- Show how many member records were actually updated.

## Still included from V4.8.29

- Manual cloud save mode
- Global Manual Save Bar
- No automatic cloud save
- Payments / School labels
- No presence heartbeat writes
- Profile mapping writes disabled on login

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-30
```

## Firestore rules

No Firestore rules change is required if V4.8.27 safe manual-save rules are already published.

## Safe test

1. Open the app.
2. Do not click Save to cloud yet if quota is still exceeded.
3. Watch Firebase usage for 5–10 minutes.
4. Confirm writes do not keep increasing while the app is idle.
5. After quota resets, test one manual save only.
