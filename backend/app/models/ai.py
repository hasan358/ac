# app/models/chat.py
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Table
from sqlalchemy.orm import relationship
from app.database import Base

ai_tags = Table(
    "ai_tags",
    Base.metadata,
    Column("ai_id", Integer, ForeignKey("ai.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False, unique=True)

class Ai(Base):
    __tablename__ = "ai"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(80), nullable=False)
    model = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    tags = Column(String(100), nullable=False)
    # Removed chat_id = Column(Integer, ForeignKey("chats.id"))

    chats = relationship("Chat", back_populates="ai")