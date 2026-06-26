# Apiece — Beta Signup

Standalone, server-rendered marketing + application page for the Apiece beta.
One screen: wordmark, headline, subhead, and an application form (required email
+ optional, repeatable "where do you curate today?" URLs). On submit it records
the application to a Google Sheet and emails `dp@apiece.co`.

This is **not** part of the `apiece-ios-app` repo.

## Stack

- **Next.js (App Router, SSR)** + TypeScript, React 19
- Plain CSS with brand tokens (no Tailwind) — see `app/globals.css`
- Inter via `next/font` (self-hosted)
- Form → Next.js route handler (`app/api/apply/route.ts`) → **Google Apps Script**
  web app (appends the Sheet row **and** sends the notification email)

## Local development

```bash
nvm use            # Node LTS (or any Node 18.18+)
npm install
cp .env.example .env.local   # then fill in the two values (see below)
npm run dev                  # http://localhost:3000
```

Without `APPS_SCRIPT_URL` set, the form still works in dev — submissions are
logged to the server console instead of hitting the Sheet, so you can test the UI
flow immediately.

## Environment variables

| Variable | Purpose |
|---|---|
| `APPS_SCRIPT_URL` | The deployed Apps Script web-app URL (ends in `/exec`). |
| `APPS_SCRIPT_SECRET` | Shared secret; must match `APPLY_SECRET` in the Apps Script. |

The Google Sheet + email backend is set up once via Apps Script — see
[`apps-script/README.md`](./apps-script/README.md).

## Referral capture

If the URL has `?ref=` or any `utm_*` param, it's read server-side (SSR) and
stored with the application (e.g. `ref=adam&utm_source=substack`).

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel (Framework preset: Next.js — auto-detected).
3. Add `APPS_SCRIPT_URL` and `APPS_SCRIPT_SECRET` under Project → Settings →
   Environment Variables.
4. Deploy. Point `apiece.co` (or a subdomain) at it when ready.

## Structure

```
app/
  layout.tsx        # html shell, Inter font, metadata/OG tags
  page.tsx          # SSR page; reads referral params; renders the form island
  SignupForm.tsx    # client form: repeatable URLs, validation, inline success
  globals.css       # brand tokens + all styles
  api/apply/route.ts# honeypot + validation; forwards to Apps Script
apps-script/
  Code.gs           # the Apps Script backend (paste into the Sheet's script editor)
  README.md         # backend setup steps
```
