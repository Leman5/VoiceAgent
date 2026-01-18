"""
FastAPI application for OpenAI Realtime Voice Agent.
Provides WebSocket endpoint for real-time voice conversations.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from websocket_handler import handle_voice_websocket

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    logger.info("Starting Voice Agent Backend...")
    settings = get_settings()
    logger.info(f"Using model: {settings.openai_model}")
    logger.info(f"Using voice: {settings.openai_voice}")
    yield
    logger.info("Shutting down Voice Agent Backend...")


app = FastAPI(
    title="OpenAI Realtime Voice Agent",
    description="Real-time voice conversation API using OpenAI Realtime API",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "voice-agent-backend"}


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "service": "OpenAI Realtime Voice Agent",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "voice_websocket": "/ws/voice"
        }
    }


@app.websocket("/ws/voice")
async def voice_websocket(websocket: WebSocket):
    """
    WebSocket endpoint for real-time voice conversations.
    
    Protocol:
    - Client sends: {"type": "audio", "audio": "<base64-pcm16-24khz>"}
    - Client sends: {"type": "audio_commit"} when done speaking
    - Server sends: OpenAI Realtime API events (audio deltas, transcripts, etc.)
    """
    settings = get_settings()
    await handle_voice_websocket(websocket, settings)


if __name__ == "__main__":
    import uvicorn
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True
    )
