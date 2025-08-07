# app/models/chat.py
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(80), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"))
    question = Column(Text, nullable=True)
    ai_id = Column(Integer, ForeignKey("ai.id"))

    creator = relationship("User", back_populates="chats")
    conversations = relationship("UserConversation", back_populates="chat", cascade="all, delete-orphan")
    ai = relationship("Ai", back_populates="chats", foreign_keys=[ai_id])  # Specify foreign key
