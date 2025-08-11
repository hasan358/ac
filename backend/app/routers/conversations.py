# app/routers/conversations.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud.conversation import create_conversation, get_user_conversations
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.dependencies import get_db, get_current_user
from app.models.user import User
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/", response_model=UserConversationOut)
async def send_message(conv: UserConversationCreate, model:str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    logger.info(f"Получен POST-запрос на /conversations/ с данными: {conv.dict()} от пользователя user_id={user.id}")
    
    # Проверка прав доступа
    return await create_conversation(db, conv, ai_model=model)

@router.get("/", response_model=list[UserConversationOut])
def history(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return get_user_conversations(db, user.id)