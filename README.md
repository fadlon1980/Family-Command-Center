# Family Command Center PWA V4.7 — Family Calendar Configuration

This version adds a family-level Google Calendar setting.

## New in V4.7

- Parent/admin can save the selected Google Calendar as the family calendar.
- The family calendar setting is stored in the shared family space:
  - `families/{familyId}.calendarConfig`
- Other family members who connect Google Calendar will auto-select the saved family calendar when it is available in their Google account.
- Calendar setting updates are listened to live through Firestore.
- Kid users can view calendar events but cannot change the family calendar setting.

## Important behavior

This is still not a full background sync.

Each user still needs to:
1. Sign in with Google.
2. Click **Connect Google Calendar** once.
3. Approve read-only calendar access.

After that, the app will use the family-level calendar selection when possible.

## How to use

1. Upload V4.7 files to GitHub Pages.
2. Open:
   `https://fadlon1980.github.io/Family-Command-Center/?version=4-7`
3. Sign in as a parent/admin.
4. Go to **Calendar**.
5. Click **Connect Google Calendar**.
6. Select the shared family calendar.
7. Click **Save selected calendar as family calendar**.
8. Ask Maayan/kids to connect Google Calendar. If they have access to the same calendar, it will be auto-selected.

## Existing features preserved

- Parent/Kid roles
- Kid-friendly view
- Google Calendar read integration
- Google sign-in
- Auto-detect family space
- Family members and activity status
- Admin reset controls
- Homework/exams
- Payments
- Shopping
- Tasks
- Planning
- Routines

## Future calendar step

A later version can add true background sync with Firebase Cloud Functions or Cloud Run. That would let one parent authorize the calendar once and then sync events into Firestore for the whole family.
