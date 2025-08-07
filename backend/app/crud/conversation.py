from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.conversation import UserConversation
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.services.ai_service import AIService
import logging
import time

logger = logging.getLogger(__name__)

async def create_conversation(db: Session, conv: UserConversationCreate, ai_model: str) -> UserConversationOut:
    """
    Создание новой записи беседы с использованием AI-сервиса.
    
    Args:
        db: Сессия базы данных SQLAlchemy.
        conv: Данные для создания беседы (вопрос и chat_id).
        ai_model: Модель AI для генерации ответа и имени.
    
    Returns:
        UserConversationOut: Созданная беседа в формате Pydantic.
    
    Raises:
        HTTPException: Если AI-сервис недоступен или произошла ошибка базы данных.
    """
    start_time = time.time()
    logger.info(f"Начало создания беседы: {conv.dict()}")

    # Проверка, что вопрос предоставлен, если требуется ответ от AI
    if not conv.question:
        logger.warning("Вопрос не предоставлен, создается беседа без ответа AI")
        name = "Безымянная беседа"
        response = None
    else:
        ai_url = "https://models.github.ai/inference"  # Рекомендуется вынести в конфигурацию
        try:
            response_start = time.time()
            response = await AIService.generate_response(prompt=conv.question, endpoint=ai_url, model=ai_model)
            logger.info(f"Ответ AI получен за {time.time() - response_start:.2f} секунд: {response}")

            name_start = time.time()
            name = await AIService.generate_conv_name(response_content=response, endpoint=ai_url, model=ai_model)
            logger.info(f"Имя беседы сгенерировано за {time.time() - name_start:.2f} секунд: {name}")
        except Exception as e:
            logger.error(f"Ошибка AI-сервиса: {str(e)}")
            raise HTTPException(status_code=503, detail="AI-сервис недоступен")

    try:
        db_conv = UserConversation(
            name=name,
            question=conv.question,
            response=response,
            chat_id=conv.chat_id
        )
        db.add(db_conv)
        db.commit()
        db.refresh(db_conv)
        logger.info(f"Беседа создана за {time.time() - start_time:.2f} секунд, id: {db_conv.id}")
        return UserConversationOut.from_orm(db_conv)
    except Exception as e:
        db.rollback()
        logger.error(f"Ошибка при создании беседы: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Не удалось создать беседу: {str(e)}")

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