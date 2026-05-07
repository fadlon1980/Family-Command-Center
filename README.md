# Family Command Center PWA V3

This version adds a dedicated school workload tracker and a more polished, friendly dashboard design.

## New in V3

- Homework & Exams tab
- Dashboard card for upcoming homework, projects, quizzes, tests, and exams
- Per-child homework and exam tracking
- Kids cards now show each child's school workload
- Quick capture can detect schoolwork items
- More professional and friendly UI polish:
  - cleaner dashboard summary cards
  - softer visual hierarchy
  - better card styling
  - clear focus areas for family attention

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

## Quick capture examples

Try typing these in the Quick Capture box:

- Maya math homework due Friday
- Daniel science exam next Thursday
- History project due 5/20
- Pay soccer fee $120 by Friday
- Paid dentist bill $75
- Buy milk, eggs, bananas
- Decision: choose summer camp by Sunday
- Pack basketball shoes tomorrow
- Submit school permission slip by Thursday

## Current limitation

This version stores data locally in the browser only.

That means if you open it on your phone and your wife opens it on her phone, the data will not sync yet.

## Recommended next step

Move the data from local browser storage to Firebase or Supabase.

Recommended path:

1. Keep this PWA design.
2. Add login for you and your wife.
3. Store data in a cloud database.
4. Add push notifications.
5. Add Google Calendar sync.
6. Add WhatsApp capture later as a front-door input channel.

## How to publish to GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. Go to repository Settings.
4. Open Pages.
5. Under Build and deployment, select:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
6. Save.
7. After GitHub publishes it, open the live Pages link on your phone.
8. On Android Chrome, tap the menu and choose "Add to Home screen" or use the in-app Install button if shown.
