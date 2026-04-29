from __future__ import annotations

import json
import re

from ..core.openrouter import OpenRouterClient
from .schemas import PlaygroundChatMessage, PlaygroundDimension, PlaygroundRequest, PlaygroundResponse, PlaygroundSuggestedEdit


class PlaygroundService:
    def __init__(self) -> None:
        self.openrouter = OpenRouterClient()

    def analyze(self, request: PlaygroundRequest) -> PlaygroundResponse:
        bmc_text = (request.bmc or "").strip()
        swot_text = (request.swot or "").strip()
        budget_text = (request.budget_notes or "").strip()
        docs_text = "\n".join((doc.content or "")[:5000] for doc in request.documents)
        user_message = (request.user_message or "").strip()
        draft_text = (request.document_draft or "").strip()
        document_title = (request.document_title or request.title or "Document AI").strip()

        bmc_score = self._coverage_score(bmc_text, [
            "segments", "proposition", "channels", "relation", "revenu",
            "ressources", "activites", "partenaires", "cout",
        ])
        swot_score = self._coverage_score(swot_text, ["strength", "weakness", "opportunit", "threat"])
        budget_score = self._budget_score(request.budget, budget_text)
        docs_score = min(1.0, len(request.documents) / 4.0)

        overall = round((0.35 * bmc_score + 0.25 * swot_score + 0.3 * budget_score + 0.1 * docs_score) * 100, 2)

        strengths: list[str] = []
        gaps: list[str] = []
        improvements: list[str] = []

        if bmc_score >= 0.7:
            strengths.append("Le BMC couvre les briques essentielles.")
        else:
            gaps.append("Le BMC est incomplet ou trop peu detaille.")
            improvements.append("Completer les 9 blocs du BMC avec des hypotheses testables.")

        if swot_score >= 0.65:
            strengths.append("Le SWOT est structure et exploitable.")
        else:
            gaps.append("Le SWOT manque de profondeur strategique.")
            improvements.append("Ajouter au moins 3 points concrets par axe SWOT.")

        if budget_score >= 0.7:
            strengths.append("La vision budgetaire est coherente.")
        else:
            gaps.append("Le budget ne permet pas encore un pilotage fiable.")
            improvements.append("Preciser CAPEX/OPEX, runway, et scenarios pessimiste/realiste/optimiste.")

        if docs_score < 0.5:
            improvements.append("Uploader davantage de documents (pitch, etude marche, projections).")

        if docs_text and len(re.findall(r"\b(client|marche|revenu|risque|concurren)\w*", docs_text.lower())) < 8:
            improvements.append("Renforcer la documentation avec des donnees marche et concurrence locales.")

        assistant_message = self._build_heuristic_message(request, overall, strengths, gaps, improvements)
        suggested_edits = self._build_suggested_edits(request, improvements, document_title, draft_text)
        document_draft = draft_text or self._build_document_draft(request)
        conversation = [
            *request.conversation,
            PlaygroundChatMessage(role="assistant", content=assistant_message),
        ]

        if self.openrouter.enabled:
            ai_payload = self._generate_ai_response(request, assistant_message, document_title, document_draft, suggested_edits, conversation)
            if ai_payload:
                return ai_payload

        dimensions = [
            PlaygroundDimension(
                name="Business Model Canvas",
                score=round(bmc_score * 100, 2),
                advice="Structurer la proposition de valeur, les segments et les revenus.",
            ),
            PlaygroundDimension(
                name="SWOT",
                score=round(swot_score * 100, 2),
                advice="Prioriser les risques critiques et les opportunites actionnables.",
            ),
            PlaygroundDimension(
                name="Budget",
                score=round(budget_score * 100, 2),
                advice="Aligner charges, traction attendue et runway de tresorerie.",
            ),
            PlaygroundDimension(
                name="Documents",
                score=round(docs_score * 100, 2),
                advice="Consolider les preuves et hypotheses dans des docs versionnes.",
            ),
        ]

        return PlaygroundResponse(
            project_id=request.project_id,
            overall_score=overall,
            strengths=strengths,
            gaps=gaps,
            improvements=improvements,
            dimensions=dimensions,
            assistant_message=assistant_message,
            document_title=document_title,
            document_draft=document_draft,
            suggested_edits=suggested_edits,
            conversation=conversation,
            mode="heuristic",
        )

    def _generate_ai_response(
        self,
        request: PlaygroundRequest,
        assistant_message: str,
        document_title: str,
        document_draft: str,
        suggested_edits: list[PlaygroundSuggestedEdit],
        conversation: list[PlaygroundChatMessage],
    ) -> PlaygroundResponse | None:
        prompt = {
            "project": {
                "title": request.title,
                "description": request.description,
                "sector": request.sector,
                "stage": request.stage,
                "budget": request.budget,
                "revenueModel": request.revenue_model,
                "teamSize": request.team_size,
                "goals": request.goals,
            },
            "analysis": {
                "bmc": request.bmc,
                "swot": request.swot,
                "budgetNotes": request.budget_notes,
                "documents": [{"name": doc.name, "kind": doc.kind, "preview": doc.content[:800]} for doc in request.documents],
                "conversation": [{"role": item.role, "content": item.content} for item in request.conversation],
                "userMessage": user_message if (user_message := (request.user_message or "").strip()) else None,
                "documentTitle": document_title,
                "documentDraft": document_draft[:4000],
            },
            "fallback": {
                "assistantMessage": assistant_message,
                "suggestedEdits": [edit.model_dump() for edit in suggested_edits],
            },
        }

        system_prompt = (
            "Tu es un copilote produit en francais pour une plateforme de creation de documents AI. "
            "Tu dois repondre en JSON strict, sans texte autour. "
            "Le JSON doit contenir: overall_score, strengths, gaps, improvements, dimensions, assistant_message, document_title, document_draft, suggested_edits. "
            "Chaque dimension doit avoir name, score et advice. Les suggested_edits doivent etre une liste d'objets {label, content}. "
            "Garde un ton concret, direct, utile pour des fondateurs et mentors."
        )

        ai_payload = self.openrouter.chat_json(
            [
                {
                    "role": "user",
                    "content": json.dumps(prompt, ensure_ascii=False),
                }
            ],
            system_prompt=system_prompt,
        )
        if not ai_payload:
            return None

        dimensions = self._parse_dimensions(ai_payload.get("dimensions") or [])
        suggested = [
            PlaygroundSuggestedEdit(label=str(item.get("label", "Suggestion")), content=str(item.get("content", "")))
            for item in (ai_payload.get("suggested_edits") or [])
            if isinstance(item, dict)
        ]
        conversation = [
            *request.conversation,
            PlaygroundChatMessage(role="assistant", content=str(ai_payload.get("assistant_message") or assistant_message)),
        ]
        return PlaygroundResponse(
            project_id=request.project_id,
            overall_score=self._clamp_score(ai_payload.get("overall_score", 0.0)),
            strengths=self._as_string_list(ai_payload.get("strengths")),
            gaps=self._as_string_list(ai_payload.get("gaps")),
            improvements=self._as_string_list(ai_payload.get("improvements")),
            dimensions=dimensions,
            assistant_message=str(ai_payload.get("assistant_message") or assistant_message),
            document_title=str(ai_payload.get("document_title") or document_title),
            document_draft=str(ai_payload.get("document_draft") or document_draft),
            suggested_edits=suggested or suggested_edits,
            conversation=conversation,
            mode="openrouter",
        )

    def _build_heuristic_message(
        self,
        request: PlaygroundRequest,
        overall: float,
        strengths: list[str],
        gaps: list[str],
        improvements: list[str],
    ) -> str:
        headline = f"Je peux faire mieux pour {request.title}. Score actuel: {overall:.1f}/100."
        highlights = "; ".join((strengths[:2] or ["aucun point fort encore formalise"]))
        blockers = "; ".join((gaps[:2] or ["aucun blocage critique"]))
        next_steps = improvements[:3]
        next_steps_text = "\n".join(f"- {item}" for item in next_steps) if next_steps else "- Consolider le brief et relancer."
        return f"{headline}\nForces: {highlights}\nPoints a renforcer: {blockers}\nProchaines actions:\n{next_steps_text}"

    def _build_document_draft(self, request: PlaygroundRequest) -> str:
        goals = "\n".join(f"- {goal}" for goal in request.goals) if request.goals else "- Valider les objectifs avec l'equipe"
        return (
            f"# {request.document_title or request.title}\n\n"
            f"## Resume executif\n{request.description or 'Aucune description fournie.'}\n\n"
            f"## Hypotheses principales\n"
            f"- Secteur: {request.sector or 'non precise'}\n"
            f"- Stage: {request.stage or 'non precise'}\n"
            f"- Budget: {request.budget if request.budget is not None else 'non defini'}\n"
            f"- Modele de revenus: {request.revenue_model or 'a definir'}\n\n"
            f"## Objectifs\n{goals}\n\n"
            f"## BMC\n{request.bmc or 'A completer avec les blocs essentiels.'}\n\n"
            f"## SWOT\n{request.swot or 'A completer avec forces, faiblesses, opportunites et menaces.'}\n\n"
            f"## Budget\n{request.budget_notes or 'A completer avec CAPEX, OPEX et runway.'}\n"
        )

    def _build_suggested_edits(
        self,
        request: PlaygroundRequest,
        improvements: list[str],
        document_title: str,
        draft_text: str,
    ) -> list[PlaygroundSuggestedEdit]:
        edits: list[PlaygroundSuggestedEdit] = []
        if request.description:
            edits.append(
                PlaygroundSuggestedEdit(
                    label="Renforcer le resume",
                    content=f"{document_title}\n\n{request.description.strip()}\n\nAjoute une phrase de valeur, le client cible et la traction attendue.",
                )
            )
        if improvements:
            edits.append(
                PlaygroundSuggestedEdit(
                    label="Plan d'action",
                    content="\n".join(f"- {item}" for item in improvements[:4]),
                )
            )
        if draft_text:
            edits.append(PlaygroundSuggestedEdit(label="Version courante", content=draft_text[:4000]))
        return edits[:3]

    def _parse_dimensions(self, raw_dimensions: list[object]) -> list[PlaygroundDimension]:
        parsed: list[PlaygroundDimension] = []
        for dimension in raw_dimensions:
            if not isinstance(dimension, dict):
                continue
            parsed.append(
                PlaygroundDimension(
                    name=str(dimension.get("name") or "Dimension"),
                    score=self._clamp_score(dimension.get("score", 0.0)),
                    advice=str(dimension.get("advice") or "Clarifier cette dimension."),
                )
            )
        if parsed:
            return parsed

        return [
            PlaygroundDimension(name="Business Model Canvas", score=0.0, advice="Structurer le BMC."),
            PlaygroundDimension(name="SWOT", score=0.0, advice="Clarifier le SWOT."),
            PlaygroundDimension(name="Budget", score=0.0, advice="Préciser les hypotheses budgetaires."),
            PlaygroundDimension(name="Documents", score=0.0, advice="Ajouter des documents de référence."),
        ]

    def _as_string_list(self, value: object) -> list[str]:
        if isinstance(value, list):
            return [str(item) for item in value if str(item).strip()]
        return []

    def _clamp_score(self, value: object) -> float:
        try:
            score = float(value)
        except Exception:
            score = 0.0
        if score > 100:
            score = score / 100.0
        return round(max(0.0, min(100.0, score)), 2)

    def _coverage_score(self, text: str, keywords: list[str]) -> float:
        if not text:
            return 0.0
        lowered = text.lower()
        hits = sum(1 for kw in keywords if kw in lowered)
        density = min(1.0, len(re.findall(r"\w+", lowered)) / 250.0)
        return min(1.0, 0.75 * (hits / max(1, len(keywords))) + 0.25 * density)

    def _budget_score(self, budget: float | None, budget_notes: str) -> float:
        value_score = 1.0 if (budget or 0) > 0 else 0.25
        notes_score = min(1.0, len(re.findall(r"\w+", (budget_notes or "").lower())) / 120.0)
        return min(1.0, 0.65 * value_score + 0.35 * notes_score)
