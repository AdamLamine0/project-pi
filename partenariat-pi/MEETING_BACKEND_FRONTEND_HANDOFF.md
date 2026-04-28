# Meeting Backend -> Frontend Handoff

This file documents the recent meeting changes so frontend can integrate quickly.

## 1) Scope implemented

Backend now supports:
- Listing meetings for the logged-in actor (`USER`, `PARTNER`, `ADMIN`).
- Normal meeting request with chosen date.
- Emergency meeting request with chosen date.
- Sending email to the other party when meeting is created.
- Zoom meeting creation and returning meeting credentials in API response.

## 2) Base route and auth

Controller: `src/main/java/org/example/partenariatpi/controller/MeetingInvitationController.java`
Base path: `/api/meeting-invitations`

Gateway should forward:
- `Authorization: Bearer <jwt>`
- `X-User-Role`
- `X-User-Id`

Notes:
- Backend reads role from `X-User-Role` and user id from `X-User-Id`.
- Role is normalized using first value if comma-separated.

## 3) Endpoints

### A. Get my meetings
`GET /api/meeting-invitations/my-meetings`

Allowed roles:
- `ROLE_ADMIN`
- `ROLE_USER`
- `ROLE_PARTNER`

Behavior:
- `ROLE_ADMIN`: returns all meetings ordered by date desc.
- `ROLE_PARTNER`: returns meetings for partner org linked to this partner user.
- `ROLE_USER`: returns meetings where user is sender or receiver.

Response: `List<MeetingInvitationResponse>`

---

### B. User/Admin -> Partner (normal)
`POST /api/meeting-invitations/partenaire/{partenaireId}`

Allowed roles:
- `ROLE_USER`
- `ROLE_ADMIN`

Body: `MeetingInvitationRequest`

Effect:
- Creates Zoom meeting.
- Sends email to partner contact email.
- Persists meeting row with `priority=NORMAL`.

Response: `MeetingInvitationResponse`

---

### C. Partner -> User (normal)
`POST /api/meeting-invitations/user/{targetUserId}`

Allowed roles:
- `ROLE_PARTNER`

Body: `MeetingInvitationRequest`

Effect:
- Resolves partner org from logged-in partner user.
- Resolves target user from user service.
- Creates Zoom meeting.
- Sends email to target user email.
- Persists meeting row with `priority=NORMAL`.

Response: `MeetingInvitationResponse`

---

### D. User/Admin -> Partner (emergency)
`POST /api/meeting-invitations/emergency/partenaire/{partenaireId}`

Allowed roles:
- `ROLE_USER`
- `ROLE_ADMIN`

Body: `MeetingInvitationRequest`

Effect:
- Same flow as normal but `priority=EMERGENCY`.
- Mail subject prefixed with `[URGENT]`.

Response: `MeetingInvitationResponse`

---

### E. Partner -> User (emergency)
`POST /api/meeting-invitations/emergency/user/{targetUserId}`

Allowed roles:
- `ROLE_PARTNER`

Body: `MeetingInvitationRequest`

Effect:
- Same as normal partner->user but `priority=EMERGENCY`.
- Mail subject prefixed with `[URGENT]`.

Response: `MeetingInvitationResponse`

## 4) Request DTO

File: `src/main/java/org/example/partenariatpi/dto/MeetingInvitationRequest.java`

Fields:
- `requesterName: String` (required, not blank)
- `subject: String` (required, not blank)
- `suggestedDateTime: LocalDateTime` (required, must be future)
- `durationMinutes: Integer` (optional, defaults to `30` in service)
- `note: String` (optional)

Example JSON:
```json
{
  "requesterName": "Ahmed Ben Ali",
  "subject": "Partnership follow-up",
  "suggestedDateTime": "2026-04-18T10:30:00",
  "durationMinutes": 45,
  "note": "Please confirm availability"
}
```

## 5) Response DTO

File: `src/main/java/org/example/partenariatpi/dto/MeetingInvitationResponse.java`

