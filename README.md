# Family Command Center PWA V4.8.39 — Local Date Calculation Fix

This version is based on V4.8.38.

## What was fixed

If the phone/browser date is:

```text
05/17/2026
```

then:

```text
tomorrow
```

should become:

```text
05/18/2026
```

Some earlier date utilities may have used UTC date behavior through `toISOString()`, which can shift the date by one day depending on time zone and time of day.

## V4.8.39 changes

- `todayIso()` now uses the browser/phone local date.
- `isoFromDate()` now formats local year/month/day.
- `addDays()` now uses local date math.
- `nextWeekday()` now uses local date math.
- Quick Capture date parsing now relies on local-date helpers.

## Test

With phone/browser date showing 05/17/2026:

```text
pay for Daniel Hebrew lesson 260$ by tomorrow
```

Expected after choosing Payment:

- payment name = Hebrew lesson
- owner / child = Daniel
- amount = 260
- due date = 05/18/2026
- calendar reminder date = 05/18/2026

## Still included

- V4.8.38 natural payment wording and `260$` fix
- V4.8.37 conflict detection
- V4.8.36 Edit buttons
- V4.8.31 rules and service worker safety
- Manual save mode
- Global Manual Save Bar
- No automatic cloud save

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-39
```

No Firestore rules change is required if V4.8.31 rules are already published.
