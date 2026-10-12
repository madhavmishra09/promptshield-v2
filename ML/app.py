from pathlib import Path

import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "promptshield_tfidf_lr.joblib"

if not MODEL_PATH.exists():
    raise RuntimeError(f"Model not found: {MODEL_PATH}")

saved = joblib.load(MODEL_PATH)
model = saved["model"]
THRESHOLD = float(saved["threshold"])

app = FastAPI(
    title="PromptShield ML API",
    version="1.0.0",
)


class PredictRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=20000)


class PredictResponse(BaseModel):
    probability: float
    threshold: float
    is_injection: bool


@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": True,
        "threshold": THRESHOLD,
    }


@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    prompt = request.prompt.strip()

    if not prompt:
        raise HTTPException(
            status_code=422,
            detail="Prompt cannot be empty.",
        )

    try:
        probability = float(
            model.predict_proba([prompt])[0][1]
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Model prediction failed.",
        ) from exc

    return {
        "probability": probability,
        "threshold": THRESHOLD,
        "is_injection": probability >= THRESHOLD,
    }
