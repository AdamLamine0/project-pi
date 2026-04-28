# Full Project Classes Explained

This document explains **every class** in `src/main/java/org/example/partenariatpi` in simple words.

## Architecture in one line

`Controller -> Service -> Repository/Feign -> Database or External API`

- `Controller`: HTTP entry points.
- `Service`: business rules and workflows.
- `Repository`: data access with Spring Data JPA.
- `Feign`: calls another microservice (`user-pi`).
- `DTO`: API input/output objects.
- `Model`: JPA entities stored in database.
- `Enum`: controlled value sets.
- `Config`: Spring/Security setup.

---

## Application Entry Class

## `PartenariatPiApplication`

- Main Spring Boot launcher (`main` method).
- Enables:
  - service discovery (`@EnableDiscoveryClient`),
  - Feign clients (`@EnableFeignClients`),
  - method security (`@EnableMethodSecurity`).

---

## Config Package

## `config/SecurityConfig`

- Defines `SecurityFilterChain` bean.
- Disables CSRF and keeps app stateless (`SessionCreationPolicy.STATELESS`).
- Allows all requests because JWT is already validated at API Gateway level.

---

## Controller Package

## `controller/ConventionController`

**Base URL:** `/api/conventions`

Main API for convention lifecycle and PDF download.

Important methods:

- `getAll`: admin list all conventions.
- `getById`: get one convention (ownership checked).
- `downloadPdf`: returns generated PDF bytes.
- `getByUser`: conventions of one user.
- `getByOrganisation`: conventions of one organisation.
- `getByUserAndOrganisation`: combined filter.
- `getPendingRenewal`: list pending renewals.
- `create`: create convention.
- `update`: update convention dates/terms.
- `updateStatut`: manual status update.
- `confirmer`: confirm convention (optionally with signature).
- `demanderRenouvellement`: request renewal.
- `accepterRenouvellement`: accept renewal and create new terms.
- `annuler`: cancel/expire convention.
- `delete`: delete convention.

## `controller/ObjectifController`

**Base URL:** `/api/objectifs`

API for convention objectives.

Important methods:

- `getByConvention`, `getByConventionAndStatut`, `getByConventionAndResponsable`, `getById`.
- `create`, `update`, `updateStatut`, `delete`.

## `controller/OrganisationPartenaireController`

**Base URL:** `/api/organisations`

API for partner organisations.

Important methods:

- `getAll`, `getById`, `getByStatut`.
- `getMyDashboard`: partner reads own org profile.
- `updateContactInfo`: partner updates own contact data.
- `create`, `update`, `updateStatut`, `assignUser`, `delete` (admin actions).

## `controller/MeetingInvitationController`

**Base URL:** `/api/meeting-invitations`

API for requesting/sending meeting invitations.

Important method:

- `sendToPartenaire` (`POST /partenaire/{partenaireId}`):
  - checks role,
  - reads request,
  - delegates to `MeetingInvitationService`,
  - returns meeting + email send result.

## `controller/ZoomSignatureController`

**Base URL:** `/api/zoom`

API for embedded Zoom Meeting SDK signature.

Important method:

- `generateSignature` (`POST /signature`):
  - validates role,
  - generates SDK JWT signature,
  - returns `{ signature, sdkKey }` for frontend join.

---

## Service Package

## `service/ConventionService`

Business logic for conventions.

Important responsibilities:

- read/filter conventions,
- create convention + generate `numeroConvention`,
- confirmation rules (`confirmer`) between user and partner,
- reset confirmations after changes,
- status transitions,
- renewal request/accept flow,
- ownership checks (`checkIsParty`, `checkOwnership`),
- cancel/delete,
- date validation (`validateDates`).

## `service/ConventionPdfService`

Generates convention PDF with iText.

Important method:

- `generateConventionPdf(conventionId)`:
  - loads convention,
  - writes sections (header, parties, objectives, signatures),
  - returns `byte[]` for download.

## `service/ObjectifService`

Business logic for objectives.

Important responsibilities:

- read/filter objectives,
- create/update objective with convention party checks,
- validates deadline against convention end date,
- status updates only when convention is `ACTIVE`,
- delete objective and reset convention confirmations.

## `service/OrganisationPartenaireService`

Business logic for partner organisations.

Important responsibilities:

- CRUD and filtering by status,
- partner dashboard by `userId`,
- partner self-contact update,
- assign user to organisation,
- helper lookups (`findById`, `findByUserId`),
- verifies user existence through `UserClient`.

## `service/MeetingInvitationService`

Orchestrates meeting request flow.

Important responsibilities:

- resolve partner and requester name,
- create Zoom meeting via `ZoomMeetingService`,
- send email via `JavaMailSender`,
- build response with Zoom meeting credentials,
- build email body and sender display details.

## `service/ZoomMeetingService`

Integrates with Zoom Server-to-Server OAuth and Meeting APIs.

Important responsibilities:

- `fetchAccessToken`: obtains access token from Zoom OAuth endpoint,
- `createMeeting`: calls Zoom API to create meeting and returns details.

