from __future__ import annotations

from collections import Counter
from re import findall

from .schemas import NLPRequest, NLPResponse


class NLPPipeline:
    def analyze(self, request: NLPRequest) -> NLPResponse:
        text = request.text or request.description or ""
        words = [word.lower() for word in findall(r"[A-Za-zÀ-ÿ]{4,}", text)]
        keywords = [word for word, _ in Counter(words).most_common(8)]
        entities = self._extract_entities(text)
        summary = self._summarize(text)
        sentiment = self._sentiment(text)
        return NLPResponse(
            project_id=request.project_id,
            language=request.language,
            entities=entities,
            keywords=keywords,
            summary=summary,
            sentiment=sentiment,
        )

    def _extract_entities(self, text: str) -> list[dict[str, str]]:
        candidates = []
        for token in findall(r"\b[A-Z][A-Za-zÀ-ÿ0-9_-]{2,}\b", text):
            candidates.append({"text": token, "label": "MISC"})
        return candidates[:10]

    def _summarize(self, text: str) -> str:
        snippet = " ".join(text.split())[:240]
        return snippet if snippet else "Aucun texte fourni."

    def _sentiment(self, text: str) -> float:
        lowered = text.lower()
        positive = sum(term in lowered for term in ["innovation", "croissance", "profit", "solution", "ameliore"])
        negative = sum(term in lowered for term in ["risque", "bloque", "difficile", "manque", "probleme"])
        return max(min(0.5 + (positive - negative) * 0.08, 1.0), 0.0)
