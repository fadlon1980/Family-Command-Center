# Family Command Center PWA V4.4 — Admin Reset Controls

This version adds an admin-only reset area.

## New in V4.4

- Admin controls section under Settings
- Reset shared family data button
- Button is visible only to:
  - the family owner who created the family space
  - members with role `owner` or `admin`
  - emails listed in `window.FAMILY_ADMIN_EMAILS`
- Reset requires typing `RESET`
- Reset clears family operational data but keeps:
  - family settings
  - family member access
  - cloud family space

## Important security note

This is a UI-level protection suitable for a family pilot.

The current MVP stores the whole family state in one Firestore document, and the current rules allow family members to write that document. A future production version should split each item into separate Firestore documents and enforce role-based write permissions in Firestore rules.

## How to make Maayan an admin

Open `firebase-config.js` and update:

```js
window.FAMILY_ADMIN_EMAILS = [
  "your-google-email@gmail.com",
  "maayan-google-email@gmail.com"
];
```

Use the exact Google email addresses used for sign-in.

## After upload

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-4
```

Go to Settings. If you are the owner or an admin email, you should see **Admin controls**.
