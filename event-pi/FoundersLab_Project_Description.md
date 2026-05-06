# FoundersLab — Project Description

## Overview

**FoundersLab** is a Tunisian startup ecosystem platform built as a 4th-year engineering student Projet d'Intégration (PI) at ESPRIT. It is designed to connect entrepreneurs, mentors, investors, and partners within a unified digital workspace. The platform covers the full lifecycle of a startup's journey — from networking and events to partnerships, funding, and certification — and leverages AI to score and track startup growth.

---

## Architecture

FoundersLab is built on a **microservices architecture** with an Angular frontend and a Spring Boot backend, all communicating through an API Gateway.

```
Angular Frontend (port 4200)
        ↓  JWT in Authorization header
API Gateway (port 8090)
        ↓  validates JWT → injects X-User-Id, X-User-Role headers
        ↓
   ┌──────────────────────────────────────────┐
   │  event-pi        (port 8083)            │
   │  user-pi         (port 8081)            │
   │  partenariat-pi                         │
   └──────────────────────────────────────────┘
        ↓
    MySQL + Eureka (port 8761)
    + Groq / Gemini AI API
    + Gmail SMTP
    + Feign (inter-service calls)
```

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Angular 18, JWT interceptor, lazy-loaded modules, reactive forms |
| Backend | Spring Boot, Spring Data JPA, Hibernate, Spring Security |
| Inter-service | Feign clients, Eureka service discovery |
| AI | Groq AI / Gemini API (description generation, AI scoring) |
| Email | Gmail SMTP via Spring Mail |
| Storage | Local disk (images, PDFs, badges) |
| Database | MySQL (one schema per microservice) |
| Security | JWT (API Gateway validates and injects user context) |

---

## Modules & Features

### 1. User Module (`user-pi` — port 8081)

Handles all authentication, user management, and profile features.

**Key features:**
- Registration, login, OAuth2 (social login), password reset via email
- JWT-based authentication with role management (`ADMIN`, `USER`, `PARTNER`)
- Profile management — edit personal info, change password, upload avatar
- User list management (admin view)
- Exposes `GET /api/users/{id}` returning a `UserResponse` DTO (used by other microservices via Feign)

**Frontend pages:** Login, Register, Forgot Password, Reset Password, OAuth2 Callback, Profile, Set Password, User List

---

### 2. Event Module (`event-pi` — port 8083)

The core module of the platform. Manages the complete lifecycle of startup ecosystem events — creation, registration, attendance, and post-event certification.

#### 2.1 Event Management

**Entities:** `Event`, `EventProgram`, `Speaker`, `EventRegistration`

**Event fields:** title, description, type (webinaire / workshop / pitch / bootcamp / conférence), status (brouillon → publié → inscriptions → en_cours → terminé), start date, location type (présentiel / distanciel), capacity, cover image, target sector, target stage.

**Key features:**
- Full CRUD for events (admin/organizer)
- Cover image upload
- AI-generated event descriptions (Groq / Gemini API)
- Event program / agenda management (CRUD per event)
- Speaker management linked to events
- Pending events queue for admin validation
- Event stats (registrations count, attendance rate)

**Frontend pages:** Event List, Event Detail, Event Form, Pending Events, Speaker List

---

#### 2.2 Registration & Check-in

**Entity:** `EventRegistration`

**Fields:** event_id, user_id, status (inscrit / liste_attente / annulé / présent), attended (boolean), check_in_time

**Key features:**
- Users register for events (capacity enforcement, waitlist)
- Admin confirms or cancels registrations
- Admin triggers check-in via `PATCH /api/events/registrations/{id}/checkin`
- Check-in triggers the badge and certificate generation flow automatically

**Frontend:** Registration list with inline check-in actions

---

#### 2.3 Badges & Certificates (FA2)

Post-event credentialing system with QR-code verification.

**Entities:** `Badge`, `Certificate`

**Badge types:** `PARTICIPATION`, `SERIE_COMPLETION`

**Full flow:**
```
Admin triggers check-in
        ↓
BadgeService.onAttendanceConfirmed(userId, eventId)
        ↓
  1. Fetch user info via Feign (name, email)
  2. Create PARTICIPATION badge → saved to DB
  3. CertificateService.generateCertificate()
       → UUID verification token
       → PDF (navy A4 landscape, gold border)
       → Badge PNG (circular, navy/gold, colored QR centered)
       → Both saved to disk
  4. Email sent to user with PDF download link
  5. Check series completion (4 events of same type)
       → SERIE_COMPLETION badge if threshold reached
       → Series badge email notification
```

**Key technical decisions:**
- **Idempotency** — checks existence before generating, never duplicates for same `userId + eventId`
- **Resilience** — badge/cert failure never breaks check-in (wrapped in try/catch)
- **Async emails** — `@EnableAsync` + `@Async` so email never blocks the HTTP response
- **Security** — `/api/verify/**` is public (no JWT), all other endpoints require JWT
- **Secrets** — all API keys in `.env` (gitignored), loaded via dotenv-java before Spring context

**API endpoints:**
- `GET /api/badges/me` — current user's badges
- `GET /api/badges/{id}/image` — badge PNG image
- `GET /api/certificates/me` — current user's certificates
- `GET /api/certificates/{id}/download` — download PDF
- `GET /api/verify/{token}` — public QR scan verification (no JWT)

**Frontend pages:** My Badges (grid with icons/colors per type), My Certificates (list with PDF download + copy verify link), Verify Certificate (public page shown when QR is scanned)

---

### 3. Partnership Module (`partenariat-pi`)

Manages the relationship between the platform and external partner organizations.

**Entities:** `Partenaire` (organization), `Convention` (partnership agreement)

