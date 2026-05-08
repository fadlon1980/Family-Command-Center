# Family Command Center PWA V4.8.4 — Automatic Role Assignment

This version adds automatic role assignment based on email mappings in Settings.

## New in V4.8.4

- New Settings panel: **Automatic role assignment**
- Parent/Admin emails list
- Kid email → child name mapping
- Default role for unknown new members
- Button to re-apply role rules to current members
- Auto role assignment after Google login / family space connection

## Recommended setup

In Settings → Automatic role assignment:

### Parent/Admin emails

```text
elad@gmail.com
maayan@gmail.com
```

### Kid mappings

```text
kid1@gmail.com = Maya
kid2@gmail.com = Daniel
kid3@gmail.com = Noam
```

### Default unknown role

Recommended:

```text
viewer
```

## Assignment logic

```text
Family creator → owner
Email in parent list → parent
Email in kid mapping → kid + linked child
Unknown email → default role, recommended viewer
```

## Important

This keeps the stable storage keys from V4.8.1 and the Calendar fixes from V4.8.3.

No Firestore rules change is required.

## Test URL

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-4
```
