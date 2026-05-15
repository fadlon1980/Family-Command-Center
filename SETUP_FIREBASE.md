# V4.8.31 Setup Notes

## Step 1 — Upload to GitHub

Upload all files to GitHub Pages.

## Step 2 — Publish Firestore rules

This version includes updated safety rules.

Go to:

```text
Firebase Console → Firestore Database → Rules
```

Paste the full content of:

```text
firestore.rules
```

Click:

```text
Publish
```

## Step 3 — Open the app

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-31
```

Use hard refresh once:

```text
Ctrl + Shift + R
```

## Step 4 — Verify no write loop

1. Open the app.
2. Do not click Save to cloud.
3. Leave it idle for 5–10 minutes.
4. Check Firebase Usage.
5. Writes should not keep increasing.

## Step 5 — After quota resets, test one manual save

1. Pull latest.
2. Add one small item.
3. Click Save to cloud once.
4. Check `families → FAM-59ATQF5R → state → main`.
5. Confirm `writeMethod = manual-save-mode`.
