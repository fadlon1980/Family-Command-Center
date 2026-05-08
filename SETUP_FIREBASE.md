# Firebase setup for Family Command Center V4.3

This version uses Firebase Authentication with Google Sign-In, Cloud Firestore, and auto-detect family space.

## Required Firebase setup

1. Authentication → Sign-in method → Google → Enabled
2. Optional: Authentication → Sign-in method → Email/Password → Enabled
3. Authentication → Settings → Authorized domains → add your GitHub Pages domain
4. Firestore Database created
5. Updated Firestore rules from `firestore.rules` published

## Important V4.3 rule change

V4.3 adds this Firestore path:

```text
users/{userId}
```

This allows the app to remember:

```text
currentFamilyId
```

for each Google account.

This is what allows a user to sign in from a different device and automatically reconnect to the right family space.

## Publish rules

Firebase Console:

Firestore Database → Rules

Paste the full content from `firestore.rules`, then click Publish.

## Test

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-3
```

Sign in with Google.

If you already have a family space but the app does not find it, join once using Family ID + Invite Code. After that, it should remember your family space across devices.
