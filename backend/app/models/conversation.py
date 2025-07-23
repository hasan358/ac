# app/models/conversation.py
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum


# Определяем перечисление для типа чата
class ChatType(enum.Enum):
    PUBLIC = "public"
    CUSTOM = "custom"

class UserConversation(Base):
    __tablename__ = "user_past_conversations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(1_000), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    chat_id = Column(Integer, nullable=True)  # Единое поле для ID чата
    chat_type = Column(Enum(ChatType), nullable=True)  # Тип чата: public или custom

    question = Column(Text, nullable=False)
    response = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="conversations")
    # Динамическая связь в зависимости от chat_type (реализуется через @property или вручную)

    @property
    def chat(self):
        if self.chat_type == ChatType.PUBLIC:
            return self._get_public_chat()
        elif self.chat_type == ChatType.CUSTOM:
            return self._get_custom_chat()
        return None

    def _get_public_chat(self):
        from . import PublicChat  # Отложенный импорт для избежания циклических зависимостей
        return PublicChat.query.get(self.chat_id)

    def _get_custom_chat(self):
        from . import CustomChat  # Отложенный импорт
        return CustomChat.query.get(self.chat_id)