Fields:
- `id: Long`
- `partenaireId: Integer`
- `senderUserId: Integer`
- `targetUserId: Integer`
- `senderRole: String`
- `priority: String` (`NORMAL` or `EMERGENCY`)
- `partenaireEmail: String` (recipient email)
- `partenaireContactName: String` (recipient display name)
- `suggestedDateTime: LocalDateTime`
- `createdAt: LocalDateTime`
- `zoomMeetingId: String`
- `zoomJoinUrl: String`
- `zoomStartUrl: String`
- `zoomPassword: String`
- `status: String` (currently `SENT`)
- `message: String`

Example response:
```json
{
  "id": 12,
  "partenaireId": 3,
  "senderUserId": 25,
  "targetUserId": null,
  "senderRole": "ROLE_USER",
  "priority": "EMERGENCY",
  "partenaireEmail": "partner@example.com",
  "partenaireContactName": "Partner Contact",
  "suggestedDateTime": "2026-04-18T10:30:00",
  "createdAt": "2026-04-14T22:12:11.431",
  "zoomMeetingId": "85427101923",
  "zoomJoinUrl": "https://zoom.us/j/...",
  "zoomStartUrl": "https://zoom.us/s/...",
  "zoomPassword": "123456",
  "status": "SENT",
  "message": "Emergency meeting invitation was sent and Zoom meeting was created"
}
```

## 6) Model persisted in DB

File: `src/main/java/org/example/partenariatpi/model/MeetingInvitation.java`
Table: `meeting_invitation`

Important columns:
- Core scheduling: `requesterName`, `subject`, `suggestedDateTime`, `durationMinutes`, `note`
- Ownership/routing: `senderRole`, `senderUserId`, `targetUserId`, `partenaireId`
- Priority/state: `priority`, `status`
- Recipient: `recipientEmail`, `recipientName`
- Zoom: `zoomMeetingId`, `zoomJoinUrl`, `zoomStartUrl`, `zoomPassword`
- Audit: `createdAt`

Enum:
- File: `src/main/java/org/example/partenariatpi/enums/MeetingPriority.java`
- Values: `NORMAL`, `EMERGENCY`

## 7) Service functions map

File: `src/main/java/org/example/partenariatpi/service/MeetingInvitationService.java`

Public entry points:
- `sendMeetingInvitation(Integer partenaireId, MeetingInvitationRequest request, String senderRole, Integer senderUserId)`
- `sendEmergencyMeetingToPartenaire(Integer partenaireId, MeetingInvitationRequest request, String senderRole, Integer senderUserId)`
- `sendMeetingInvitationToUser(Integer targetUserId, MeetingInvitationRequest request, String senderRole, Integer senderUserId)`
- `sendEmergencyMeetingToUser(Integer targetUserId, MeetingInvitationRequest request, String senderRole, Integer senderUserId)`
- `getMyMeetings(String senderRole, Integer senderUserId)`

Core private flow:
- `sendMeetingInvitationToPartenaire(...)` -> create Zoom -> send mail -> save DB -> map response
- `sendMeetingInvitationToUser(...)` -> resolve org/user -> create Zoom -> send mail -> save DB -> map response
- `saveMeeting(...)` -> persists `MeetingInvitation`
- `mapToResponse(...)` -> converts entity to `MeetingInvitationResponse`
- `buildMailSubject(...)`, `buildMailBody(...)`, `buildMailBodyForUser(...)`

## 8) Frontend integration checklist

1. Use new endpoint for list screen:
   - `GET /api/meeting-invitations/my-meetings`
2. For meeting creation choose endpoint by actor/target:
   - user/admin inviting partner: `/partenaire/{partenaireId}`
   - partner inviting user: `/user/{targetUserId}`
3. Add emergency toggle:
   - if emergency=true use `/emergency/...` endpoints.
4. Parse and display these response fields:
   - date: `suggestedDateTime`
   - priority badge: `priority`
   - status: `status`
   - zoom credentials: `zoomMeetingId`, `zoomJoinUrl`, `zoomPassword`
5. Keep sending JWT in `Authorization`; gateway injects `X-User-*` headers.

## 9) Known behavior details

- `requesterName` is required by validation.
- If `durationMinutes` is null, backend saves/uses `30`.
- Emergency only changes priority + mail subject/body urgency marker.
- Meeting is created in Zoom before DB save.
- Current persisted status is `SENT` after success.

