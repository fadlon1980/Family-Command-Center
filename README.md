# Family Command Center PWA V4.3 — Auto-detect Family Space

This version adds automatic family-space detection after Google login.

## New in V4.3

- After a user creates or joins a family space once, the app saves their current family space in `users/{userId}`.
- On any device, after Google sign-in, the app checks `users/{userId}.currentFamilyId`.
- If found, it automatically opens the right family space.
- It also migrates older local Family ID values from V4/V4.1/V4.2 when available.

## Important

Existing family members who joined before V4.3 may need to join once more on one device. After that, V4.3 will save their family profile and future logins on other devices should auto-detect the family space.

## Firebase rules update required

V4.3 adds a `users/{uid}` profile document. You must publish the updated `firestore.rules` file.

Go to:

Firebase Console → Firestore Database → Rules

Paste the content from `firestore.rules`, then click Publish.

## How to test auto-detect

1. Upload V4.3 to GitHub Pages.
2. Publish the updated Firestore rules.
3. Sign in with Google.
4. Create or join your family space once.
5. Open the app on a different device/browser.
6. Sign in with the same Google account.
7. The app should automatically open your family space without entering Family ID again.
