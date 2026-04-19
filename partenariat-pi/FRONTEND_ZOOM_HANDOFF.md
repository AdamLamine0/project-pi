# Frontend Handoff - Zoom Meeting Request Integration

## Goal

This file explains what is already implemented in backend and what frontend should do to integrate the meeting request flow.

## What backend already does

When frontend calls the meeting invitation API, backend will:

1. Validate user role (`ROLE_USER` or `ROLE_ADMIN`).
2. Read partner by `partenaireId`.
3. Create a Zoom meeting using backend credentials (Server-to-Server OAuth).
4. Send an email to partner contact with:
   - requester name
   - suggested date/time
   - optional note
   - no Zoom link in email
5. Return Zoom meeting data to frontend for in-app usage.

## API endpoint for frontend

`POST /api/meeting-invitations/partenaire/{partenaireId}`

### Required headers

- `X-User-Role`: `ROLE_USER` or `ROLE_ADMIN`
- `X-User-Id`: current user id (recommended)

### Request body

```json
{
  "requesterName": "Adam Doe",
  "subject": "Partnership follow-up",
  "suggestedDateTime": "2026-04-10T15:30:00",
  "durationMinutes": 45,
  "note": "Can we review goals and next steps?"
}
```

### Success response (example)

```json
{
  "partenaireId": 12,
  "partenaireEmail": "partner@example.com",
  "partenaireContactName": "Partner Name",
  "suggestedDateTime": "2026-04-10T15:30:00",
  "zoomMeetingId": "12345678901",
  "zoomJoinUrl": "https://zoom.us/j/12345678901?...",
  "zoomStartUrl": "https://zoom.us/s/12345678901?...",
  "zoomPassword": "abc123",
  "status": "SENT",
  "message": "Meeting invitation email was sent and Zoom meeting was created"
}
```

## Frontend implementation checklist

- Build a form with these fields:
  - partner selector (`partenaireId`)
  - requester name
  - subject
  - suggested date/time
  - duration in minutes
  - optional note
- Call backend endpoint with auth headers from gateway/session.
- On success, show confirmation to user.
- Save response in frontend state and navigate to meeting details page.
- Use returned `zoomJoinUrl` only inside the web app meeting flow.
- Do not send Zoom link by email from frontend.

## Recommended UI flow

1. User clicks "Request Meeting".
2. User fills form and submits.
3. Show loading state while API is running.
4. If success:
   - show "Invitation sent"
   - show date/time and partner email
   - provide button "Open Meeting in Platform" (using join URL in app flow)
5. If error:
   - show friendly message
   - keep form values for retry

## Error cases frontend should handle

- Validation errors (missing fields, invalid date in the past).
- Forbidden role (`ROLE_PARTNER` is not allowed for this endpoint).
- Partner has no contact email.
- Zoom token/meeting creation failure.
- Generic server error.

## Security notes for frontend

- Frontend must never store or use Zoom `client secret`.
- Frontend must never call Zoom OAuth token endpoint directly.
- All Zoom credential logic remains in backend.
- Treat `zoomStartUrl` as sensitive (host/admin URL). Do not expose it to normal users unless required.

## Notes for frontend team

- This API currently creates Zoom meeting and sends email in one call.
- Meeting request persistence/status workflow (PENDING/ACCEPTED/REJECTED) is not implemented yet.
- If needed, backend can add dedicated endpoints for meeting lifecycle next.

