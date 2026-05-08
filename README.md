# Family Command Center PWA V4.8.1 — Stable Storage Keys

This is a stability update.

## What changed

The app now uses stable local storage keys going forward:

- `family-command-center-state`
- `family-command-center-cloud-family-id`
- `family-command-center-calendar-selected-id`
- `family-command-center-calendar-events-cache`
- `family-command-center-calendar-token`

This means future app updates should not force you to reconnect or rejoin the family space just because the version changed.

## Migration

V4.8.1 automatically looks for older V4.x local storage keys and migrates them into the new stable keys when the app loads.

It checks older keys from:

- V4
- V4.1
- V4.2
- V4.3
- V4.4
- V4.5
- V4.6
- V4.7
- V4.7.1
- V4.7.2
- V4.8

## Still expected

Google Calendar access tokens may still expire or require reconnecting, because Calendar access is browser-session based. But the selected family calendar and family space should now be more stable.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-1
```

## Future rule

Do not change local storage key names in future releases unless there is a very specific reason and a migration path.
