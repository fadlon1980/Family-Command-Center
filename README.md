# Family Command Center PWA V4.2 — Family Members + Activity Status

This version adds a family members panel to the Firebase shared sync area.

## New in V4.2

- See who joined the family space
- Show member email/name/photo from Google sign-in
- Show role: owner or member
- Show “You” for the current signed-in user
- Show recent activity:
  - Active now
  - Last seen X min/hr ago
- Uses a lightweight Firestore heartbeat while the app is open

## Existing features

- Sign in with Google
- Email/password fallback
- Create shared family space
- Join family space with Family ID + Invite Code
- Shared family cloud sync
- Homework and exams
- Payments and expenses
- Tasks
- Calendar items
- Planning, decisions, school/admin, shopping, kids view, and routines

## Firebase requirements

Make sure Firebase Console has:

1. Authentication → Sign-in method → Google → Enabled
2. Authentication → Settings → Authorized domains → your GitHub Pages domain added
3. Firestore Database created
4. Firestore rules from `firestore.rules` published

## How to test family members

1. Sign in with Google on your phone.
2. Create or join the family space.
3. Ask your wife to sign in with Google and join the same family space.
4. Go to Settings.
5. Look under “Family members in this space”.

You should see both users and recent activity.

## MVP limitation

“Active now” is based on a heartbeat every 60 seconds while the app is open. If someone closes the app suddenly, they may continue to appear active for up to about 3 minutes.
