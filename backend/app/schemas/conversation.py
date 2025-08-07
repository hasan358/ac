from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserConversationBase(BaseModel):
    question: Optional[str] = None  # Made optional to align with ChatCreate

class UserConversationCreate(UserConversationBase):
    chat_id: int

class UserConversationOut(UserConversationBase):
    id: Optional[int] = None
    name: str
    response: Optional[str] = None
    created_at: Optional[datetime] = None
    chat_id: int

    class Config:
        from_attributes = True