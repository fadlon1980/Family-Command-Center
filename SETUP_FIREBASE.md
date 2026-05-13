# V4.8.20 Rollback Setup Notes

## Step 1 — Upload to GitHub

Upload all files from this package to your GitHub Pages repository.

## Step 2 — Firestore rules

If V4.8.15 rules are already published, you can skip this.

Otherwise go to:

```text
Firebase Console → Firestore Database → Rules
```

Paste the full content of `firestore.rules` from this package and click **Publish**.

## Step 3 — Open rollback version

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-20
```

## Step 4 — Test only Elad → Firestore first

1. Sign in as Elad.
2. Run connection diagnostics.
3. Add Shopping item: `ROLLBACK TEST ELAD 001`
4. Wait 5 seconds.
5. Check Firebase:
   `families → FAM-59ATQF5R → state → main → data → shopping`

Do not test Maayan until Elad → Firestore works.
