# Family Command Center PWA V4.6 — Parent/Kid Roles and Kid-Friendly View

This version adds role-based views for parents and kids.

## New in V4.6

- Family roles:
  - owner
  - admin
  - parent
  - kid
  - viewer
- Admins can change member roles in Settings → Family members.
- For kids, the app hides parent/admin-heavy tabs:
  - Money
  - Planning
  - Tasks
  - Routines
  - Parent admin controls
- Kids see a friendlier dashboard focused on:
  - Homework & exams
  - Activities
  - Prep items
  - Requests to parents
- Kids can send parent requests:
  - Need signature
  - Need to buy
  - Need help
  - School question
- Parent-only dashboard cards are hidden from kid view:
  - Payments
  - Decisions
  - School/Admin
  - Parent tasks

## How to use

1. Sign in as an admin/owner.
2. Go to Settings.
3. Under Family members, set each person role:
   - Parents: `parent`
   - Kids: `kid`
4. For each kid account, select which child name they are linked to.
5. Ask the kid to refresh the app.

## Important security note

This version is designed for a family pilot and hides panels in the UI. The current MVP still stores the whole family state in one Firestore document. A future production version should split data into separate documents and enforce roles in Firestore rules.

## Test URL

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-6
```
