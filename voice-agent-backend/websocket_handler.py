"""
WebSocket handler for client connections.
Bridges audio between web clients and OpenAI Realtime API.
"""

import asyncio
import json
import logging
from fastapi import WebSocket, WebSocketDisconnect

from config import Settings
from openai_realtime import OpenAIRealtimeClient
from realty_api import RealtyAPIClient

logger = logging.getLogger(__name__)


class VoiceSessionHandler:
    """
    Handles a single voice session between a client and OpenAI.
    Manages bidirectional audio streaming and function calls.
    """
    
    def __init__(self, client_ws: WebSocket, settings: Settings):
        self.client_ws = client_ws
        self.settings = settings
        self.openai_client = OpenAIRealtimeClient(settings)
        self.realty_client = RealtyAPIClient(settings.rapidapi_key) if settings.rapidapi_key else None
        self._running = False
        self._pending_function_call = {}
    
    async def handle_session(self) -> None:
        """Main session handler. Connects to OpenAI and manages message flow."""
        self._running = True
        
        try:
            # Connect to OpenAI Realtime API
            await self.openai_client.connect()
            
            # Run both directions concurrently
            await asyncio.gather(
                self._forward_client_to_openai(),
                self._forward_openai_to_client(),
            )
        except Exception as e:
            logger.error(f"Session error: {e}")
            raise
        finally:
            self._running = False
            await self.openai_client.disconnect()
    
    async def _forward_client_to_openai(self) -> None:
        """Receive messages from client and forward to OpenAI."""
        try:
            while self._running:
                try:
                    data = await self.client_ws.receive_text()
                    message = json.loads(data)
                    msg_type = message.get("type")
                    
                    if msg_type == "audio":
                        audio_data = message.get("audio", "")
                        if audio_data:
                            await self.openai_client.send_audio(audio_data)
                    elif msg_type == "audio_commit":
                        await self.openai_client.commit_audio()
                    elif msg_type == "response_request":
                        await self.openai_client.create_response()
                    else:
                        logger.warning(f"Unknown client message type: {msg_type}")
                        
                except json.JSONDecodeError as e:
                    logger.error(f"Invalid JSON from client: {e}")
                    
        except WebSocketDisconnect:
            logger.info("Client disconnected")
            self._running = False
        except Exception as e:
            logger.error(f"Error forwarding client messages: {e}")
            self._running = False
    
    async def _forward_openai_to_client(self) -> None:
        """Receive messages from OpenAI and forward relevant ones to client."""
        
        # Events to forward to client
        forward_events = {
            "session.created", "session.updated",
            "response.audio.delta", "response.audio.done",
            "response.audio_transcript.delta", "response.audio_transcript.done",
            "response.text.delta", "response.text.done",
            "response.done",
            "input_audio_buffer.speech_started",
            "input_audio_buffer.speech_stopped",
            "conversation.item.created",
            "error"
        }
        
        async def on_openai_message(message: dict) -> None:
            msg_type = message.get("type", "")
            
            # Handle function calls from OpenAI
            if msg_type == "response.function_call_arguments.delta":
                # Accumulate function call arguments
                call_id = message.get("call_id", "")
                if call_id not in self._pending_function_call:
                    self._pending_function_call[call_id] = {
                        "name": message.get("name", ""),
                        "arguments": ""
                    }
                self._pending_function_call[call_id]["arguments"] += message.get("delta", "")
            
            elif msg_type == "response.function_call_arguments.done":
                # Function call complete - execute it
                call_id = message.get("call_id", "")
                func_name = message.get("name", "")
                args_str = message.get("arguments", "{}")
                
                logger.info(f"Function call: {func_name}({args_str})")
                
                try:
                    args = json.loads(args_str)
                    result = await self._execute_function(func_name, args)
                    await self._send_function_result(call_id, result)
                except Exception as e:
                    logger.error(f"Function call error: {e}")
                    await self._send_function_result(call_id, {"error": str(e)})
                
                # Clean up
                if call_id in self._pending_function_call:
                    del self._pending_function_call[call_id]
            
            elif msg_type in forward_events:
                try:
                    await self.client_ws.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Error sending to client: {e}")
                    self._running = False
            
            if msg_type == "error":
                logger.error(f"OpenAI error: {message}")
        
        try:
            await self.openai_client.receive_messages(on_openai_message)
        except Exception as e:
            logger.error(f"Error receiving from OpenAI: {e}")
            self._running = False
    
    async def _execute_function(self, name: str, args: dict) -> dict:
        """Execute a function call and return results."""
        if not self.realty_client:
            return {"error": "RapidAPI not configured. Please add RAPIDAPI_KEY to .env"}
        
        if name == "search_properties":
            return await self.realty_client.search_properties(
                location=args.get("location", ""),
                max_price=args.get("max_price"),
                min_price=args.get("min_price"),
                bedrooms=args.get("bedrooms"),
                property_type=args.get("property_type"),
                channel=args.get("channel", "BUY")
            )
        elif name == "get_property_details":
            return await self.realty_client.get_property_details(
                listing_id=args.get("listing_id", "")
            )
        else:
            return {"error": f"Unknown function: {name}"}
    
    async def _send_function_result(self, call_id: str, result: dict) -> None:
        """Send function result back to OpenAI."""
        # Create conversation item with function output
        message = {
            "type": "conversation.item.create",
            "item": {
                "type": "function_call_output",
                "call_id": call_id,
                "output": json.dumps(result)
            }
        }
        await self.openai_client.send_message(message)
        
        # Request OpenAI to generate response based on function result
        await self.openai_client.create_response()


async def handle_voice_websocket(websocket: WebSocket, settings: Settings) -> None:
    """Entry point for handling a voice WebSocket connection."""
    await websocket.accept()
    logger.info("Client connected")
    
    handler = VoiceSessionHandler(websocket, settings)
    
    try:
        await handler.handle_session()
    except Exception as e:
        logger.error(f"WebSocket handler error: {e}")
    finally:
        logger.info("Session ended")
