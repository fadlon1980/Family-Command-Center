# V4.8.18 Setup Notes

No Firestore rules change is required if V4.8.15 rules are already published.

## Test write path

1. Open:
   https://fadlon1980.github.io/Family-Command-Center/?version=4-8-18

2. Settings → Cloud sync health

3. Click:
   Test SDK write

4. If SDK write times out, click:
   Test REST write

5. If REST succeeds, click:
   Retry full save

6. Check Firestore:
   families → FAM-59ATQF5R → state → main
