# V4.8.37 Setup Notes

No Firestore rules change is required if V4.8.31 rules are already published.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-37
```

Use hard refresh once:

```text
Ctrl + Shift + R
```

## Basic QC

1. Click Pull latest.
2. Make one local change.
3. Click Save to cloud.
4. Confirm save succeeds.
5. Run diagnostics and confirm it shows a last known cloud version.

## Conflict QC with two devices

1. Device A: Pull latest.
2. Device B: Pull latest.
3. Device A: Add item A, Save to cloud.
4. Device B: Add item B, click Save to cloud.

Expected:
- Device B should show a conflict warning.
- Cancel should stop the save.
- Pull latest should load item A.
