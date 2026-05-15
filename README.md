# Family Command Center PWA V4.8.26 — Stable REST Cloud Save Only

This version is based on V4.8.25 and changes only the cloud save path.

## Root cause found

Your test showed:

- Item appears locally
- Edit appears locally
- Firestore does **not** contain the new item before refresh
- After refresh, the item disappears

That means the app is editing local state, but the local state is not being written to:

```text
families → FAM-59ATQF5R → state → main
```

Earlier write tests showed the normal Firestore SDK write can time out in this browser/network. V4.8.26 keeps the stable app behavior but saves `state/main` using a direct Firestore REST write.

## What changed

- No SDK write test buttons
- No aggressive sync watchdog
- No REST test panel
- No architecture change
- Only `saveCloudNow()` is changed to REST-save `state/main`
- Pending local edit protection from V4.8.25 is preserved

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-26
```

## Test

1. Create:

```text
Pay for ROOT SAVE TEST $11 by tomorrow for Daniel
```

2. Choose Payment if asked.
3. Edit amount to 12.
4. Wait until the app shows cloud save completed.
5. Check Firebase:

```text
families → FAM-59ATQF5R → state → main → data → payments
```

Expected:

- ROOT SAVE TEST exists in Firestore
- amount is 12
- updatedByEmail is `fadlon1980@gmail.com`
- writeMethod is `stable-rest-save`

No Firestore rules change is required if V4.8.20 or V4.8.15 rules are already published.
