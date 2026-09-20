# Ward 44 Jan Seva Yojana 

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

The dashboard PIN in this build is `2580`. It must match the `ADMIN_PIN` in Apps Script.

## Media
Image/video selectors remain in the previous UI for the design, but media backup is intentionally not sent to Google Drive yet. The selected files are only previewed in the browser until a future storage plan is added.

## Deploy
Upload the contents of this folder to GitHub. Vercel can import the GitHub repository and deploy the static site.


## GPS + Recent Complaints update

This version enables a visible **Use My Current Location** button on the public complaint form. GPS requires browser location permission and HTTPS (Vercel provides HTTPS). Coordinates are stored in the Google Sheet and shown as a Google Maps link in tracking/dashboard.

It also enables **Recent Complaints** on the public portal. The Apps Script backend must be updated to the included `Code.gs`, because the public `recent` endpoint is new.

### Update Apps Script
1. Open the Apps Script project connected to the `Ward 44 Complaints` Sheet.
2. Replace the existing `Code.gs` with the included `Code.gs`.
3. Keep your chosen `ADMIN_PIN` if you changed it.
4. Save.
5. Deploy → Manage deployments → edit the existing Web app deployment → create a new version → Deploy.
6. Keep **Execute as: Me** and **Who has access: Anyone**.
7. Keep the same `/exec` URL if Apps Script offers it.

### Test
- Open the Vercel site over HTTPS.
- Click **Use My Current Location** and allow location permission.
- Submit a test complaint.
- Confirm Latitude/Longitude/GPS Accuracy appear in the `Complaints` sheet.
- Confirm the Recent Complaints card shows the new complaint (only ID, category, location, status and time are public).
