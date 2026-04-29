# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FoundersLab is a Tunisian startup ecosystem platform built as a microservices system. This repository contains two services:

- **event-pi** — Spring Boot 4.0.4 / Java 17 microservice (port 8083) for event management, registrations, badges, certificates, and ML predictions
- **ml-service** — FastAPI / Python 3 service (port 8085) for ML-powered event analytics

The broader system (not in this repo) includes `user-pi` (port 8081), `partenariat-pi`, an API Gateway (port 8090), and Eureka Service Discovery (port 8761).

## Build & Run Commands

### event-pi (Spring Boot / Maven)

```bash
# Build
mvn clean package

# Run
mvn spring-boot:run
# or: java -jar target/event-pi-0.0.1-SNAPSHOT.jar

# Run a single test class
mvn test -Dtest=ClassName

# Run a single test method
mvn test -Dtest=ClassName#methodName
```

Requires: MySQL on `localhost:3306` (database `event_db`) and a `.env` file at the project root.

### ml-service (FastAPI / Python)

```bash
cd ml-service

# Install dependencies
pip install -r requirements.txt

# Run (models train at startup)
python main.py
# or: uvicorn main:app --host 0.0.0.0 --port 8085 --reload=false
```

Requires: MySQL accessible (same `event_db`) and a `.env` file in `ml-service/`.

## Environment Configuration

Both services use `.env` files loaded via `dotenv-java` / `python-dotenv`. Required variables:

```
DB_USERNAME=root
DB_PASSWORD=
DB_HOST=localhost          # ml-service only
DB_PORT=3306               # ml-service only
DB_NAME=event_db           # ml-service only
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your_app_password
GROQ_API_KEY=your_groq_key
```

## Architecture

### Security Model
JWT authentication is handled entirely at the API Gateway. The gateway validates tokens and injects `X-User-Id` and `X-User-Role` headers into downstream requests. `SecurityConfig` in event-pi reads these headers — it does **not** validate JWTs itself. Public endpoints are `/api/verify/**` (QR code verification) and `/api/tickets/*/verify`.

### Inter-service Communication
`UserClient` (Feign) calls `user-pi` via Eureka discovery. Feign connect/read timeout is 3 seconds. If Eureka is unavailable, the service will fail to start.

### Event Lifecycle
Events move through states: Draft → Pending Admin Approval → Published → Open for Registration → In Progress → Completed. AI description generation uses Groq/Gemini API via `GeminiService`.

### Registration & Check-in Flow
`EventRegistrationService` enforces capacity limits and waitlists. On admin check-in (`PATCH /api/events/registrations/{id}/checkin`), badge and certificate generation is triggered in a separate `REQUIRES_NEW` transaction so failures there don't roll back the check-in itself.

### Badge & Certificate Generation
- **PARTICIPATION** badges: generated per event check-in
- **SERIE_COMPLETION** badges: triggered when a user completes 4 events of the same type
- Certificates are landscape A4 PDFs (navy/gold design) with embedded QR codes (ZXing)
- Files are stored locally under `uploads/{events,speakers,certificates,badges}/`
- Email delivery is `@Async` to avoid blocking HTTP responses

### ML Service
`main.py` trains two RandomForest models at startup (synchronous — expect a brief delay):
1. **Registration predictor** — outputs min/max/point estimate + confidence score
2. **Success scorer** — 0–100 scale (Poor/Fair/Good/Excellent)

`db.py` loads real events from MySQL and augments with 1000 synthetic rows. If the DB is unreachable, it falls back to synthetic data only. Key endpoints: `/predict/registrations`, `/predict/success-score`, `/predict/full-analysis`.

## Key Source Locations

| Area | Path |
|------|------|
| Security & CORS config | `src/main/java/org/example/eventpi/config/` |
| All REST controllers | `src/main/java/org/example/eventpi/controller/` |
| Business logic | `src/main/java/org/example/eventpi/service/` |
| JPA entities | `src/main/java/org/example/eventpi/model/` |
| Feign client (user-pi) | `src/main/java/org/example/eventpi/feign/UserClient.java` |
| Global error handling | `src/main/java/org/example/eventpi/exception/GlobalExceptionHandler.java` |
| ML models & features | `ml-service/ml.py` |
| ML DB loader | `ml-service/db.py` |
| ML API schemas | `ml-service/schemas.py` |

## Important Patterns

- **Lombok** is used extensively (`@Data`, `@Builder`, `@RequiredArgsConstructor`) — avoid generating boilerplate manually.
- **Transaction isolation**: badge/cert generation uses `Propagation.REQUIRES_NEW`; wrap any similarly risky side-effects the same way.
- **File uploads**: max 5 MB per file; files served as static resources via `WebConfig`.
- **CORS**: frontend expected at `http://localhost:4200`.
- **ML feature engineering**: 12 base features + 7 derived features defined in `ml-service/ml.py`; adding a new feature requires updating both the feature list and the synthetic data generator.