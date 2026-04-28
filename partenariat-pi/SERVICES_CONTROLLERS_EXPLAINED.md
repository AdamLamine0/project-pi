# Services and Controllers Explained (Simple Guide)

This file explains, in simple terms, what your `controller` and `service` classes do.

## Quick idea: Controller vs Service

- **Controller** = receives HTTP requests (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), reads headers/body, and returns HTTP response.
- **Service** = contains business logic (rules, validation, workflow, integration with repository/Zoom/mail).

Request flow in your project:

`Frontend -> Controller -> Service -> Repository/External API -> Controller -> Frontend`

---

## Controllers (`src/main/java/org/example/partenariatpi/controller`)

## `ConventionController`

**Base URL:** `/api/conventions`

Main role: manage convention lifecycle (create, read, update, confirm, renew, cancel, delete) and PDF download.

Key endpoints/functions:

- `getAll` -> admin gets all conventions.
- `getById` -> one convention by id (with ownership check).
- `downloadPdf` -> generate/download convention PDF.
- `getByUser` -> conventions of one user.
- `getByOrganisation` -> conventions of one organisation.
- `getByUserAndOrganisation` -> filtered conventions.
- `getPendingRenewal` -> conventions waiting for renewal decision.
- `create` -> create convention (with role checks).
- `update` -> update convention dates/terms.
- `updateStatut` -> set status manually.
- `confirmer` -> one party confirms convention (optionally with signature image).
- `demanderRenouvellement` -> request renewal.
- `accepterRenouvellement` -> accept renewal and create new convention terms.
- `annuler` -> cancel/expire convention.
- `delete` -> delete convention.

---

## `ObjectifController`

**Base URL:** `/api/objectifs`

Main role: manage objectives attached to conventions.

Key endpoints/functions:

- `getByConvention` -> objectives for a convention.
- `getByConventionAndStatut` -> filter objectives by status.
- `getByConventionAndResponsable` -> filter by responsible party.
- `getById` -> get one objective.
- `create` -> create objective.
- `update` -> update objective data.
- `updateStatut` -> update objective progress status.
- `delete` -> delete objective.

---

## `OrganisationPartenaireController`

**Base URL:** `/api/organisations`

Main role: CRUD and dashboard for partner organisations.

Key endpoints/functions:

- `getAll` -> list all organisations.
- `getById` -> one organisation.
- `getByStatut` -> organisations by status (`EN_ATTENTE`, `ACTIF`, etc.).
- `getMyDashboard` -> partner sees own organisation profile.
- `updateContactInfo` -> partner updates own contact data.
- `create` -> admin creates organisation.
- `update` -> admin updates organisation.
- `updateStatut` -> admin changes partner status.
- `assignUser` -> admin links user account to organisation.
- `delete` -> admin deletes organisation.

---

## `MeetingInvitationController`

**Base URL:** `/api/meeting-invitations`

Main role: send meeting request to partner and trigger Zoom meeting creation.

Key endpoint/function:

- `sendToPartenaire` (`POST /partenaire/{partenaireId}`)
  - validates role (`ROLE_ADMIN` or `ROLE_USER`),
  - reads request data (subject/date/duration/note/requester),
  - calls service to create Zoom meeting + send email,
  - returns meeting credentials/metadata.

---

## `ZoomSignatureController`

**Base URL:** `/api/zoom`

Main role: generate Meeting SDK signature for embedded Zoom in web app.

Key endpoint/function:

- `generateSignature` (`POST /signature`)
  - checks role,
  - generates JWT signature using SDK key/secret,
  - returns `signature` + `sdkKey` for frontend `@zoom/meetingsdk` join.

---

## Services (`src/main/java/org/example/partenariatpi/service`)

## `ConventionService`

Main role: business logic for conventions.

Important functions:

- `getAll`, `getById`, `getByUserId`, `getByOrganisationId`, `getByUserAndOrganisation`, `getPendingRenewal` -> read operations.
- `create` -> validates dates, maps request to entity, sets initial flags/status, creates convention number.
- `confirmer` -> confirmation rules between user/partner, stores signature data, activates when both confirm.
- `update` -> updates dates and resets confirmations.
- `resetConfirmationsAfterObjectifChange` -> called when objective changes.
- `updateStatut` -> change status.
- `demanderRenouvellement` / `accepterRenouvellement` -> renewal workflow.
- `annuler` -> mark convention expired.
- `delete` -> delete with ownership/security checks.
- `checkIsParty`, `checkOwnership` -> authorization logic.
- `validateDates` -> start date must be at least tomorrow, end date at least +3 months.

---

## `ConventionPdfService`

Main role: build a PDF file for a convention using iText.

Important function:

- `generateConventionPdf(conventionId)`
  - loads convention,
  - builds structured PDF sections (header, dates, parties, objectives, signatures),
  - returns byte array for download endpoint.

---

## `ObjectifService`

Main role: business logic for objectives.

Important functions:

- `getByConvention`, `getByConventionAndStatut`, `getByConventionAndResponsable`, `getById` -> read.
- `create` -> validates party ownership and deadline within convention end date.
- `update` -> updates objective details + validates deadline.
- `updateStatut` -> progress update, only allowed if convention is `ACTIVE`.
- `delete` -> deletes objective and resets convention confirmations.

---

## `OrganisationPartenaireService`

Main role: partner organisation management.

Important functions:

- `getAll`, `getById`, `getByStatut`, `getMyDashboard` -> read.
- `create` -> optional user existence check then save.
- `update` -> admin full update.
- `updateContactInfo` -> partner updates only own organisation.
- `updateStatut` -> admin status update.
- `assignUser` -> link user to organisation.
- `delete` -> remove organisation.
- `findByUserId`, `findById` -> reusable lookup helpers.

---

## `MeetingInvitationService`

Main role: orchestrates meeting request flow.

Important function:

- `sendMeetingInvitation(partenaireId, request, senderRole, senderUserId)`
  - loads partner organisation,
  - resolves requester display name,
  - creates Zoom meeting via `ZoomMeetingService`,
  - sends notification email via `JavaMailSender`,
  - returns response with meeting info (`zoomMeetingId`, `zoomJoinUrl`, `zoomPassword`, etc.).

Helper functions:

- `buildMailBody` -> creates email text (requester name, date, note).
- `resolveRequesterName` -> uses request name or fetches user via `UserClient`.

---

## `ZoomMeetingService`

Main role: Zoom OAuth + meeting creation API integration.

Important functions:

- `fetchAccessToken` -> gets Zoom access token with account credentials.
- `createMeeting` -> calls Zoom API `/v2/users/{userId}/meetings` and returns meeting metadata.

Returns record:

- `ZoomMeetingData(meetingId, joinUrl, startUrl, password)`.

---

## `ZoomSignatureService`

Main role: create JWT signature used by Zoom Meeting SDK in frontend.

Important function:

- `generateSignature(meetingNumber, role)`
  - validates SDK credentials,
  - builds JWT claims (`iss`, `exp`, `iat`, `tpc`, `role_type`),
  - signs with `HS256`.

Used by `ZoomSignatureController` for embedded meeting join in Angular.

---

## Final Notes

- Controllers are the API entry points.
- Services hold the real business rules.
- Meeting flow currently combines:
  - Zoom meeting creation (`ZoomMeetingService`)
  - email sending (`MeetingInvitationService`)
  - SDK join signature (`ZoomSignatureService`).

If you want, I can also create a second file with the same explanation in French (`SERVICES_CONTROLLERS_EXPLAINED_FR.md`).

