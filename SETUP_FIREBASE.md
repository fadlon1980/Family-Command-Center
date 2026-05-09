# V4.8.8 Setup Notes

This version requires a Firestore rules update.

## Step 1 — Upload V4.8.8 files to GitHub Pages

Upload all files from the V4.8.8 package.

## Step 2 — Publish the new Firestore rules

Open Firebase Console:

```text
Firestore Database → Rules
```

Paste the full content from the included file:

```text
firestore.rules
```

Click **Publish**.

## Step 3 — Open the app

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-8
```

## Why this rule update matters

If the owner member record is missing or broken, old rules may block the owner from reading the family space.

V4.8.8 allows the original family creator to reconnect and repair their owner member record.
