# V4.8.14 Setup Notes

This version should use the updated Firestore rules included in this package.

## Step 1 — Upload files to GitHub

Upload all V4.8.14 files.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-14
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

Click Publish.

## Step 3 — Confirm owner emails

The app hard-codes these as owners:

```text
fadlon1980@gmail.com
fadlonmay@gmail.com
```

Both should be treated as owners in the app.

## Step 4 — If Maayan still shows viewer

From Elad account:

1. Go to Settings → Family members.
2. Set Maayan role to `owner`.
3. Click Sync now.
4. Ask Maayan to refresh or open `?version=4-8-14`.

The app should keep her as owner after that.
