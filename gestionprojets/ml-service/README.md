# PI ML Service

FastAPI microservice for scoring, roadmap generation, plagiarism analysis, NLP, recommendations, and the AI playground chat experience.

## Endpoints

- `POST /api/ml/projects/{project_id}/score`
- `POST /api/ml/projects/{project_id}/roadmap`
- `POST /api/ml/projects/{project_id}/plagiarism`
- `POST /api/ml/projects/{project_id}/nlp`
- `POST /api/ml/projects/{project_id}/recommendations`
- `POST /api/ml/projects/{project_id}/playground`
- `GET /health`

## Local run

1. Copy `.env.example` to `.env` and adapt values.
2. Configure AI provider (optional):
   - `AI_PROVIDER=auto` (default): uses OpenRouter if configured, otherwise Grok/xAI, otherwise heuristic fallback.
   - `AI_PROVIDER=openrouter`: requires `OPENROUTER_API_KEY`.
   - `AI_PROVIDER=grok`: requires `GROK_API_KEY`.
   - Choose model with `OPENROUTER_MODEL` or `GROK_MODEL`.
   Without valid provider credentials, the service falls back to a heuristic writer.
3. Install dependencies:
   - `pip install -r requirements.txt`
4. Run API:
   - `uvicorn app.main:app --host 0.0.0.0 --port 8001`
5. Run worker (optional async queue):
   - `celery -A app.core.celery_app.celery_app worker --loglevel=info`

## Docker

- `docker compose up --build`

## Database schema

- SQL bootstrap file: `sql/schema.sql`
- SQLAlchemy also creates managed tables at startup.
