from pydantic import BaseModel
from typing import Optional, List
from app.schemas.chat import Chat

class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    id: int

    class Config:
        from_attributes = True

class AiBase(BaseModel):
    title: str
    model: str
    logo_url: Optional[str] = None
    description: Optional[str] = None
    tags: List[TagCreate] = []

class AiCreate(AiBase):
    pass

class AiUpdate(BaseModel):
    title: Optional[str] = None
    model: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[TagCreate]] = None

class Ai(AiBase):
    id: int

    class Config:
        from_attributes = True

class AiWithRelations(Ai):
    chats: List[Chat] = []
    tags: List[Tag] = []