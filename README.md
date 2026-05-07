# Family Command Center PWA V4 — Firebase Shared Sync

This version adds shared family cloud sync using Firebase Authentication and Cloud Firestore.

## New in V4

- Sign in / create account
- Create shared family space
- Join family space using Family ID + Invite Code
- Sync the family dashboard across devices
- Firebase setup file: `firebase-config.js`
- Firestore rules file: `firestore.rules`
- Step-by-step Firebase guide: `SETUP_FIREBASE.md`

## Included modules

- Today dashboard
- Homework, exams, projects, quizzes, tests, and due dates
- Payment attention dashboard
- Week / month / year family expense summaries
- Family tasks
- Manual family calendar and kids activities
- Shopping list
- Kids cards
- Inbox / brain dump
- Tomorrow prep
- Needs decision
- School & admin tracker
- Morning / evening / weekly routines
- Quick capture
- Export/import backup
- Installable PWA files
- Firebase shared sync

## Before uploading to GitHub Pages

Open `firebase-config.js` and replace the placeholder values with your Firebase Web app config.

Then publish these files to the root of your GitHub Pages repository.

## After uploading

1. Open the app.
2. Go to Settings.
3. Create/sign into your account.
4. Create shared family space.
5. Share Family ID and Invite Code with your wife/kids.
6. Each family member signs in and joins the same family space.

## Important privacy note

Do not store highly sensitive data such as:

- Credit card numbers
- Bank account numbers
- Passwords
- Highly sensitive medical details

Use payment labels like:

- Soccer fee — $120
- School lunch balance — $40
- Dentist bill — $75

## MVP limitation

This version syncs the whole family state as one Firestore document. This is good for a family pilot, but a future production version should store each task/payment/homework item as a separate Firestore document.
