# app/models/conversation.py
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class UserConversation(Base):
    __tablename__ = "user_past_conversations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(1_000), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    custom_chat_id = Column(Integer, ForeignKey("custom_chats.id"), nullable=True)
    public_chat_id = Column(Integer, ForeignKey("public_chats.id"), nullable=True)
    is_custom_chat = Column(Boolean, default=False)

    question = Column(Text, nullable=False)
    response = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="conversations")
    custom_chat = relationship("CustomChat", back_populates="conversations")
    public_chat = relationship("PublicChat", back_populates="conversations")