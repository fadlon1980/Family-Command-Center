# V4.8.26 Setup Notes

No Firestore rules change is required if V4.8.20 or V4.8.15 rules are already published.

## Upload

Upload all files to GitHub Pages.

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-26
```

## Test save

1. Add payment:
   Pay for ROOT SAVE TEST $11 by tomorrow for Daniel

2. Edit amount to 12.

3. Wait for:
   Cloud save completed

4. Check Firestore:
   families → FAM-59ATQF5R → state → main

Expected:
- data.payments contains ROOT SAVE TEST
- amount is 12
- writeMethod is stable-rest-save
