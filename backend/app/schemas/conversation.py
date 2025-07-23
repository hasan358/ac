# app/schemas/conversation.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserConversationBase(BaseModel):
    name: str
    question: str

class UserConversationCreate(UserConversationBase):
    user_id: Optional[int] = None  # Устанавливается в эндпоинте
    chat_id: Optional[int] = None  # Для поддержки клиентских запросов
    is_custom_chat: Optional[bool] = None  # Указывает, является ли чат кастомным
    custom_chat_id: Optional[int] = None  # Для модели UserConversation
    public_chat_id: Optional[int] = None  # Для модели UserConversation

class UserConversationOut(UserConversationBase):
    id: int
    user_id: int
    custom_chat_id: Optional[int]
    response: Optional[str] = None
    public_chat_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True  # Для Pydantic v2
