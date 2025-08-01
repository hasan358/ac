from fastapi import HTTPException
from app.core.config import settings
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential


class AIService:
    @staticmethod
    async def generate_response(prompt: str, endpoint: str, model: str) -> str:
       client = ChatCompletionsClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(settings.ai_api_key),
    )
       response = client.complete(
        messages=[
            SystemMessage("You are a helpful assistant."),
            UserMessage(prompt),
        ],
        temperature=1.0,
        top_p=1.0,
        model=model
    )
       return response.choices[0].message.content

    @staticmethod
    async def generate_conv_name(response_content: str, endpoint: str, model: str) -> str:
       client = ChatCompletionsClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(settings.ai_api_key),
    )
       response = client.complete(
        messages=[
            SystemMessage("Give a five to three words summary."),
            UserMessage(response_content),
        ],
        temperature=1.0,
        top_p=1.0,
        model=model
     )
       return response.choices[0].message.content