# Firebase setup for Family Command Center V4.4

V4.4 adds admin-only reset controls.

## Required Firebase setup

Same as V4.3:

1. Authentication → Sign-in method → Google → Enabled
2. Optional: Authentication → Sign-in method → Email/Password → Enabled
3. Authentication → Settings → Authorized domains → add your GitHub Pages domain
4. Firestore Database created
5. Firestore rules from `firestore.rules` published

## Add admin emails

Open `firebase-config.js` and set:

```js
window.FAMILY_ADMIN_EMAILS = [
  "your-google-email@gmail.com",
  "maayan-google-email@gmail.com"
];
```

The family owner can also see the admin reset button automatically.

## Important note

The reset button is hidden for non-admin users in the app UI. In this MVP, Firestore still allows family members to write the shared state document. For stronger enforcement, a future version should move each item into its own Firestore document and add role-based Firestore security rules.

## Test

1. Upload V4.4 files to GitHub Pages.
2. Open:
   `https://fadlon1980.github.io/Family-Command-Center/?version=4-4`
3. Sign in with your Google account.
4. Go to Settings.
5. Confirm you see Admin controls.
6. Sign in as a non-admin user and confirm Admin controls are hidden.
