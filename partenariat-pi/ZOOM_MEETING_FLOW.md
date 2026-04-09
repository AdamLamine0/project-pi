# Zoom meeting flow

## What is implemented

- Backend creates a Zoom meeting using Server-to-Server OAuth.
- Backend sends an email notification to partner with requester name and suggested date.
- Email does not include Zoom link.
- API response includes Zoom meeting metadata for in-platform use.

## Required environment variables

- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `ZOOM_CLIENT_ID` (or `Client_ID`)
- `ZOOM_CLIENT_SECRET` (or `Client_Secret`)
- `ZOOM_ACCOUNT_ID` (or `Account_ID`)
- `ZOOM_USER_ID` (optional, default `me`)

## Endpoint

`POST /api/meeting-invitations/partenaire/{partenaireId}`

Headers:

- `X-User-Role: ROLE_USER` or `ROLE_ADMIN`
- `X-User-Id: <id>` (optional but recommended)

Body:

```json
{
  "requesterName": "Adam Doe",
  "subject": "Partnership follow-up",
  "suggestedDateTime": "2026-04-10T15:30:00",
  "durationMinutes": 45,
  "note": "Can we review goals and next steps?"
}
```

