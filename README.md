# Family Command Center PWA V4.8.6 — Google Login Reliability Fix

This hotfix addresses the issue where clicking Google sign-in appears to do nothing.

## Fixed in V4.8.6

- Added inline fallback click handler for **Sign in with Google**
- Added delegated backup click handler for Google sign-in
- Added visible status message immediately after clicking sign-in
- Added Firebase browser-local persistence to better remember login
- Added backup handlers for Email/Password sign-in and account creation
- Kept stable local storage keys from V4.8.1

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-6
```

## Expected behavior

When you click **Sign in with Google**, you should immediately see:

```text
Google sign-in button clicked. Opening Google sign-in window...
```

Then the Google popup should open.

## If no popup opens

1. Allow popups for `fadlon1980.github.io`.
2. Test in Chrome or Edge, not inside an in-app browser.
3. Try Incognito once to confirm it is not old PWA cache.
4. Clear site data for `fadlon1980.github.io`.
5. Confirm API key restrictions still allow:
   - `https://fadlon1980.github.io/*`
   - `https://fadlon1980.github.io/Family-Command-Center/*`

No Firestore rules change is required.
