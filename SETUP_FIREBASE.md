# Firebase setup for Family Command Center V4

This version supports shared data across your phone, your wife's phone, and the kids' devices.

## What you need to enable in Firebase

1. Firebase Web app
2. Firebase Authentication
3. Email/Password sign-in
4. Cloud Firestore
5. Firestore security rules from `firestore.rules`

## Step 1 — Create Firebase project

1. Go to Firebase Console.
2. Create a new project.
3. Register a Web app.
4. Copy the Firebase config object.

## Step 2 — Update `firebase-config.js`

Open `firebase-config.js` and replace the placeholder values with the config from Firebase.

Example:

```js
window.FAMILY_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...firebaseapp.com",
  projectId: "...",
  storageBucket: "...firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

Firebase config values are not the same as your private password, but your Firestore rules must be correct before real use.

## Step 3 — Enable Authentication

Firebase Console:

Authentication → Sign-in method → Email/Password → Enable

Each family member should create/sign into their own account in the app.

## Step 4 — Create Cloud Firestore

Firebase Console:

Firestore Database → Create database

Start in production mode if possible, then replace the rules with the content from `firestore.rules`.

## Step 5 — Add Firestore rules

Firebase Console:

Firestore Database → Rules

Paste the content from `firestore.rules`, then publish.

## Step 6 — Upload V4 files to GitHub Pages

Upload the contents of this folder to your GitHub Pages repository root.

Important files:

- `index.html`
- `app.js`
- `styles.css`
- `firebase-config.js`
- `manifest.webmanifest`
- `service-worker.js`
- `icons/`

## Step 7 — Authorize your GitHub Pages domain

Firebase Console:

Authentication → Settings → Authorized domains

Add your GitHub Pages domain, for example:

```text
your-github-username.github.io
```

## Step 8 — First use

On your device:

1. Open the app.
2. Go to Settings.
3. Create an account or sign in.
4. Click **Create shared family space**.
5. Copy the Family ID and Invite Code.

On your wife's/kids' devices:

1. Open the same app link.
2. Go to Settings.
3. Create/sign into their account.
4. Use **Join existing family space** with the Family ID and Invite Code.

## Current MVP limitation

This V4 syncs the whole family state as one document.

That is simple and good for a family pilot, but if two people edit at exactly the same second, the last save may win.

A future production version should store each task/payment/homework item as its own Firestore document.
