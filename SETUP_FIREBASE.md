# Firebase setup for Family Command Center V4.1

This version uses Firebase Authentication with **Google Sign-In** and Cloud Firestore.

## Step 1 — Enable Google Sign-In

Firebase Console:

1. Open your project: `fadlon-family-hub`
2. Go to Authentication
3. Open **Sign-in method**
4. Select **Google**
5. Enable it
6. Choose a support email
7. Save

## Step 2 — Optional but recommended: Enable Email/Password

This keeps the original sign-in option as a backup.

Firebase Console:

Authentication → Sign-in method → Email/Password → Enable → Save

## Step 3 — Create Cloud Firestore

Firebase Console:

Firestore Database → Create database → Production mode

Choose a location, then finish the setup.

## Step 4 — Publish Firestore rules

Firebase Console:

Firestore Database → Rules

Paste the content from `firestore.rules`, then publish.

## Step 5 — Add Authorized Domain

Firebase Console:

Authentication → Settings → Authorized domains

Add your GitHub Pages domain, for example:

```text
your-github-username.github.io
```

Do not include `https://`.
Do not include the repository path.

## Step 6 — Upload V4.1 files to GitHub Pages

Upload the contents of this folder to the root of your GitHub Pages repository.

Important: upload the files inside the folder, not the folder itself.

## Step 7 — Test sign-in

Open your app link with:

```text
?version=4-1
```

Then go to Settings and click **Sign in with Google**.

## Step 8 — Create and share family space

You:

1. Sign in with Google.
2. Click **Create shared family space**.
3. Copy the Family ID and Invite Code.

Your wife/kids:

1. Sign in with Google.
2. Enter the Family ID and Invite Code under **Join existing family space**.

## MVP limitation

This version syncs the whole family state as one Firestore document. This is good for a family pilot, but a future production version should store each task/payment/homework item as a separate Firestore document.
