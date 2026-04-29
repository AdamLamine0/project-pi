from __future__ import annotations

from ..core.database import SessionLocal
from ..core.models import Recommendation
from .schemas import RecommendationItem, RecommendationRequest, RecommendationResponse


class RecommendationService:
    def recommend(self, request: RecommendationRequest) -> RecommendationResponse:
        items = self._generate(request)
        self._persist(request.project_id, items)
        return RecommendationResponse(project_id=request.project_id, items=items)

    def _generate(self, request: RecommendationRequest) -> list[RecommendationItem]:
        base_score = 0.65
        if request.sector:
            base_score += 0.05
        if request.stage:
            base_score += 0.05
        description = request.description or request.text or request.title
        items = [
            RecommendationItem(
                category="mvp",
                title="Clarifier le MVP",
                description="Isoler les 3 a 5 fonctionnalites critiques avant toute extension.",
                score=round(min(base_score, 0.95), 4),
                payload={"source": "heuristic"},
            ),
            RecommendationItem(
                category="go-to-market",
                title="Structurer le lancement",
                description="Préparer les premiers canaux d'acquisition et une boucle de feedback.",
                score=round(min(base_score - 0.05, 0.9), 4),
                payload={"context_length": len(description)},
            ),
            RecommendationItem(
                category="risk",
                title="Réduire le risque d'exécution",
                description="Documenter les hypothèses, les dépendances et les jalons de validation.",
                score=round(min(base_score - 0.1, 0.88), 4),
                payload={"sector": request.sector, "stage": request.stage},
            ),
        ]
        return items

    def _persist(self, project_id: int, items: list[RecommendationItem]) -> None:
        session = SessionLocal()
        try:
            session.query(Recommendation).filter(Recommendation.project_id == project_id).delete()
            for item in items:
                session.add(
                    Recommendation(
                        project_id=project_id,
                        category=item.category,
                        title=item.title,
                        description=item.description,
                        score=item.score,
                        payload=item.payload,
                    )
                )
            session.commit()
        finally:
            session.close()
