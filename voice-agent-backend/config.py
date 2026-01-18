"""
Configuration settings for the Voice Agent backend.
Loads from environment variables with sensible defaults.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal, Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )
    
    # OpenAI Configuration
    openai_api_key: str
    openai_model: str = "gpt-4o-realtime-preview-2024-12-17"
    openai_voice: str = "alloy"  # Any voice: alloy, ash, ballad, coral, echo, sage, shimmer, verse, marin, etc.
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Audio Configuration (PCM16 at 24kHz is required by OpenAI Realtime API)
    audio_format: str = "pcm16"
    sample_rate: int = 24000
    
    # RapidAPI Configuration (for property search)
    rapidapi_key: Optional[str] = None
    rapidapi_host: str = "realty-in-au.p.rapidapi.com"
    
    @property
    def openai_realtime_url(self) -> str:
        """WebSocket URL for OpenAI Realtime API."""
        return f"wss://api.openai.com/v1/realtime?model={self.openai_model}"
    
    @property
    def openai_headers(self) -> dict:
        """Headers for OpenAI Realtime API connection."""
        return {
            "Authorization": f"Bearer {self.openai_api_key}",
            "OpenAI-Beta": "realtime=v1"
        }


def get_settings() -> Settings:
    """Get application settings singleton."""
    return Settings()
