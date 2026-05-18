# V4.8.32 Setup Notes

No Firestore rules change is required if V4.8.31 rules are already published.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-32
```

Use hard refresh once:

```text
Ctrl + Shift + R
```

## Test

1. Confirm app version is 4.8.32 in diagnostics.
2. Leave app idle for 5 minutes, writes should stay flat.
3. Click each main button once and confirm it only runs once:
   - Pull latest
   - Save to cloud
   - Run diagnostics
   - Quick Capture
4. Create one item, confirm pending local changes appears.
5. Save to cloud once, confirm one state/main update.
6. Refresh, confirm data remains.
