# Family Command Center PWA

A first MVP for a private family organizer.

## What is included

- Today dashboard
- Family tasks with owner, due date, priority, category, and status
- Manual family calendar/activity list
- Shopping list
- Kids view
- Morning/evening/weekly routines
- Quick capture field
- Local browser storage
- Export/import backup
- Installable PWA when hosted on HTTPS, such as GitHub Pages

## How to run locally

Open `index.html` in a browser.

The app will work locally, but PWA install and offline service worker features work best when hosted on HTTPS.

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

## Current limitation

This version stores data only on the device/browser where it is used.

Recommended next step:
Move data to Firebase or Supabase so both parents can share the same live data.
