from __future__ import annotations

import hashlib
import json
import uuid
import requests
from bs4 import BeautifulSoup
from difflib import SequenceMatcher
from pathlib import Path
from typing import Iterable

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from ..core.database import SessionLocal
from ..core.models import PlagiarismResult
from ..core.redis import redis_client
from ..core.celery_app import celery_app
from .schemas import PlagiarismRequest, PlagiarismResponse, PlagiarismSource


class PlagiarismService:
    def __init__(self) -> None:
        self.startup_corpus = self._load_startup_corpus()
        self.transformer = None
        self._transformer_init_attempted = False

    def _ensure_transformer(self) -> bool:
        if self.transformer is not None:
            return True
        if self._transformer_init_attempted:
            return False

        self._transformer_init_attempted = True
        try:
            self.transformer = SentenceTransformer('all-MiniLM-L6-v2')
            return True
        except Exception as exc:
            print(f"SentenceTransformer unavailable, falling back to lexical similarity: {exc}")
            self.transformer = None
            return False

    def create_job(self, request: PlagiarismRequest) -> PlagiarismResponse:
        job_id = str(uuid.uuid4())
        cache_key = self._cache_key(request)
        cached = redis_client.get(cache_key)
        if cached:
            return PlagiarismResponse.model_validate_json(cached)

        async_result = self._dispatch_job(request.model_dump())
        response = PlagiarismResponse(
            project_id=request.project_id,
            job_id=async_result.id,
            score=0.0,
            status="queued",
            message="Analyse de plagiat mise en file d'attente.",
            sources=[],
            report={"job_id": async_result.id},
        )
        redis_client.setex(cache_key, 180, response.model_dump_json())
        return response

    def run_sync(self, request: PlagiarismRequest) -> PlagiarismResponse:
        score, sources, report = self._score_texts(request.title, request.description or "", request.document_texts, request.web_sources)
        response = PlagiarismResponse(
            project_id=request.project_id,
            score=score,
            status="completed",
            message=self._message(score),
            sources=sources,
            report=report,
        )
        self._persist(request.project_id, None, response)
        return response

    def _dispatch_job(self, payload: dict) -> object:
        return celery_app.send_task("app.plagiarism.tasks.run_plagiarism_analysis", args=[payload])

    def _score_texts(
        self,
        title: str,
        description: str,
        documents: Iterable[str],
        web_sources: Iterable[str],
    ) -> tuple[float, list[PlagiarismSource], dict[str, object]]:
        documents_list = [document for document in documents]
        web_sources_list = [source for source in web_sources]
        reference = f"{title}\n{description}".strip().lower()
        if not reference:
            reference = "\n".join(documents_list).strip().lower()
        if not reference:
            return 0.0, [], {"documents": 0, "web_sources": 0, "detail": "No reference text provided."}

        sources: list[PlagiarismSource] = []
        best_score = 0.0
        best_document_score = 0.0
        for index, document in enumerate(documents_list, start=1):
            document_text = document.strip().lower()
            if not document_text:
                continue
            similarity = self._hybrid_similarity(reference, document_text)
            best_score = max(best_score, similarity)
            best_document_score = max(best_document_score, similarity)
            sources.append(
                PlagiarismSource(
                    title=f"Document {index}",
                    url=f"local://document/{index}",
                    snippet=document[:240],
                    score=round(similarity, 4),
                )
            )

        corpus_sources, corpus_best = self._score_startup_corpus(reference)
        best_score = max(best_score, corpus_best)
        sources.extend(corpus_sources)
        web_sources_ranked, web_best = self._score_web_sources(reference, web_sources_list)
        best_score = max(best_score, web_best)
        sources.extend(web_sources_ranked)
        report = {
            "documents": len([document for document in documents_list if str(document).strip()]),
            "web_sources": len([source for source in web_sources_list if str(source).strip()]),
            "best_document_score": round(best_document_score, 4),
            "best_corpus_score": round(corpus_best, 4),
            "best_web_score": round(web_best, 4),
            "comparisons": len(sources),
        }
        return round(best_score, 4), sorted(sources, key=lambda item: item.score, reverse=True)[:5], report

    def _score_web_sources(self, reference: str, web_sources: Iterable[str]) -> tuple[list[PlagiarismSource], float]:
        sources: list[PlagiarismSource] = []
        best_score = 0.0
        for index, source in enumerate(web_sources, start=1):
            source_url = source.strip()
            if not source_url.startswith("http"):
                continue

            try:
                response = requests.get(source_url, timeout=5)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                texts = soup.find_all(['p', 'h1', 'h2', 'h3'])
                candidate_text = " ".join([t.get_text() for t in texts]).strip().lower()
                if not candidate_text:
                    continue
                candidate_text = candidate_text[:20000]
            except Exception:
                continue

            similarity = self._hybrid_similarity(reference, candidate_text)
            if similarity < 0.25:
                continue
            best_score = max(best_score, similarity)
            
            title = soup.title.string.strip() if soup and soup.title and soup.title.string else "Sans titre"
            sources.append(
                PlagiarismSource(
                    title=f"Source web {index} ({title[:30]})",
                    url=source_url,
                    snippet=candidate_text[:240],
                    score=round(similarity, 4),
                )
            )
        return sources, best_score

    def _hybrid_similarity(self, reference: str, candidate: str) -> float:
        seq = SequenceMatcher(None, reference[:1000], candidate[:1000]).ratio()
        if self._ensure_transformer():
            emb_ref = self.transformer.encode([reference[:5000]])
            emb_cand = self.transformer.encode([candidate[:5000]])
            semantic_sim = cosine_similarity(emb_ref, emb_cand)[0][0]
            # ML-based blend of semantic similarity and exact string matching
            score = (0.2 * seq) + (0.8 * semantic_sim)
        else:
            # Keep the API operational when model download/SSL environment is broken.
            score = seq
        return round(min(max(float(score), 0.0), 1.0), 4)

    def _tokenize(self, text: str) -> list[str]:
        return [token for token in ''.join(ch if ch.isalnum() else ' ' for ch in text.lower()).split() if len(token) > 2]

    def _ngrams(self, tokens: list[str], size: int) -> set[str]:
        if len(tokens) < size:
            return set()
        return {' '.join(tokens[i:i + size]) for i in range(0, len(tokens) - size + 1)}

    def _load_startup_corpus(self) -> list[dict]:
        corpus_path = Path(__file__).resolve().parent.parent / "data" / "tn_startup_corpus.json"
        if not corpus_path.exists():
            return []
        try:
            return json.loads(corpus_path.read_text(encoding="utf-8"))
        except Exception:
            return []

    def _score_startup_corpus(self, reference: str) -> tuple[list[PlagiarismSource], float]:
        if not self.startup_corpus:
            return [], 0.0

        sources: list[PlagiarismSource] = []
        best_score = 0.0
        for startup in self.startup_corpus:
            candidate_text = f"{startup.get('name', '')} {startup.get('sector', '')} {startup.get('description', '')}".strip().lower()
            if not candidate_text:
                continue
            similarity = self._hybrid_similarity(reference, candidate_text)
            if similarity < 0.35:
                continue
            best_score = max(best_score, similarity)
            sources.append(
                PlagiarismSource(
                    title=f"Startup TN: {startup.get('name', 'unknown')}",
                    url="https://startup.gov.tn/fr/database",
                    snippet=str(startup.get("description", ""))[:240],
                    score=round(similarity, 4),
                )
            )
        return sources, best_score

    def _message(self, score: float) -> str:
        if score >= 0.8:
            return "Attention : similarite tres elevee detectee. Revoir le contenu avant publication."
        if score >= 0.5:
            return "Similarite notable detectee. Certaines sections meritent d'etre reformulees."
        return "Aucun risque majeur detecte. Le contenu semble suffisamment differencie."

    def _persist(self, project_id: int, job_id: str | None, response: PlagiarismResponse) -> None:
        session = SessionLocal()
        try:
            session.add(
                PlagiarismResult(
                    project_id=project_id,
                    job_id=job_id,
                    score=response.score,
                    status=response.status,
                    sources=[source.model_dump() for source in response.sources],
                    report=response.report,
                )
            )
            session.commit()
        finally:
            session.close()

    def _cache_key(self, request: PlagiarismRequest) -> str:
        payload = request.model_dump_json()
        return f"plagiarism:{request.project_id}:{hashlib.sha256(payload.encode('utf-8')).hexdigest()}"
