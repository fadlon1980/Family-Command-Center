# Family Command Center PWA V4.8.10 — Friendly Diagnostics

This version adds a dedicated diagnostics panel to help identify why the app freezes or behaves unexpectedly.

## New in V4.8.10

Settings now includes:

```text
Diagnostics & friendly errors
```

With buttons:

- **Run connection check**
- **Copy diagnostic report**
- **Clear diagnostics**

## What it checks

- App version and URL
- Firebase config loaded
- Firebase SDK initialized
- Google sign-in state
- Saved Family ID
- Family document readability
- Current user member record
- Shared family state document
- Cloud sync readiness

## Friendly error explanations

The app now translates technical errors into clear actions for:

- Firestore permission problems
- Missing family document
- Missing member record
- Missing shared state
- Network/timeouts
- Popup blocked
- Unauthorized domain
- Google API key website restriction
- Calendar API disabled/blocked
- Missing Firebase config
- JavaScript errors

## Use after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-10
```

Then go to:

```text
Settings → Diagnostics & friendly errors → Run connection check
```

If you need help, click **Copy diagnostic report** and paste it into ChatGPT.
