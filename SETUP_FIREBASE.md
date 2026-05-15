# V4.8.25 Setup Notes

No Firestore rules change is required.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-25
```

## Test

1. Create payment:
   Pay for Hebrew lesson $260 by 15 May for Daniel

2. Edit amount to 270.

3. Refresh immediately.

Expected:
- Amount remains 270.
- App shows a warning if local edit is still waiting to save.
- Cloud save completes after reconnect.
