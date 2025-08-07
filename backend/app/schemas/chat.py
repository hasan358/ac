from pydantic import BaseModel
from typing import Optional, List
from app.schemas.conversation import UserConversationOut

class ChatBase(BaseModel):
    title: str
    creator_id: int
    ai_id: int

class ChatCreate(ChatBase):
    question: Optional[str] = None

class ChatUpdate(BaseModel):
    title: Optional[str] = None
    creator_id: Optional[int] = None
    ai_id: Optional[int] = None
    question: Optional[str] = None

class Chat(ChatBase):
    id: int
    question: Optional[str] = None
    conversations: List[UserConversationOut] = []

    class Config:
        from_attributes = True