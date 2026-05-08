# Family Command Center PWA V4.1 — Google Sign-In + Firebase Shared Sync

This version adds **Sign in with Google** while keeping Email/Password as a fallback.

## New in V4.1

- Sign in with Google
- Email/password fallback still available
- Firebase config is already filled with your `fadlon-family-hub` project details
- Shared family cloud sync remains the same:
  - Create shared family space
  - Join using Family ID + Invite Code
  - Sync across family devices

## Before uploading to GitHub Pages

Make sure Firebase Console has:

1. Authentication → Sign-in method → Google → Enabled
2. Authentication → Sign-in method → Email/Password → Optional fallback, but recommended
3. Authentication → Settings → Authorized domains → your GitHub Pages domain added
4. Firestore Database created
5. Firestore rules from `firestore.rules` published

## Files to upload to GitHub Pages

Upload the contents of this folder to your repository root:

- `index.html`
- `app.js`
- `styles.css`
- `firebase-config.js`
- `manifest.webmanifest`
- `service-worker.js`
- `firestore.rules`
- `SETUP_FIREBASE.md`
- `icons/`

## First use

You:

1. Open the app.
2. Go to Settings.
3. Click **Sign in with Google**.
4. Click **Create shared family space**.
5. Copy the Family ID and Invite Code.

Your wife/kids:

1. Open the same app link.
2. Go to Settings.
3. Click **Sign in with Google**.
4. Use **Join existing family space** with the Family ID and Invite Code.

## Important privacy note

Do not store highly sensitive data such as credit card numbers, bank account numbers, passwords, or highly sensitive medical details.
