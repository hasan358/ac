# app/schemas/conversation.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.conversation import ChatType

class UserConversationBase(BaseModel):
    name: str
    question: str

class UserConversationCreate(UserConversationBase):
    user_id: Optional[int] = None  # Устанавливается в эндпоинте
    chat_id: Optional[int] = None  # Для поддержки клиентских запросов
    chat_type: Optional[ChatType] = None  # Указывает, является ли чат кастомным


class UserConversationOut(UserConversationBase):
    id: int
    user_id: int
    response: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True  # Для Pydantic v2
