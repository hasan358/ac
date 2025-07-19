import httpx
from app.core.config import settings

class AIService:
    @staticmethod
    async def generate_response(prompt: str, ai_url: str) -> str:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                ai_url,
                headers={"Authorization": f"Bearer {settings.AI_API_KEY}"},
                json={"prompt": prompt, "max_tokens": 100}
            )
            response.raise_for_status()
            return response.json()["choices"][0]["text"]
