import json
import re
import sys
from difflib import SequenceMatcher
from typing import Dict, List

import requests
from bs4 import BeautifulSoup

SEARCH_URL = "https://duckduckgo.com/html/"
STARTUP_DB_URL = "https://startup.gov.tn/fr/database"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"


def normalize(text: str) -> str:
    value = (text or "").lower()
    value = re.sub(r"[^a-z0-9\s]", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def jaccard_score(a: str, b: str) -> int:
    a_tokens = {w for w in normalize(a).split(" ") if len(w) > 2}
    b_tokens = {w for w in normalize(b).split(" ") if len(w) > 2}
    if not a_tokens or not b_tokens:
        return 0
    union = len(a_tokens | b_tokens)
    if union == 0:
        return 0
    return round((len(a_tokens & b_tokens) / union) * 100)


def ngram_overlap_score(a: str, b: str, n: int = 3) -> int:
    a_tokens = [w for w in normalize(a).split(" ") if len(w) > 2]
    b_tokens = [w for w in normalize(b).split(" ") if len(w) > 2]
    if len(a_tokens) < n or len(b_tokens) < n:
        return 0
    a_ngrams = {" ".join(a_tokens[i:i + n]) for i in range(len(a_tokens) - n + 1)}
    b_ngrams = {" ".join(b_tokens[i:i + n]) for i in range(len(b_tokens) - n + 1)}
    union = len(a_ngrams | b_ngrams)
    if union == 0:
        return 0
    return round((len(a_ngrams & b_ngrams) / union) * 100)


def hybrid_similarity(a: str, b: str) -> int:
    seq = int(round(SequenceMatcher(None, normalize(a), normalize(b)).ratio() * 100))
    jac = jaccard_score(a, b)
    ngram = ngram_overlap_score(a, b, 3)
    score = int(round((0.45 * seq) + (0.35 * jac) + (0.20 * ngram)))
    return max(0, min(100, score))


def query_web_snippets(query: str, max_results: int = 5) -> List[Dict[str, str]]:
    try:
        response = requests.get(
            SEARCH_URL,
            params={"q": query},
            headers={"User-Agent": USER_AGENT},
            timeout=10,
        )
        response.raise_for_status()
    except Exception:
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    cards = soup.select("div.result")
    results: List[Dict[str, str]] = []

    for card in cards:
        title_node = card.select_one("a.result__a")
        snippet_node = card.select_one("a.result__snippet") or card.select_one("div.result__snippet")
        url_node = card.select_one("a.result__url")

        title = title_node.get_text(" ", strip=True) if title_node else ""
        snippet = snippet_node.get_text(" ", strip=True) if snippet_node else ""
        href = title_node.get("href") if title_node else ""
        visible_url = url_node.get_text(" ", strip=True) if url_node else ""

        text = f"{title} {snippet}".strip()
        if not text:
            continue

        results.append(
            {
                "title": title,
                "snippet": snippet,
                "url": href or visible_url,
                "text": text,
            }
        )

        if len(results) >= max_results:
            break

    return results


def query_startup_database(seed_terms: str, max_results: int = 6) -> List[Dict[str, str]]:
    """Best-effort scraping for the Startup Tunisia database page.
    If structure changes or request fails, returns an empty list.
    """
    try:
        response = requests.get(
            STARTUP_DB_URL,
            headers={"User-Agent": USER_AGENT},
            timeout=10,
        )
        response.raise_for_status()
    except Exception:
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    terms = {t for t in normalize(seed_terms).split(" ") if len(t) > 2}
    candidates: List[Dict[str, str]] = []

    for card in soup.select("article, .card, .startup, .views-row, .item"):
        text = card.get_text(" ", strip=True)
        normalized = normalize(text)
        if not normalized or len(normalized) < 20:
            continue
        overlap = len(terms & set(normalized.split(" ")))
        if overlap == 0:
            continue
        title = card.select_one("h1, h2, h3, h4, .title")
        link = card.select_one("a[href]")
        candidates.append(
            {
                "title": title.get_text(" ", strip=True) if title else "Startup Tunisia entry",
                "snippet": text[:260],
                "url": link.get("href") if link else STARTUP_DB_URL,
                "text": text,
            }
        )

    return candidates[:max_results]


def detect(payload: Dict) -> Dict:
    title = str(payload.get("title") or "")
    description = str(payload.get("description") or "")
    project_type = str(payload.get("projectType") or "")
    budget = payload.get("budget")
    docs = payload.get("documents") or []

    docs_text = " ".join(str(d.get("content") or "")[:2000] for d in docs if isinstance(d, dict))
    source_text = f"{title} {description} {project_type} budget {budget} {docs_text}".strip()

    if len(normalize(source_text)) < 30:
        return {
            "ok": True,
            "score": 0,
            "message": "Contenu insuffisant pour un scan web anti-plagiat.",
            "sources": [],
        }

    query = f"{title} {project_type} {description[:140]}"
    web_results = query_web_snippets(query)
    startup_results = query_startup_database(source_text)
    combined_results = web_results + startup_results

    if not combined_results:
        return {
            "ok": True,
            "score": 0,
            "message": "Aucun resultat web exploitable pour anti-plagiat.",
            "sources": [],
        }

    scored = []
    max_score = 0
    for item in combined_results:
        score = hybrid_similarity(source_text, item.get("text", ""))
        max_score = max(max_score, score)
        scored.append(
            {
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "snippet": item.get("snippet", ""),
                "score": score,
            }
        )

    scored.sort(key=lambda x: x.get("score", 0), reverse=True)

    if max_score >= 55:
        message = f"Alerte plagiat web: similarite elevee detectee ({max_score}%)."
    elif max_score >= 35:
        message = f"Risque moyen de similarite web ({max_score}%). Verification recommandee."
    else:
        message = f"Risque faible de similarite web ({max_score}%)."

    return {
        "ok": True,
        "score": max_score,
        "message": message,
        "sources": scored[:5],
    }


def main() -> None:
    try:
        raw = sys.stdin.read() or "{}"
        payload = json.loads(raw)
        result = detect(payload)
        print(json.dumps(result, ensure_ascii=True))
    except Exception as exc:
        print(
            json.dumps(
                {
                    "ok": False,
                    "score": 0,
                    "message": f"Erreur BeautifulSoup scanner: {exc}",
                    "sources": [],
                },
                ensure_ascii=True,
            )
        )


if __name__ == "__main__":
    main()
