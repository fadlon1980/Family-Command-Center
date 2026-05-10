# Family Command Center PWA V4.8.18 — REST Write Fallback

This version targets the issue:

```text
Small cloud write test failed: Small cloud write test timed out.
```

## What this means

The app can read Firestore, but the normal Firestore SDK write channel is hanging or blocked.

Common causes:

- Browser/network/VPN/proxy blocks Firestore WebChannel writes
- Firewall/security software interferes with Firestore SDK write connection
- Firestore SDK write hangs even though REST/fetch may work

## New in V4.8.18

Settings → Cloud sync health includes:

- **Test SDK write**
- **Test REST write**
- **Retry full save**

If the SDK write times out, the app tries Firestore REST fallback.

## How to test

1. Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-18
```

2. Go to Settings → Cloud sync health.
3. Click **Test SDK write**.
4. If it fails, click **Test REST write**.
5. If REST write succeeds, click **Retry full save**.
6. Check Firestore:
   `families → FAM-59ATQF5R → state → main`
7. Ask Maayan to click **Pull latest from cloud**.

## If REST write also fails

This points to Firestore rules/auth/network restrictions. Confirm V4.8.15+ rules are published and test from a different browser or network.
