# V4.8.34 Setup Notes

No Firestore rules change is required if V4.8.31 rules are already published.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-34
```

Use hard refresh once:

```text
Ctrl + Shift + R
```

## Parser QC

Test these Quick Capture examples:

```text
Pay for Hebrew lesson $260 by 15 May for Daniel
```

Expected:
- app asks bucket if ambiguous
- choose Payment
- one payment is created
- one calendar reminder is created
- amount = 260
- due date = May 15
- no time is created from $260

```text
Daniel Hebrew lesson May 15th 3pm
```

Expected:
- event date = May 15
- event time = 15:00

```text
Buy 5 bags
```

Expected:
- shopping item
- no time is created

Then click Save to cloud once if you want to publish the changes.
