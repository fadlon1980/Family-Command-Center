# Family Command Center PWA V4.8.2 — Calendar Button Reliability Fix

This update keeps stable storage keys from V4.8.1 and adds a stronger backup click handler for Google Calendar buttons.

## Fixed in V4.8.2

- Connect Google Calendar button now has:
  - normal JavaScript event handler
  - document-level backup handler
  - inline backup handler
- The app should show visible feedback immediately after clicking.
- Calendar-related JavaScript errors are shown in the Calendar status area.
- Refresh calendar and Save selected calendar buttons also have backup handlers.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-2
```

## Expected behavior

When you click **Connect Google Calendar**, you should immediately see:

```text
Connect Google Calendar button clicked. Opening Google permission window...
```

Then a Google popup should open.

## If no popup opens

1. Allow popups for `fadlon1980.github.io`.
2. Test in Chrome, not inside an in-app browser.
3. Try Incognito to bypass old PWA cache.
4. Confirm Google Calendar API is enabled in Google Cloud.
5. Confirm API key website restrictions include:
   - `https://fadlon1980.github.io/*`
   - `https://fadlon1980.github.io/Family-Command-Center/*`
