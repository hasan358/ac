# app/models/chat.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from app.database import Base

class MonetizationType(str, enum.Enum):
    FREE = "Free"
    PAID = "Paid"
    SUBSCRIPTION = "Subscription"

class BaseChat:
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(80), nullable=False)
    description = Column(String(10_000), nullable=True)
    foundation = Column(String(255), nullable=False)  # Название модели или путь к кастомному коду
    interface = Column(String(255), nullable=False)   # Название интерфейса или путь к UI
    monetization_type = Column(Enum(MonetizationType), nullable=False)
    cost = Column(Float, nullable=True)  # Исправлено: nullable=True, так как стоимость нужна только для Paid
    created_at = Column(DateTime, default=datetime.utcnow)

class PublicChat(Base, BaseChat):
    __tablename__ = "public_chats"

    theme = Column(String(100), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User")
    conversations = relationship("UserConversation", back_populates="public_chat")  # Исправлено: "Conversation" -> "UserConversation"

class CustomChat(Base, BaseChat):
    __tablename__ = "custom_chats"

    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    creator = relationship("User", back_populates="custom_chats")
    is_public = Column(Boolean, default=False)
    validation_period = Column(DateTime, nullable=True)

    conversations = relationship("UserConversation", back_populates="custom_chat", cascade="all, delete")