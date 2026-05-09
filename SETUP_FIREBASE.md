# V4.8.15 Setup Notes

This version requires publishing the included Firestore rules.

## Step 1 — Upload files to GitHub

Upload all files from this package.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-15
```

## Step 2 — Publish Firestore rules

Firebase Console:

```text
Firestore Database → Rules
```

Paste the full content from:

```text
firestore.rules
```

Click **Publish** and wait 1 minute.

## Step 3 — Repair Maayan role

On Maayan device/account:

1. Sign in with `fadlonmay@gmail.com`
2. Go to Settings
3. Click **Repair owner role**
4. Refresh once if needed

Expected:

```text
Maayan role = owner
```