Nested record:

- `ZoomMeetingData`: small immutable holder for `meetingId`, `joinUrl`, `startUrl`, `password`.

## `service/ZoomSignatureService`

Generates Zoom Meeting SDK JWT signatures.

Important responsibilities:

- validate SDK credentials (`zoom.sdk-key`, `zoom.sdk-secret`),
- generate JWT claims (`iss`, `exp`, `iat`, `tpc`, `role_type`),
- sign JWT with HS256.

---

## Repository Package

## `repository/ConventionRepository`

JPA repository for `Convention`.

Custom query methods:

- `findByUserId`
- `findByOrganisationPartenaireId`
- `findByUserIdAndOrganisationPartenaireId`
- `findByRenouvellementDemandeParRoleIsNotNull`

## `repository/ObjectifRepository`

JPA repository for `Objectif`.

Custom query methods:

- `findByConventionId`
- `findByConventionIdAndStatut`
- `findByConventionIdAndResponsable`

## `repository/OrganisationPartenaireRepository`

JPA repository for `OrganisationPartenaire`.

Custom query methods:

- `findByUserId`
- `findByStatut`

---

## Model Package

## `model/Convention`

Entity representing a convention between one user and one partner organisation.

Main fields:

- party fields: `userId`, `organisationPartenaire`,
- dates: `dateDebut`, `dateFin`,
- status: `statut`,
- objective list: `objectifs`,
- signature fields: `signatureUser`, `signaturePartenaire`,
- renewal and confirmation tracking fields.

## `model/Objectif`

Entity representing one objective under a convention.

Main fields:

- relation: `convention`,
- content: `titre`, `description`,
- owner: `responsable`,
- progress: `statut`, `commentaire`,
- timing: `dateEcheance`, `dateCreation`.

## `model/OrganisationPartenaire`

Entity representing partner organisation details.

Main fields:

- identity: `nom`, `type`,
- contact: `contactNom`, `contactEmail`,
- profile: `description`, `siteWeb`, `region`,
- linked user account id: `userId`,
- partner status: `statut`.

---

## DTO Package

DTOs are simple objects used by API inputs/outputs and mapping.

## Convention DTO classes

- `dto/ConventionRequest`: payload to create/update convention (`organisationPartenaireId`, `userId`, dates).
- `dto/ConventionResponse`: payload returned to frontend with convention details, objectives, statuses, signatures.
- `dto/ConventionMapper`: maps between `Convention` entity and request/response DTOs.

## Objectif DTO classes

- `dto/ObjectifRequest`: payload to create/update objective.
- `dto/ObjectifResponse`: payload returned with objective details.
- `dto/ObjectifMapper`: maps between `Objectif` entity and request/response DTOs.

## Organisation DTO classes

- `dto/OrganisationPartenaireRequest`: payload for create/update organisation with validation.
- `dto/OrganisationPartenaireResponse`: returned organisation view model.
- `dto/OrganisationPartenaireMapper`: maps `OrganisationPartenaire` entity to/from DTOs.

## Meeting Invitation DTO classes

- `dto/MeetingInvitationRequest`: payload for meeting request (`requesterName`, subject, suggested date/time, duration, note).
- `dto/MeetingInvitationResponse`: returned meeting invitation + Zoom data (`zoomMeetingId`, `zoomJoinUrl`, `zoomPassword`, etc.).

## Zoom Signature DTO classes

- `dto/ZoomSignatureRequest`: payload containing `meetingNumber` and `role`.
- `dto/ZoomSignatureResponse`: returns generated `signature` and `sdkKey`.

---

## Enums Package

## `enums/ResponsableObjectif`

Defines who is responsible for an objective:

- `USER`, `PARTENAIRE`, `LES_DEUX`.

## `enums/StatutConvention`

Convention lifecycle status:

- `BROUILLON`, `SIGNEE`, `ACTIVE`, `EXPIREE`.

## `enums/StatutObjectif`

Objective progress status:

- `EN_COURS`, `ATTEINT`, `EN_RETARD`, `ANNULE`.

## `enums/StatutPartenaire`

Partner organisation status:

- `EN_ATTENTE`, `ACTIF`, `SUSPENDU`, `RESILIER`.

## `enums/TypePartenaire`

Partner organisation type:

- `ACADEMIQUE`, `INCUBATEUR`, `PUBLIC`, `ENTREPRISE`, `ASSOCIATIF`.

---

## Feign Package

## `feign/UserClient`

Feign interface to call `user-pi` service (`GET /api/users/{id}`).

## `feign/UserDto`

DTO holding user fields fetched from `user-pi` (`id`, `name`, `prenom`, `email`).

## `feign/FeignAuthInterceptor`

Copies incoming `Authorization` header from current request and forwards it in Feign calls.

---

## Final Summary

You now have a complete, layered microservice structure:

- controllers expose APIs,
- services apply rules and workflows,
- repositories read/write database,
- feign classes connect to user service,
- zoom services handle OAuth meeting creation + SDK signature,
- dto/model/enum classes define data contracts and allowed values.

