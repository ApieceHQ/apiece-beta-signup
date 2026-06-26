# Google Apps Script backend — setup

This is the backend for the beta signup form. It lives entirely in **your Google
account**: a script bound to your applications Sheet that appends a row and emails
`dp@apiece.co` on every submission. No GCP project, no service account, no email
vendor.

## One-time setup (~5 minutes)

1. **Create the Sheet.** In Google Drive, make a new Google Sheet, e.g.
   "Apiece — Beta Applications". (Headers are added automatically on first write:
   `Timestamp · Email · Audience URLs · Referral`.)

2. **Open the script editor.** In that Sheet: **Extensions → Apps Script**.
   Delete the placeholder `Code.gs` content and paste in the contents of
   [`Code.gs`](./Code.gs). Save.

3. **Add the shared secret.** In the Apps Script editor: **Project Settings (gear)
   → Script properties → Add script property**:
   - Name: `APPLY_SECRET`
   - Value: a long random string (e.g. run `openssl rand -hex 24` in a terminal).
   Save. Keep this value — you'll reuse it as `APPS_SCRIPT_SECRET` on the site.

4. **Deploy as a web app.** **Deploy → New deployment → ⚙ → Web app**:
   - Description: `apiece beta signup`
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**. Google will ask you to **authorize** (it needs permission to
   edit the Sheet and send mail as you) — approve it. Copy the **Web app URL**
   (ends in `/exec`).

5. **Wire it into the site.** In `.env.local` (local) and in Vercel's environment
   variables (production), set:
   ```
   APPS_SCRIPT_URL=<the /exec URL from step 4>
   APPS_SCRIPT_SECRET=<the same value as APPLY_SECRET from step 3>
   ```

## Verifying

- Visit the `/exec` URL in a browser — you should see `{"ok":true,"service":"apiece-beta-signup"}`.
- Submit the form locally (with the env vars set) — a row should appear in the
  Sheet and an email should arrive at `dp@apiece.co`.

## Notes

- The email is sent **from the Google account that owns the script** (your
  account), to `dp@apiece.co`. `MailApp` has a free daily quota (100/day on a
  personal account, 1,500/day on Workspace) — far above expected beta volume.
- If you edit `Code.gs` later, you must **Deploy → Manage deployments → Edit →
  New version** for changes to take effect (the `/exec` URL stays the same).
