# V4.8.17 Setup Notes

No Firestore rules change is required if V4.8.15 rules are already published.

## Test save problem

Open:

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-17
```

Then:

1. Go to Settings → Cloud sync health.
2. Click Test cloud write.
3. If successful, click Retry full save.
4. Check Firestore:
   families → FAM-59ATQF5R → state → main
5. Ask Maayan to click Pull latest from cloud.
