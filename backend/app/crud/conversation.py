# app/crud/conversation.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.conversation import UserConversation
from app.models.chat import CustomChat, PublicChat
from app.schemas.conversation import UserConversationCreate, UserConversationOut
import logging

logger = logging.getLogger(__name__)

def create_conversation(db: Session, conv: UserConversationCreate) -> UserConversationOut:
    logger.info(f"Creating conversation with data: {conv.dict()}")
    try:
        # Проверка существования чата
        if conv.custom_chat_id and not db.query(CustomChat).filter(CustomChat.id == conv.custom_chat_id).first():
            raise HTTPException(status_code=400, detail="Custom chat does not exist")
        if conv.public_chat_id and not db.query(PublicChat).filter(PublicChat.id == conv.public_chat_id).first():
            raise HTTPException(status_code=400, detail="Public chat does not exist")
        
        db_conv = UserConversation(**conv.dict(exclude={'chat_id', 'is_custom_chat'}))  # Исключаем chat_id и is_custom_chat
        db.add(db_conv)
        db.commit()
        db.refresh(db_conv)
        logger.info(f"Conversation created with id: {db_conv.id}")
        return UserConversationOut.from_orm(db_conv)
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to create conversation: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to create conversation: {str(e)}")

def get_conversation(db: Session, conv_id: int) -> UserConversation | None:
    return db.query(UserConversation).filter(UserConversation.id == conv_id).first()

def get_user_conversations(db: Session, user_id: int, skip=0, limit=10) -> list[UserConversation]:
    return db.query(UserConversation).filter(UserConversation.user_id == user_id).offset(skip).limit(limit).all()

def update_conversation(db: Session, conv_id: int, conv_update: UserConversationOut) -> UserConversation | None:
    try:
        db_conv = db.query(UserConversation).filter(UserConversation.id == conv_id).first()
        if not db_conv:
            return None
        for key, value in conv_update.dict(exclude_unset=True).items():
            setattr(db_conv, key, value)
        db.commit()
        db.refresh(db_conv)
        return db_conv
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to update conversation: {str(e)}")

def delete_conversation(db: Session, conv_id: int) -> bool:
    try:
        db_conv = get_conversation(db, conv_id)
        if not db_conv:
            return False
        db.delete(db_conv)
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to delete conversation: {str(e)}")