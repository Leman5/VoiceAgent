"""
OpenAI Realtime API client for voice conversations.
Handles WebSocket connection and message streaming with OpenAI.
"""

import asyncio
import json
import logging
from typing import Callable, Awaitable, Optional
import websockets
from websockets.asyncio.client import ClientConnection

from config import Settings
from realty_api import REALTY_TOOLS

logger = logging.getLogger(__name__)


class OpenAIRealtimeClient:
    """
    Client for OpenAI Realtime API.
    Manages WebSocket connection and bidirectional streaming.
    """
    
    def __init__(self, settings: Settings):
        self.settings = settings
        self.ws: Optional[ClientConnection] = None
        self._receive_task: Optional[asyncio.Task] = None
        
    async def connect(self) -> None:
        """Establish WebSocket connection to OpenAI Realtime API."""
        logger.info(f"Connecting to OpenAI Realtime API: {self.settings.openai_realtime_url}")
        
        self.ws = await websockets.connect(
            self.settings.openai_realtime_url,
            additional_headers=self.settings.openai_headers,
        )
        
        logger.info("Connected to OpenAI Realtime API")
        
        # Configure the session
        await self._configure_session()
    
    async def _configure_session(self) -> None:
        """Send initial session configuration to OpenAI."""
        session_config = {
            "type": "session.update",
            "session": {
                "modalities": ["text", "audio"],
                "instructions": """Act as a realtime audio output real estate agent for Australian properties. Speak in an emotive, friendly tone. Keep responses short and conversational.

IMPORTANT: When users ask about properties, USE the search_properties function to find real listings. When they want details, use get_property_details.

Guidelines:
- Always ask a short follow-up after each answer.
- When presenting properties, briefly mention key details then ask what they'd like to know more.
- Keep responses to 5-20 words unless asked for more.
- Never leave the user with a dead end.

**Example 1:**
User: Hi, I’m looking to buy a house in Dallas.
Assistant: Great! What’s your budget range?
User: Maybe up to $550,000.
Assistant: Got it. How many bedrooms are you hoping for?
User: Three, at least.
Assistant: Perfect. Do you want a yard or any special features?

**Example 2:**
User: Can you help me rent an apartment?
Assistant: Absolutely! Which city are you interested in?
User: San Diego.
Assistant: Awesome choice. What’s your monthly rent budget?
User: Around $2,400.
Assistant: Nice! Do you want a studio or something bigger?

**Example 3:**
User: I want to set up a viewing.
Assistant: Of course! Which property are you interested in?
User: The townhouse on Main Street.
Assistant: Got it! What day works best for you?
User: Saturday afternoon.
Assistant: Perfect! I’ll check availability and get back to you. Anything else you’d like to see?

""",
                "voice": self.settings.openai_voice,
                "input_audio_format": self.settings.audio_format,
                "output_audio_format": self.settings.audio_format,
                "input_audio_transcription": {
                    "model": "whisper-1"
                },
                "turn_detection": {
                    "type": "server_vad",
                    "threshold": 0.5,
                    "prefix_padding_ms": 300,
                    "silence_duration_ms": 500
                },
                "tools": REALTY_TOOLS,
                "tool_choice": "auto"
            }
        }
        
        await self.send_message(session_config)
        logger.info("Session configuration sent")
    
    async def send_message(self, message: dict) -> None:
        """Send a JSON message to OpenAI."""
        if self.ws is None:
            raise RuntimeError("WebSocket not connected")
        
        await self.ws.send(json.dumps(message))
    
    async def send_audio(self, audio_base64: str) -> None:
        """
        Send audio data to OpenAI for processing.
        Audio should be base64-encoded PCM16 at 24kHz.
        """
        message = {
            "type": "input_audio_buffer.append",
            "audio": audio_base64
        }
        await self.send_message(message)
    
    async def commit_audio(self) -> None:
        """Commit the audio buffer to trigger a response."""
        message = {"type": "input_audio_buffer.commit"}
        await self.send_message(message)
    
    async def create_response(self) -> None:
        """Request OpenAI to generate a response."""
        message = {"type": "response.create"}
        await self.send_message(message)
    
    async def receive_messages(
        self, 
        on_message: Callable[[dict], Awaitable[None]]
    ) -> None:
        """
        Continuously receive messages from OpenAI and dispatch them.
        
        Args:
            on_message: Async callback for each received message
        """
        if self.ws is None:
            raise RuntimeError("WebSocket not connected")
        
        try:
            async for message in self.ws:
                try:
                    data = json.loads(message)
                    await on_message(data)
                except json.JSONDecodeError:
                    logger.error(f"Failed to parse message: {message}")
        except websockets.exceptions.ConnectionClosed as e:
            logger.info(f"OpenAI connection closed: {e}")
        except Exception as e:
            logger.error(f"Error receiving messages: {e}")
            raise
    
    async def disconnect(self) -> None:
        """Close the WebSocket connection."""
        if self._receive_task:
            self._receive_task.cancel()
            try:
                await self._receive_task
            except asyncio.CancelledError:
                pass
        
        if self.ws:
            await self.ws.close()
            self.ws = None
            logger.info("Disconnected from OpenAI Realtime API")
