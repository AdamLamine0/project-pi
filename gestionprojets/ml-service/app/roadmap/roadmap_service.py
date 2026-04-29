from __future__ import annotations

import json
from datetime import datetime
from typing import Any

from ..core.database import SessionLocal
from ..core.models import RoadmapStep, RoadmapTemplate
from ..core.openrouter import OpenRouterClient
from .schemas import RoadmapRequest, RoadmapResponse, RoadmapStep as RoadmapStepSchema


class RoadmapService:
    def __init__(self) -> None:
        self.ai_client = OpenRouterClient()

    def build(self, request: RoadmapRequest) -> RoadmapResponse:
        ai_steps = self._generate_with_ai(request)
        if ai_steps:
            steps = ai_steps
            method = self.ai_client.provider_name
            summary = f"Roadmap générée avec {self.ai_client.provider_name}."
        else:
            templates = self._rank_templates(request)
            if templates:
                steps = self._generate_from_templates(request, templates)
                method = "template-ranking"
                summary = "Roadmap priorisée à partir des templates sectoriels et du contexte projet."
            else:
                steps = self._generate_fallback(request)
                method = "heuristic-fallback"
                summary = "Roadmap heuristique générée à partir du contexte fourni."
        self._persist(request, steps)
        return RoadmapResponse(project_id=request.project_id, generation_method=method, summary=summary, steps=steps)

    def _generate_with_ai(self, request: RoadmapRequest) -> list[RoadmapStepSchema] | None:
        if not self.ai_client.enabled:
            return None

        system_prompt = (
            "Tu es un expert produit qui génère des roadmaps actionnables pour startup. "
            "Réponds uniquement en JSON strict au format: {\"steps\": [ ... ]}. "
            "Chaque étape doit contenir: title, description, phase (discovery|build|validation|launch), "
            "duration_weeks (1-12), owner_hint, confidence (0-1). "
            "Retourne entre 6 et 8 étapes, ordonnées, sans texte hors JSON."
        )

        prompt = {
            "project": {
                "id": request.project_id,
                "title": request.title,
                "description": request.description,
                "sector": request.sector,
                "stage": request.stage,
                "budget": request.budget,
                "team_size": request.team_size,
                "objectives": request.objectives,
            },
            "feedback": request.feedback,
            "document_summary": request.document_summary,
        }

        payload = self.ai_client.chat_json(
            [{"role": "user", "content": json.dumps(prompt, ensure_ascii=False)}],
            system_prompt=system_prompt,
            temperature=0.25,
        )
        if not payload:
            return None

        raw_steps = payload.get("steps")
        if not isinstance(raw_steps, list):
            return None

        phases = {"discovery", "build", "validation", "launch"}
        parsed: list[RoadmapStepSchema] = []
        for index, item in enumerate(raw_steps, start=1):
            if not isinstance(item, dict):
                continue
            title = str(item.get("title") or "Etape roadmap").strip()
            description = str(item.get("description") or "Action à exécuter.").strip()
            phase = str(item.get("phase") or "build").strip().lower()
            if phase not in phases:
                phase = self._phase_for_index(index)
            try:
                duration = int(item.get("duration_weeks", 2))
            except Exception:
                duration = 2
            duration = max(1, min(duration, 12))
            try:
                confidence = float(item.get("confidence", 0.8))
            except Exception:
                confidence = 0.8
            confidence = max(0.0, min(confidence, 0.99))

            parsed.append(
                RoadmapStepSchema(
                    id=f"step-{index}",
                    title=title,
                    description=description,
                    phase=phase,
                    order=index,
                    duration_weeks=duration,
                    owner_hint=str(item.get("owner_hint") or self._owner_hint_by_phase(phase)),
                    dependencies=[f"step-{index - 1}"] if index > 1 else [],
                    confidence=round(confidence, 4),
                )
            )

        return self._merge_feedback(request, parsed[:8]) if parsed else None

    def _rank_templates(self, request: RoadmapRequest) -> list[RoadmapTemplate]:
        session = SessionLocal()
        try:
            query = session.query(RoadmapTemplate).filter(RoadmapTemplate.is_active.is_(True))
            if request.sector:
                query = query.filter((RoadmapTemplate.sector == request.sector) | (RoadmapTemplate.sector.is_(None)))
            if request.stage:
                query = query.filter((RoadmapTemplate.stage == request.stage) | (RoadmapTemplate.stage.is_(None)))
            templates = query.order_by(RoadmapTemplate.score.desc()).limit(8).all()
            return templates
        finally:
            session.close()

    def _generate_from_templates(self, request: RoadmapRequest, templates: list[RoadmapTemplate]) -> list[RoadmapStepSchema]:
        steps: list[RoadmapStepSchema] = []
        for index, template in enumerate(templates, start=1):
            steps.append(
                RoadmapStepSchema(
                    id=f"step-{index}",
                    title=template.title,
                    description=template.description,
                    phase=self._phase_for_index(index),
                    order=index,
                    duration_weeks=2 if index <= 2 else 3,
                    owner_hint=self._owner_hint(template),
                    dependencies=[f"step-{index - 1}"] if index > 1 else [],
                    confidence=round(min(0.55 + (template.score / 2.0), 0.98), 4),
                )
            )
        return self._merge_feedback(request, steps)

    def _generate_fallback(self, request: RoadmapRequest) -> list[RoadmapStepSchema]:
        base_steps = [
            ("Discovery", "Valider le besoin, le marché et les contraintes.", "discovery", 1),
            ("Architecture", "Définir l'architecture produit et les rôles clés.", "build", 2),
            ("MVP", "Construire le noyau fonctionnel et les premiers écrans.", "build", 3),
            ("Validation", "Tester, corriger et préparer le lancement.", "validation", 4),
            ("Launch", "Déployer, mesurer et itérer.", "launch", 5),
        ]
        steps = [
            RoadmapStepSchema(
                id=f"step-{index}",
                title=title,
                description=description,
                phase=phase,
                order=index,
                duration_weeks=2 if index < 4 else 3,
                owner_hint=self._owner_hint_by_phase(phase),
                dependencies=[f"step-{index - 1}"] if index > 1 else [],
                confidence=0.68 if index < 4 else 0.74,
            )
            for index, (title, description, phase, _) in enumerate(base_steps, start=1)
        ]
        return self._merge_feedback(request, steps)

    def _merge_feedback(self, request: RoadmapRequest, steps: list[RoadmapStepSchema]) -> list[RoadmapStepSchema]:
        feedback = (request.feedback or "").strip().lower()
        if not feedback:
            return steps
        for step in steps:
            if "commercial" in feedback and step.phase == "launch":
                step.description = f"{step.description} Inclure le plan commercial demandé par le porteur."
                step.confidence = min(step.confidence + 0.04, 0.99)
            if "technique" in feedback and step.phase == "build":
                step.description = f"{step.description} Renforcer la validation technique selon le retour reçu."
                step.confidence = min(step.confidence + 0.04, 0.99)
        return steps

    def _persist(self, request: RoadmapRequest, steps: list[RoadmapStepSchema]) -> None:
        session = SessionLocal()
        try:
            session.query(RoadmapStep).filter(RoadmapStep.project_id == request.project_id).delete()
            for step in steps:
                session.add(
                    RoadmapStep(
                        project_id=request.project_id,
                        title=step.title,
                        description=step.description,
                        phase=step.phase,
                        order_index=step.order,
                        status="A_FAIRE",
                    )
                )
            session.commit()
        finally:
            session.close()

    def _phase_for_index(self, index: int) -> str:
        if index <= 2:
            return "discovery"
        if index <= 4:
            return "build"
        if index <= 6:
            return "validation"
        return "launch"

    def _owner_hint(self, template: RoadmapTemplate) -> str:
        metadata: dict[str, Any] = template.metadata_json or {}
        return metadata.get("owner_hint") or self._owner_hint_by_phase(self._phase_for_index(template.id or 1))

    def _owner_hint_by_phase(self, phase: str) -> str:
        return {
            "discovery": "Fondateur + produit",
            "build": "Produit + technique",
            "validation": "Produit + QA",
            "launch": "Croissance + support",
        }.get(phase, "Fondateur")
