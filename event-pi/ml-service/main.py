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
    ModelInfoResponse,
    PredictionInput,
    RegistrationPrediction,
    SuccessPrediction,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("ml-service")

state: dict = {
    "reg_model": None,
    "score_model": None,
    "metrics": {},
    "n_real_with_regs": 0,
}


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Bootstrapping ml-service: generating synthetic data...")
    synthetic_df = generate_synthetic_data(n=800)

    real_df = None
    n_real_with_regs = 0
    try:
        logger.info("Loading real events from DB...")
        real_df, n_real_with_regs = load_real_events()
        logger.info(
            "Loaded %d real events, %d with confirmed registrations",
            0 if real_df is None else len(real_df),
            n_real_with_regs,
        )
    except Exception as exc:
        logger.warning("Could not load real events (%s); training on synthetic only", exc)

    training_df = build_training_frame(real_df, synthetic_df)
    logger.info("Training on %d rows...", len(training_df))

    reg_model, score_model, metrics = train_models(training_df)
    state["reg_model"]        = reg_model
    state["score_model"]      = score_model
    state["metrics"]          = metrics
    state["n_real_with_regs"] = n_real_with_regs
    logger.info("Models ready — %s  n_real_with_regs=%d", metrics, n_real_with_regs)
    yield
    state.clear()


app = FastAPI(title="ml-service", version="2.1.0", lifespan=lifespan)

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


@app.get("/model-info", response_model=ModelInfoResponse)
def model_info():
    return ModelInfoResponse(**state["metrics"])


@app.post("/predict/registrations", response_model=RegistrationPrediction)
def predict_registrations(payload: PredictionInput):
    df   = input_to_frame(payload.model_dump())
    pred = state["reg_model"].predict(df)[0]
    pred = max(0, min(int(round(float(pred))), int(payload.capacity_max)))
    return RegistrationPrediction(predicted_registrations=pred)


@app.post("/predict/success-score", response_model=SuccessPrediction)
def predict_success(payload: PredictionInput):
    df    = input_to_frame(payload.model_dump())
    score = float(state["score_model"].predict(df)[0])
    score = max(0.0, min(100.0, score))
    return SuccessPrediction(success_score=round(score, 2), label=score_label(score))


@app.post("/predict/full-analysis", response_model=FullAnalysisResponse)
def predict_full_analysis(payload: PredictionInput):
    return full_analysis(
        state["reg_model"],
        state["score_model"],
        payload.model_dump(),
        n_real_with_regs=state["n_real_with_regs"],
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8085, reload=False)
