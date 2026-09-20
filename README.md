# Ward 44 Jan Seva Yojana — 

This build restores the earlier Ward 44 public portal visual design while keeping the Google Apps Script + Google Sheets backend.

## Files
- `index.html` — public portal
- `dashboard.html` — separate Parishad dashboard with PIN login
- `app.js` — public portal logic + Google Sheets API connection
- `dashboard.js` — Parishad dashboard logic + status updates
- `style.css` — previous UI styling
- `assets/inc-hand-logo.png` — portal logo

## Google Apps Script
The current Apps Script URL is already configured in `app.js` and `dashboard.js`.

The dashboard PIN in this build is `4411`. It must match the `ADMIN_PIN` in Apps Script.

## Media
Image/video selectors remain in the previous UI for the design, but media backup is intentionally not sent to Google Drive yet. The selected files are only previewed in the browser until a future storage plan is added.

## Deploy
Upload the contents of this folder to GitHub. Vercel can import the GitHub repository and deploy the static site.
