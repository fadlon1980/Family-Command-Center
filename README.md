# Family Command Center PWA V4.8.14 — Fixed Owner Emails

This version hard-codes two family owner emails in the app:

```text
fadlon1980@gmail.com
fadlonmay@gmail.com
```

## What changed

- `fadlon1980@gmail.com` is always treated as `owner`
- `fadlonmay@gmail.com` is always treated as `owner`
- Automatic role assignment will return `owner` for both emails
- Role setup panel will be visible for both emails
- The app will try to write `role: owner` into the member record for both emails
- Keeps V4.8.13 auto reconnect and live sync stabilizer

## Important Firestore rules update

This version includes updated `firestore.rules`.

The new rules allow:

- original creator to manage family
- members with role `owner` or `admin` to manage members/family settings
- users to update their own profile/presence without changing their role

## After upload

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-14
```

## Recommended test

1. Upload V4.8.14.
2. Publish the included `firestore.rules`.
3. Sign in as Elad.
4. Confirm Maayan member record has `role = owner`.
5. Sign in as Maayan.
6. Confirm Settings shows her as owner and not viewer.
7. Add a shopping item from Maayan.
8. Confirm it syncs to Elad.
