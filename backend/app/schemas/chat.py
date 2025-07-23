from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime


class MonetizationType(str, Enum):
    free = "Free"
    paid = "Paid"
    subscription = "Adds"


# 🔹 Общие базовые поля
class ChatBase(BaseModel):
    title: str
    description: Optional[str] = None
    foundation: Optional[str] = None
    interface: Optional[str] = None
    monetization_type: Optional[MonetizationType] = None
    cost: Optional[float] = None


# 🔹 Public Chat
class PublicChatCreate(ChatBase):
    pass
class PublicChatOut(ChatBase):
    id: int
    creator_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# 🔹 Custom Chat
class CustomChatCreate(ChatBase):
    creator_id: int

class CustomChatOut(ChatBase):
    id: int
    creator_id: int=1
    is_public: bool = False
    validation_period: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True
