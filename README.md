# Family Command Center PWA V4.8.15 — Fixed Owner Emails Enforced in Firestore Rules

This version fixes the case where Maayan still becomes `viewer`.

## Why V4.8.14 was not enough

V4.8.14 treated Maayan as owner inside the app, but if Firestore already stored her member record as:

```text
role = viewer
```

then old rules could block her from changing her own role to owner.

## Fixed in V4.8.15

Firestore rules now directly recognize these authenticated Google emails as fixed owners:

```text
fadlon1980@gmail.com
fadlonmay@gmail.com
```

The app also includes a new button:

```text
Repair owner role
```

under Settings → Cloud sync health.

## Important: publish the included Firestore rules

Firebase Console:

```text
Firestore Database → Rules
```

Paste the full content from:

```text
firestore.rules
```

Click **Publish** and wait about 1 minute.

## After upload

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-15
```

## How Maayan should repair her role

1. Maayan opens V4.8.15.
2. Maayan signs in with `fadlonmay@gmail.com`.
3. Go to Settings.
4. Click **Repair owner role**.
5. Click **Pull latest from cloud** or refresh once.
6. Her role should stay `owner`.

## If still not fixed

From Elad account, manually set Maayan to owner in Settings → Family members, then click Sync now.
