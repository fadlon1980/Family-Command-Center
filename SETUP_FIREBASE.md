# Firebase + Google Calendar setup for Family Command Center V4.5

V4.5 adds Google Calendar read integration.

## Firebase setup

Same as V4.4:

1. Authentication → Sign-in method → Google → Enabled
2. Optional: Authentication → Sign-in method → Email/Password → Enabled
3. Authentication → Settings → Authorized domains → add your GitHub Pages domain
4. Firestore Database created
5. Firestore rules from `firestore.rules` published

## Google Calendar API setup

Use the same Google Cloud project as Firebase:

`fadlon-family-hub`

Then:

1. Open Google Cloud Console.
2. Select project `fadlon-family-hub`.
3. Go to APIs & Services → Library.
4. Search for `Google Calendar API`.
5. Click Enable.

## Test

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-5
```

Then:

1. Sign in with Google.
2. Go to Calendar.
3. Click Connect Google Calendar.
4. Approve read-only access.
5. Select your family calendar.
6. Confirm events appear in Calendar and Today dashboard.

## Notes

This version is read-only. It does not yet create or update Google Calendar events.
