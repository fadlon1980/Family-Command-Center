# Family Command Center PWA V4.8.5 — Owner Role Setup Visibility Hotfix

This hotfix makes the **Automatic role assignment** section visible for the family owner.

## Fixed in V4.8.5

- Owner can see Automatic role assignment.
- Admins can see Automatic role assignment.
- Emails listed in `FAMILY_ADMIN_EMAILS` can see Automatic role assignment.
- The Settings panel now shows your signed-in email and detected role in the role rules summary.
- The role setup renderer is called directly after each render and after family members load.

## Open after upload

```text
https://fadlon1980.github.io/Family-Command-Center/?version=4-8-5
```

## What you should see

Settings → Automatic role assignment

Fields:

- Parent/Admin emails
- Kid email to child mapping
- Default role for unknown users
- Save role rules
- Re-apply role rules now

No Firestore rules change is required.
