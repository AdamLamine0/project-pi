import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import load_real_events
from ml import (
    build_training_frame,
    full_analysis,
    generate_synthetic_data,
    input_to_frame,
    score_label,
    train_models,
)
from schemas import (
    FullAnalysisResponse,
    HealthResponse,
    PredictionInput,
    RegistrationPrediction,
    SuccessPrediction,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("ml-service")

state = {"reg_model": None, "score_model": None}


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Bootstrapping ml-service: generating synthetic data...")
    synthetic_df = generate_synthetic_data(n=500)

    real_df = None
    try:
        logger.info("Loading real events from DB...")
        real_df = load_real_events()
        logger.info("Loaded %d real events", 0 if real_df is None else len(real_df))
    except Exception as exc:
        logger.warning("Could not load real events (%s); training on synthetic only", exc)

    training_df = build_training_frame(real_df, synthetic_df)
    logger.info("Training on %d rows...", len(training_df))

    reg_model, score_model = train_models(training_df)
    state["reg_model"] = reg_model
    state["score_model"] = score_model
    logger.info("Models trained and ready.")
    yield
    state.clear()


app = FastAPI(title="ml-service", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(status="ok")


@app.post("/predict/registrations", response_model=RegistrationPrediction)
def predict_registrations(payload: PredictionInput):
    df = input_to_frame(payload.model_dump())
    pred = state["reg_model"].predict(df)[0]
    pred = max(0, int(round(float(pred))))
    pred = min(pred, int(payload.capacity_max))
    return RegistrationPrediction(predicted_registrations=pred)


@app.post("/predict/success-score", response_model=SuccessPrediction)
def predict_success(payload: PredictionInput):
    df = input_to_frame(payload.model_dump())
    score = float(state["score_model"].predict(df)[0])
    score = max(0.0, min(100.0, score))
    return SuccessPrediction(success_score=round(score, 2), label=score_label(score))


@app.post("/predict/full-analysis", response_model=FullAnalysisResponse)
def predict_full_analysis(payload: PredictionInput):
    result = full_analysis(state["reg_model"], state["score_model"], payload.model_dump())
    return result


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8085, reload=False)