**Key features:**
- Partner organizations can register and manage their profile
- Convention management between partners and the platform
- Meeting request system between partners and the team
- Partner list and detail pages (public visibility)
- Admin view for managing partnership requests

**Frontend pages:** Partenaire List, Partenaire Details, Form Organisation, Mon Organisation, Convention List, Form Convention, Request Meeting

---

## Frontend Structure (Angular)

```
src/app/
├── core/
│   ├── components/navbar/         Global navigation bar
│   ├── interceptors/              JWT interceptor (attaches token to all requests)
│   ├── models/                    user.model.ts
│   └── services/                  auth.service.ts, auth.guard.ts, user.service.ts
│
├── layout/
│   └── layout.component.ts        FoundersLab sidebar layout (wraps protected routes)
│
├── models/
│   │   badge.ts, certificate.ts   Badge & Certificate interfaces
│   │   event.ts, registration.ts  Event & Registration interfaces
│   │   speaker.ts, program.ts     Speaker & EventProgram interfaces
│   └── partenaire.ts, convention.ts
│
├── modules/
│   ├── auth/                      Login, Register, Forgot/Reset Password, OAuth2
│   ├── event/
│   │   ├── components/            event-card, program-form, program-slot,
│   │   │                          registration-list, speaker-card, speaker-form
│   │   └── pages/                 event-detail, event-form, event-list,
│   │                              pending-events, speaker-list
│   ├── home/                      Landing / dashboard home
│   ├── partenaire/                convention-list, form-convention, form-organisation,
│   │                              mon-organisation, partenarie-details, partenarie-list
│   └── user/
│       ├── form-user/
│       ├── pages/
│       │   ├── my-badges/         Badges grid (FA2)
│       │   └── my-certificates/   Certificates list (FA2)
│       ├── profile/
│       ├── set-password/
│       └── user-list/
│
├── pages/
│   └── verify-certificate/        Public QR scan verification page (no auth)
│
└── services/
        badge.service.ts, certificate.service.ts
        event.service.ts, registration.service.ts
        speaker.service.ts, program.service.ts
        partenaire.service.ts, convention.service.ts, meeting.service.ts
```

### Routing Strategy

| Route | Module / Component | Auth |
|-------|--------------------|------|
| `/auth/**` | AuthModule | Public |
| `/verify/:token` | VerifyCertificateComponent | Public |
| `/` | HomeComponent (inside Layout) | Protected |
| `/events/**` | EventModule (inside Layout) | Protected |
| `/user/**` | UserModule (inside Layout) | Protected |
| `/partenariat/**` | PartenaireModule (inside Layout) | Protected |

---

## Backend Structure (event-pi)

```
src/main/java/org/example/eventpi/
│   EventPiApplication.java           @EnableAsync, dotenv loading
│
├── config/
│       SecurityConfig.java            JWT header extraction, public routes
│       WebConfig.java                 CORS, static resource serving (uploads/)
│
├── controller/
│       EventController.java
│       EventProgramController.java
│       EventRegistrationController.java
│       SpeakerController.java
│       BadgeController.java           (FA2)
│       CertificateController.java     (FA2)
│
├── dto/                               Request/Response DTOs for all entities
│
├── exception/
│       GlobalExceptionHandler.java    Centralized error handling
│
├── feign/
│       UserClient.java                Feign client → user-pi
│
├── model/
│       Event.java, EventProgram.java, EventRegistration.java
│       Speaker.java
│       Badge.java, BadgeType.java, Certificate.java   (FA2)
│       Enums: EventStatus, EventType, LocationType, RegistrationStatus...
│
├── repository/                        JPA repositories for all entities
│
└── service/
        EventService.java
        EventProgramService.java
        EventRegistrationService.java  checkIn() triggers badge flow
        SpeakerService.java
        GeminiService.java             AI description generation
        ImageStorageService.java       Cover image upload
        NotificationService.java       Gmail SMTP emails
        BadgeService.java              (FA2) Main badge orchestrator
        CertificateService.java        (FA2) PDF + PNG generation
        QrCodeService.java             (FA2) ZXing QR + circular badge PNG

uploads/
├── badges/       Generated badge PNGs
├── certificates/ Generated certificate PDFs
├── events/       Event cover images
└── speakers/     Speaker profile photos
```

---

## Key Cross-Cutting Concerns

| Concern | Solution |
|---------|----------|
| **Authentication** | JWT validated at API Gateway; user context injected as `X-User-Id`, `X-User-Role` headers |
| **Authorization** | Role-based checks in each microservice (`ADMIN`, `USER`, `PARTNER`) |
| **Inter-service calls** | Feign clients with Eureka service discovery |
| **Async processing** | `@EnableAsync` + `@Async` for email sending |
| **Secret management** | `.env` file (gitignored) loaded via dotenv-java before Spring context starts |
| **Error handling** | `GlobalExceptionHandler` with `@ControllerAdvice` per microservice |
| **File storage** | Local disk under `uploads/` with static resource exposure via WebConfig |
| **AI features** | Groq / Gemini API for event description generation and future AI scoring |
| **Email** | Gmail SMTP with Spring Mail for registration confirmations, certificates, badge awards |

---

## Planned / Future Features (from backlog)

- **AI startup scoring** — badges and certifications impact a global AI score per startup (`+points Formation structurée`)
- **Badge visibility** — badges displayed on the public entrepreneur profile and startup page
- **Mentoring module** — intelligent mentor-startup matching by sector and stage
- **Investment module** — pitch tracking and investor relations
- **Community module** — forums and collaboration spaces
- **Roadmaps module** — structured startup growth roadmaps
- **Dashboard KPIs** — analytics and growth tracking per startup
