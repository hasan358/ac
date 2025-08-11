from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


# Ассоциативная таблица для связи многие-ко-многим
ai_tag_association = Table(
    'ai_tag_association',
    Base.metadata,
    Column('ai_id', Integer, ForeignKey('ai.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id'), primary_key=True)
)

class Ai(Base):
    __tablename__ = "ai"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(80), nullable=False)
    model = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    logo_url = Column(String(100), nullable=True)
    # Поле tags удалено, так как теперь теги связаны через ассоциативную таблицу

    # Связь с таблицей Tag через ассоциативную таблицу
    tags = relationship("Tag", secondary=ai_tag_association, back_populates="ais")
    chats = relationship("Chat", back_populates="ai")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)

    # Связь с таблицей Ai через ассоциативную таблицу
    ais = relationship("Ai", secondary=ai_tag_association, back_populates="tags")