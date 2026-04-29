from __future__ import annotations

import json
from typing import Any

import requests

from .config import get_settings


class OpenRouterClient:
    def __init__(self) -> None:
        self.settings = get_settings()

    @property
    def enabled(self) -> bool:
        provider = self._resolve_provider()
        return provider is not None

    @property
    def provider_name(self) -> str:
        return self._resolve_provider() or "heuristic"

    def _resolve_provider(self) -> str | None:
        configured = (self.settings.ai_provider or "auto").strip().lower()
        if configured == "openrouter":
            return "openrouter" if self.settings.openrouter_api_key else None
        if configured in {"grok", "xai", "x.ai"}:
            return "grok" if self.settings.grok_api_key else None

        if self.settings.openrouter_api_key:
            return "openrouter"
        if self.settings.grok_api_key:
            return "grok"
        return None

    def _build_transport(self) -> tuple[str, dict[str, str], str]:
        provider = self._resolve_provider()
        if provider == "openrouter":
            return (
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    "Authorization": f"Bearer {self.settings.openrouter_api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost",
                    "X-Title": "PI ML Service",
                },
                self.settings.openrouter_model,
            )
        if provider == "grok":
            return (
                "https://api.x.ai/v1/chat/completions",
                {
                    "Authorization": f"Bearer {self.settings.grok_api_key}",
                    "Content-Type": "application/json",
                },
                self.settings.grok_model,
            )
        raise RuntimeError("No AI provider configured")

    def chat(self, messages: list[dict[str, str]], *, system_prompt: str, temperature: float = 0.35) -> str | None:
        if not self.enabled:
            return None

        endpoint, headers, model = self._build_transport()

        payload = {
            "model": model,
            "messages": [{"role": "system", "content": system_prompt}, *messages],
            "temperature": temperature,
        }

        response = requests.post(
            endpoint,
            headers=headers,
            json=payload,
            timeout=self.settings.openrouter_timeout_seconds,
        )
        response.raise_for_status()
        data = response.json()
        choices = data.get("choices") or []
        if not choices:
            return None
        return str((choices[0].get("message") or {}).get("content") or "").strip() or None

    def chat_json(self, messages: list[dict[str, str]], *, system_prompt: str, temperature: float = 0.2) -> dict[str, Any] | None:
        content = self.chat(messages, system_prompt=system_prompt, temperature=temperature)
        if not content:
            return None
        return self._extract_json(content)

    def _extract_json(self, content: str) -> dict[str, Any] | None:
        text = content.strip()
        if text.startswith("```"):
            text = text.strip("`")
            if text.lower().startswith("json"):
                text = text[4:]
            text = text.strip()

        try:
            parsed = json.loads(text)
            if isinstance(parsed, dict):
                return parsed
        except Exception:
            pass

        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                parsed = json.loads(text[start : end + 1])
                if isinstance(parsed, dict):
                    return parsed
            except Exception:
                return None
        return None