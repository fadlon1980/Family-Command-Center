# V4.8.27 Setup Notes

No Firestore rules change is required if V4.8.20 or V4.8.15 rules are already published.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-27
```

## Immediate check

1. Open Settings.
2. Confirm you see Manual cloud save mode.
3. Confirm no automatic Firestore write loop starts.
4. Do not click Save local changes to cloud until Firestore quota is available again.

## Safe test after quota resets

1. Pull latest from cloud.
2. Add one small shopping item.
3. Click Save local changes to cloud once.
4. Check Firebase `state/main`.
5. On second device, Pull latest from cloud.
