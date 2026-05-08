# Firebase setup for Family Command Center V4.6

V4.6 adds Parent/Kid roles and kid-friendly view.

## Required Firebase setup

Same as V4.5:

1. Authentication → Sign-in method → Google → Enabled
2. Optional: Authentication → Sign-in method → Email/Password → Enabled
3. Authentication → Settings → Authorized domains → add your GitHub Pages domain
4. Firestore Database created
5. Firestore rules from `firestore.rules` published
6. Google Calendar API enabled if you use calendar integration

## Assigning roles

1. Open the app as the family owner/admin.
2. Go to Settings.
3. Under Family members, use the role dropdown.
4. Set kids as `kid`.
5. If role is `kid`, select the linked child name.

## Important

Role hiding is implemented in the app UI for the family pilot. Stronger production security should enforce roles in Firestore rules after the data model is split into separate item documents.
