# Family Command Center PWA V4.5 — Google Calendar Basic Integration

This version adds basic Google Calendar read integration.

## New in V4.5

- Google Calendar connection from the Calendar tab
- Read-only calendar permission
- Select which Google Calendar to display
- Pull events for the next 7 days
- Show Google Calendar events in:
  - Today dashboard
  - Calendar tab
- Open events in Google Calendar

## Important behavior

Calendar access is currently user-local:

- Each parent can connect their own Google account.
- Events are not copied to Firestore.
- The selected Calendar ID is remembered on that browser.
- The Calendar access token is kept only for the current browser session and may expire, so you may need to reconnect.

## Required Google setup

In Google Cloud Console for your Firebase project:

1. Enable the Google Calendar API.
2. Make sure Google sign-in is enabled in Firebase Authentication.
3. Make sure your GitHub Pages domain is authorized.

## How to use

1. Open the app.
2. Sign in with Google.
3. Go to Calendar tab.
4. Click **Connect Google Calendar**.
5. Approve read-only calendar access.
6. Select your family calendar.
7. Click **Refresh calendar events** if needed.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-5
```

## Future calendar steps

- V4.6: Add app events to Google Calendar
- V4.7: Two-way sync / background refresh through backend
- V4.8: Conflict detection between kids activities
