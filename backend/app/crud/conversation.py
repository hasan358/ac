# app/crud/conversation.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.conversation import UserConversation
from app.models.chat import CustomChat, PublicChat
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.services.ai_service import AIService
import logging

logger = logging.getLogger(__name__)

async def create_conversation(db: Session, conv: UserConversationCreate, ai_model: str) -> UserConversationOut:
    logger.info(f"Создание разговора с данными: {conv.dict()}")

    ai_url = "https://models.github.ai/inference"
    try:
        # Сначала получаем ответ от AI-сервиса
        response = await AIService.generate_response(prompt=conv.question, endpoint=ai_url, model=ai_model)
        logger.info(f"Ответ от AI-сервиса получен: {response}")

        # Затем генерируем имя разговора на основе ответа
        name = await AIService.generate_conv_name(response_content=response, endpoint=ai_url, model=ai_model)
        logger.info(f"Имя разговора сгенерировано: {name}")
    except Exception as e:
        logger.error(f"Ошибка при обращении к AI-сервису: {str(e)}")
        raise HTTPException(status_code=503, detail="AI-сервис недоступен")

    try:
        db_conv = UserConversation(
            user_id=conv.user_id,
            chat_id=conv.chat_id,
            chat_type=conv.chat_type,
            name=name,
            question=conv.question,
            response=response
        )
        db.add(db_conv)
        db.commit()
        db.refresh(db_conv)
        logger.info(f"Разговор создан с id: {db_conv.id}")
        return UserConversationOut.from_orm(db_conv)
    except Exception as e:
        db.rollback()
        logger.error(f"Ошибка при создании разговора: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Не удалось создать разговор: {str(e)}")

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