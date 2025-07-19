from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserConversationBase(BaseModel):
    name: str
    chat_id: int
    is_custom_chat: bool
    question: str
    response: Optional[str] = None


class UserConversationCreate(UserConversationBase):
    user_id: int


class UserConversationOut(UserConversationBase):
    name: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
