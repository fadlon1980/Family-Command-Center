# Setup for Family Command Center V4.7

V4.7 adds family-level Google Calendar configuration.

## Required setup

Same as V4.6:

1. Firebase Authentication → Google provider enabled
2. Firebase Authentication → Authorized domains includes:
   `fadlon1980.github.io`
3. Firestore Database created
4. Firestore rules from `firestore.rules` published
5. Google Calendar API enabled in Google Cloud project:
   `fadlon-family-hub`

## How to configure the family calendar

1. Open the app:
   `https://fadlon1980.github.io/Family-Command-Center/?version=4-7`
2. Sign in as a parent/admin.
3. Go to Calendar.
4. Click **Connect Google Calendar**.
5. Approve read-only access.
6. Select the family calendar from the dropdown.
7. Click **Save selected calendar as family calendar**.

The selected calendar is stored in Firestore under:

```text
families/{familyId}.calendarConfig
```

## What other family members do

Each family member still needs to click **Connect Google Calendar** once.

If their Google account has access to the configured family calendar, the app will automatically select it.

## Important limitation

This is not yet automatic background push sync. It is family-level configuration for the selected calendar. True push/background sync requires a backend such as Firebase Cloud Functions or Cloud Run.
