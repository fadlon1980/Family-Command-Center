# V4.8.30 Setup Notes

No Firestore rules change is required if the V4.8.27 safe manual-save rules are already published.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-30
```

## Test Phase 1

1. Open app and sign in.
2. Keep app idle for 5 minutes.
3. Check Firebase usage.
4. Writes should not continue increasing.
5. If you click Re-apply role rules and roles already match, the app should say no writes were needed.
