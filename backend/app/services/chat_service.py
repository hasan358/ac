from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.chat import CustomChat, PublicChat
from fastapi import HTTPException, status
from app.models.user import User
from typing import Optional

class ChatService:
    @staticmethod
    def publish_custom_chat(db: Session, chat_id: int, user: User) -> CustomChat:
        chat = db.query(CustomChat).filter_by(id=chat_id, creator_id=user.id).first()

        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")

        if chat.is_public:
            raise HTTPException(status_code=400, detail="Chat is already public")

        if not user.is_active:
            raise HTTPException(status_code=403, detail="Inactive account")

        chat.is_public = True
        chat.validation_period = datetime.utcnow() + timedelta(days=30)
        db.commit()
        db.refresh(chat)
        return chat

    @staticmethod
    def get_filtered_public_chats(
        db: Session,
        theme: Optional[str] = None,
        rating: Optional[float] = None,
        interface: Optional[str] = None,
        foundation: Optional[str] = None,
        monetization_type: Optional[str] = None,
        skip: int = 0,
        limit: int = 10
    ) -> list[PublicChat]:
        query = db.query(PublicChat)

        if theme:
            query = query.filter(PublicChat.theme == theme)
        if rating:
            query = query.filter(PublicChat.rating >= rating)
        if interface:
            query = query.filter(PublicChat.interface == interface)
        if foundation:
            query = query.filter(PublicChat.foundation == foundation)
        if monetization_type:
            query = query.filter(PublicChat.monetization_type == monetization_type)

        return query.offset(skip).limit(limit).all()
