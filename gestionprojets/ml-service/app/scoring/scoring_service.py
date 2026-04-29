from __future__ import annotations

from ..core.config import get_settings
from ..core.database import SessionLocal
from ..core.models import MLScore
from .schemas import ProjectScoringRequest, ProjectScoringResponse

import xgboost as xgb
import numpy as np
import pickle
import os
from pathlib import Path


class ScoringService:
    def __init__(self) -> None:
        get_settings()
        self.model_version = "xgboost-maturity-v1"
        self.model = None
        self.label_encoder = None
        self.features_encoder = None
        self._load_trained_model()

    def _load_trained_model(self):
        """Load pre-trained XGBoost model from pickle files"""
        model_dir = Path(__file__).parent / "models"
        model_path = model_dir / "startup_maturity_model.pkl"
        label_encoder_path = model_dir / "label_encoder.pkl"
        features_encoder_path = model_dir / "features.pkl"
        
        try:
            # Load the trained XGBoost model
            if model_path.exists():
                with open(model_path, 'rb') as f:
                    self.model = pickle.load(f)
            else:
                raise FileNotFoundError(f"Model file not found at {model_path}")
            
            # Load label encoder if available
            if label_encoder_path.exists():
                with open(label_encoder_path, 'rb') as f:
                    self.label_encoder = pickle.load(f)
            
            # Load features encoder if available
            if features_encoder_path.exists():
                with open(features_encoder_path, 'rb') as f:
                    self.features_encoder = pickle.load(f)
                    
        except Exception as e:
            print(f"Warning: Could not load trained model: {e}. Model might not be available yet.")
            self.model = None

    def score(self, request: ProjectScoringRequest) -> ProjectScoringResponse:
        score, confidence, explanation, breakdown = self._heuristic_score(request)
        response = ProjectScoringResponse(
            project_id=request.project_id,
            score=score,
            confidence=confidence,
            label=self._label(score),
            explanation=explanation,
            feature_breakdown=breakdown,
            model_version=self.model_version,
        )
        self._persist(request, response)
        return response

    def _heuristic_score(self, request: ProjectScoringRequest) -> tuple[float, float, str, dict[str, float]]:
        """Score project using trained XGBoost model"""
        
        # Extract features for the trained model
        # Expected features: mvp, users, growth_rate, revenue, team_size, funding, retention_rate, market_score, fraud_flag
        
        mvp = 1 if request.has_pitch_deck else 0  # MVP exists if pitch deck exists
        users = int(request.extra_features.get('users', 0) or 0)  # Estimated users
        growth_rate = float(request.extra_features.get('growth_rate', 0) or 0)  # Monthly growth rate
        revenue = float(request.budget or 0)  # Use budget as proxy for revenue
        team_size = request.team_size or 1
        funding = float(request.extra_features.get('funding', 0) or 0)  # Funding received
        retention_rate = float(request.extra_features.get('retention_rate', 0.5) or 0.5)  # User retention
        
        # Calculate market score from description and sector
        desc_len = len((request.description or "").strip())
        market_score = min(1.0, (desc_len / 500.0) * (1 if request.sector else 0.5))
        
        fraud_flag = 0  # Flag for suspicious activity
        
        # Create feature array matching the trained model's expected input
        features = np.array([[
            mvp, 
            users, 
            growth_rate, 
            revenue, 
            team_size, 
            funding, 
            retention_rate, 
            market_score, 
            fraud_flag
        ]])
        
        breakdown = {
            "mvp": float(mvp),
            "users": float(users),
            "growth_rate": float(growth_rate),
            "revenue": float(revenue),
            "team_size": float(team_size),
            "funding": float(funding),
            "retention_rate": float(retention_rate),
            "market_score": float(market_score),
            "fraud_flag": float(fraud_flag),
        }
        
        try:
            if self.model is not None:
                # Use the trained model for prediction
                probs = self.model.predict_proba(features)[0]
                
                # Map class probabilities to maturity score (0.0 - 1.0)
                # Assuming 4 classes: 0=early, 1=needs-work, 2=promising, 3=strong
                class_weights = np.array([0.2, 0.45, 0.75, 0.95])
                
                # Handle case where model might not have all 4 classes
                classes_present = self.model.classes_
                if len(classes_present) == len(class_weights):
                    actual_weights = class_weights
                else:
                    # Map weights to available classes
                    actual_weights = class_weights[classes_present]
                
                model_score = float(np.sum(probs * actual_weights))
                confidence = round(float(np.max(probs)), 4)
                
                explanation = (
                    "Score calculé par le modèle XGBoost entraîné (Gradient Boosting). "
                    "Analyse les indicateurs clés : MVP, utilisateurs, taux de croissance, "
                    "financement et taille d'équipe pour évaluer la maturité du projet."
                )
            else:
                # Fallback if model not loaded
                model_score = self._fallback_score(request, breakdown)
                confidence = 0.5
                explanation = "Modèle en cours de chargement - score provisoire basé sur heuristiques."
                
        except Exception as e:
            print(f"Error during model prediction: {e}")
            model_score = self._fallback_score(request, breakdown)
            confidence = 0.3
            explanation = f"Erreur lors de la prédiction - score de secours utilisé."
        
        model_score = round(min(max(model_score, 0.0), 1.0), 4)
        return model_score, confidence, explanation, breakdown

    def _fallback_score(self, request: ProjectScoringRequest, breakdown: dict[str, float]) -> float:
        """Fallback scoring when trained model is not available"""
        title_len = len(request.title.strip())
        desc_len = len((request.description or "").strip())
        base_score = min(0.5, (desc_len / 500.0))
        
        if request.sector:
            base_score += 0.15
        if request.has_pitch_deck:
            base_score += 0.15
        if request.has_business_plan:
            base_score += 0.1
        if request.team_size:
            try:
                team_size_int = int(request.team_size)
                if team_size_int > 2:
                    base_score += 0.15
            except (ValueError, TypeError):
                pass
        
        return min(max(base_score, 0.0), 1.0)

    def _label(self, score: float) -> str:
        if score >= 0.8:
            return "strong"
        if score >= 0.6:
            return "promising"
        if score >= 0.4:
            return "needs-work"
        return "early"

    def _persist(self, request: ProjectScoringRequest, response: ProjectScoringResponse) -> None:
        session = SessionLocal()
        try:
            session.add(
                MLScore(
                    project_id=request.project_id,
                    sector=request.sector,
                    stage=request.stage,
                    score=response.score,
                    confidence=response.confidence,
                    explanation=response.explanation,
                    features={
                        "title": request.title,
                        "description": request.description,
                        "budget": request.budget,
                        "team_size": request.team_size,
                        "revenue_model": request.revenue_model,
                        **request.extra_features,
                    },
                )
            )
            session.commit()
        finally:
            session.close()
