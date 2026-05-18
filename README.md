# Family Command Center PWA V4.8.40 — Quick Capture Runtime Guard

This version is based on V4.8.39.

## What was fixed

If the bucket prompt appeared, but after choosing Payment nothing appeared under Payments or Calendar, the likely cause was a runtime error after the prompt and before the records were pushed.

V4.8.40 adds runtime guards so Quick Capture initializes all needed arrays before parsing or creating items.

## Changes

- Added `ensureQuickCaptureState()`.
- Quick Capture now calls the guard before parsing.
- `v48ChildFromText()` now safely handles missing `roleRules`, `settings.children`, and older cloud/local state.
- Quick Capture handler now catches runtime errors and shows a clear alert instead of silently failing.
- Added `quickCaptureParserPreview(text)` for console troubleshooting if needed.

## Main test

Use Quick Capture:

```text
pay for Daniel Hebrew lesson 260$ by tomorrow
```

Expected after choosing Payment:

- Payment name = Hebrew lesson
- Owner / child = Daniel
- Amount = 260
- Due date = tomorrow, using local date
- Calendar reminder date = tomorrow
- Item appears under Payments and Calendar

## Still included

- V4.8.39 local date fix
- V4.8.38 natural payment wording and `260$` fix
- V4.8.37 conflict detection
- V4.8.36 Edit buttons
- V4.8.31 rules and service worker safety
- Manual save mode
- Global Manual Save Bar
- No automatic cloud save

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-40
```

No Firestore rules change is required if V4.8.31 rules are already published.
