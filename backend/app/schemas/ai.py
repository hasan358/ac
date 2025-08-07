from pydantic import BaseModel
from typing import Optional, List
from app.schemas.chat import Chat

class AiBase(BaseModel):
    title: str
    model: str
    description: Optional[str] = None
    tags: str

class AiCreate(AiBase):
    pass

class AiUpdate(BaseModel):
    title: Optional[str] = None
    model: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[str] = None

class Ai(AiBase):
    id: int

    class Config:
        from_attributes = True

class AiWithRelations(Ai):
    chats: List[Chat] = []  # Changed from chat to chats to reflect one-to-many