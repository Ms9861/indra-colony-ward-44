# Ward 44 Jan Seva Yojana — GitHub + Vercel (Temporary Demo Storage)

This version has **NO Supabase** and **NO external video backup**.

It is ready to upload to GitHub and deploy to Vercel as a static website.

## Included
- Public complaint portal
- Separate Parishad dashboard
- Complaint IDs
- GPS capture
- Complaint tracking
- Registered → In Progress → Solved
- Google Maps GPS link
- WhatsApp pre-filled message support
- Responsive/mobile UI
- Existing Ward 44 logo

## Temporary storage limitation
For now, complaint records are stored in the browser's `localStorage`.
This means:
- Data is NOT shared between different phones/computers.
- Clearing browser data removes the demo complaints.
- Uploaded images/videos are only previewed and are NOT backed up online.
- There is NO video storage yet.

This is intentional for the current stage. Later, the same frontend can be connected to Google Sheets + Google Drive through Google Apps Script without redesigning the portal.

## Deploy
1. Extract this ZIP.
2. Create a GitHub repository.
3. Upload the extracted project files (not the ZIP itself).
4. In Vercel, import that GitHub repository.
5. Deploy with the default static settings.

## Dashboard
Open `/dashboard` or `/dashboard.html`.
The current demo login accepts any non-empty email and password and stores a browser-only session. This is NOT production security.

## WhatsApp
Edit `app.js` and replace `91XXXXXXXXXX` with the real WhatsApp number in international format, without `+` or spaces.

## Next storage upgrade
When ready, connect:
- Google Sheets for complaint records
- Google Drive for photos/videos
- Google Apps Script as the backend

No Supabase is required.
