# Family Command Center PWA V4.7.1 — Google Calendar Connection Hotfix

This hotfix keeps V4.7 features and fixes Google Calendar connection UX.

## Fixed in V4.7.1

- Connect Google Calendar button now gives immediate visible feedback.
- Clearer message if popup is blocked.
- Clearer message if API key website restriction blocks the request.
- Save selected calendar as family calendar button now has a click handler.
- Clear family calendar setting button now has a click handler.
- Calendar controls are wired after page load for better reliability.

## Use this URL after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-7-1
```

## If Connect still does not open

1. Allow popups for `fadlon1980.github.io`.
2. Open in Chrome, not inside an in-app browser.
3. Confirm Google Calendar API is enabled in Google Cloud.
4. Confirm API key website restrictions include:
   - `https://fadlon1980.github.io/*`
   - `https://fadlon1980.github.io/Family-Command-Center/*`
5. Clear site storage or use Incognito to avoid old PWA cache.
