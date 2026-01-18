"""
RapidAPI Realty-in-AU client for property searches.
Provides functions that OpenAI can call during voice conversations.
"""

import aiohttp
import logging
from typing import Optional, List, Dict, Any

logger = logging.getLogger(__name__)

# RapidAPI configuration
RAPIDAPI_HOST = "realty-in-au.p.rapidapi.com"
RAPIDAPI_BASE_URL = f"https://{RAPIDAPI_HOST}"


class RealtyAPIClient:
    """Client for RapidAPI Realty-in-AU API."""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "x-rapidapi-key": api_key,
            "x-rapidapi-host": RAPIDAPI_HOST
        }
    
    async def _make_request(self, endpoint: str, params: Dict[str, Any] = None) -> Dict:
        """Make an async HTTP request to RapidAPI."""
        url = f"{RAPIDAPI_BASE_URL}{endpoint}"
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self.headers, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        logger.info(f"RapidAPI response status: 200 OK")
                        return data
                    else:
                        error_text = await response.text()
                        logger.error(f"RapidAPI error {response.status}: {error_text}")
                        return {"error": f"API error: {response.status}"}
        except Exception as e:
            logger.error(f"RapidAPI request failed: {e}")
            return {"error": str(e)}
    
    async def search_properties(
        self,
        location: str,
        max_price: Optional[int] = None,
        min_price: Optional[int] = None,
        bedrooms: Optional[int] = None,
        property_type: Optional[str] = None,
        channel: str = "BUY",
        page: int = 1,
        page_size: int = 10
    ) -> Dict:
        """
        Search for properties in Australia.
        
        Args:
            location: City, suburb, or postcode (e.g., "Sydney", "Melbourne", "2000")
            max_price: Maximum price in AUD
            min_price: Minimum price in AUD
            bedrooms: Minimum number of bedrooms
            property_type: Type of property (house, apartment, unit, etc.)
            channel: BUY or RENT
            page: Page number for pagination
            page_size: Number of results per page
        
        Returns:
            Dictionary with property listings
        """
        params = {
            "searchLocation": location,
            "channel": channel,
            "page": page,
            "pageSize": page_size
        }
        
        if max_price:
            params["maxPrice"] = max_price
        if min_price:
            params["minPrice"] = min_price
        if bedrooms:
            params["minimumBedrooms"] = bedrooms
        if property_type:
            params["propertyTypes"] = property_type
        
        logger.info(f"Searching properties: {params}")
        result = await self._make_request("/properties/list", params)
        
        # Format the response for OpenAI to speak
        formatted = self._format_search_results(result)
        logger.info(f"Search result: {formatted['summary']}")
        if formatted.get('properties'):
            for i, prop in enumerate(formatted['properties'][:3], 1):
                logger.info(f"  Property {i}: {prop.get('address', 'N/A')} - {prop.get('price', 'N/A')} - {prop.get('bedrooms', 'N/A')} bed")
        return formatted
    
    async def get_property_details(self, listing_id: str) -> Dict:
        """
        Get detailed information about a specific property.
        
        Args:
            listing_id: The unique listing ID
        
        Returns:
            Dictionary with property details
        """
        params = {"id": listing_id}
        logger.info(f"Getting property details: {listing_id}")
        result = await self._make_request("/properties/detail", params)
        return self._format_property_details(result)
    
    async def get_agent_listings(
        self,
        agent_ids: List[str],
        channel: str = "BUY",
        page: int = 1,
        page_size: int = 20
    ) -> Dict:
        """
        Get listings from specific real estate agents.
        
        Args:
            agent_ids: List of agent/salesperson IDs
            channel: BUY, RENT, or SOLD
            page: Page number
            page_size: Results per page
        
        Returns:
            Dictionary with agent listings
        """
        params = {
            "linkedSalespeopleIds": ",".join(agent_ids),
            "channel": channel,
            "page": page,
            "pageSize": page_size
        }
        
        logger.info(f"Getting agent listings: {params}")
        result = await self._make_request("/agents/get-listings", params)
        return self._format_search_results(result)
    
    def _format_search_results(self, data: Dict) -> Dict:
        """Format search results for voice output."""
        if "error" in data:
            return {"summary": f"Sorry, I couldn't search properties: {data['error']}", "properties": []}
        
        # Extract listings from response
        listings = data.get("data", data.get("listings", []))
        if not listings:
            return {"summary": "I didn't find any properties matching your criteria.", "properties": []}
        
        formatted = []
        for item in listings[:5]:  # Limit to 5 for voice
            prop = {
                "id": item.get("id", item.get("listingId", "unknown")),
                "address": item.get("address", {}).get("displayAddress", "Address not available"),
                "price": item.get("price", {}).get("display", "Price on application"),
                "bedrooms": item.get("bedrooms", "N/A"),
                "bathrooms": item.get("bathrooms", "N/A"),
                "property_type": item.get("propertyType", "Property"),
                "headline": item.get("headline", "")
            }
            formatted.append(prop)
        
        summary = f"I found {len(listings)} properties. Here are the top {len(formatted)}:"
        return {"summary": summary, "properties": formatted}
    
    def _format_property_details(self, data: Dict) -> Dict:
        """Format property details for voice output."""
        if "error" in data:
            return {"summary": f"Sorry, I couldn't get property details: {data['error']}"}
        
        prop = data.get("data", data)
        
        return {
            "address": prop.get("address", {}).get("displayAddress", "Address not available"),
            "price": prop.get("price", {}).get("display", "Price on application"),
            "bedrooms": prop.get("bedrooms", "N/A"),
            "bathrooms": prop.get("bathrooms", "N/A"),
            "parking": prop.get("carSpaces", "N/A"),
            "property_type": prop.get("propertyType", "Property"),
            "land_size": prop.get("landSize", "N/A"),
            "description": prop.get("description", "No description available")[:500],
            "features": prop.get("features", [])[:10]
        }


# Tool definitions for OpenAI Realtime API
REALTY_TOOLS = [
    {
        "type": "function",
        "name": "search_properties",
        "description": "Search for properties (houses, apartments, units) for sale or rent in Australia. Use this when the user asks about finding properties, homes, or real estate.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city, suburb, or postcode to search in (e.g., 'Sydney', 'Melbourne', '2000')"
                },
                "max_price": {
                    "type": "integer",
                    "description": "Maximum price in AUD"
                },
                "min_price": {
                    "type": "integer",
                    "description": "Minimum price in AUD"
                },
                "bedrooms": {
                    "type": "integer",
                    "description": "Minimum number of bedrooms"
                },
                "property_type": {
                    "type": "string",
                    "enum": ["house", "apartment", "unit", "townhouse", "land"],
                    "description": "Type of property"
                },
                "channel": {
                    "type": "string",
                    "enum": ["BUY", "RENT"],
                    "description": "Whether to buy or rent. Default is BUY."
                }
            },
            "required": ["location"]
        }
    },
    {
        "type": "function",
        "name": "get_property_details",
        "description": "Get detailed information about a specific property using its listing ID. Use this when the user wants more details about a property.",
        "parameters": {
            "type": "object",
            "properties": {
                "listing_id": {
                    "type": "string",
                    "description": "The unique listing ID of the property"
                }
            },
            "required": ["listing_id"]
        }
    }
]
