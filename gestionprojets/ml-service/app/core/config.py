from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "pi-ml-service"
    api_prefix: str = "/api/ml"
    mysql_url: str | None = Field(default=None)
    sqlite_url: str = Field(default="sqlite:///./pi_ml.db")
    redis_url: str = Field(default="redis://localhost:6379/0")
    redis_cache_ttl_seconds: int = 3600
    artifact_dir: str = Field(default="./artifacts")
    default_language: str = "fr"
    ai_provider: str = "grok"
    openrouter_api_key: str | None = None
    openrouter_model: str = "openai/gpt-4o-mini"
    grok_api_key: str | None = None
    grok_model: str = "grok-3-mini"
    openrouter_timeout_seconds: int = 45

    @property
    def database_url(self) -> str:
        return self.mysql_url or self.sqlite_url


@lru_cache
def get_settings() -> Settings:
    return Settings()
