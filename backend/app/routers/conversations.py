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
async def send_message(conv: UserConversationCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    logger.info(f"Получен POST-запрос на /conversations/ с данными: {conv.dict()} от пользователя user_id={user.id}")
    
    # Проверка прав доступа
    if conv.user_id and conv.user_id != user.id:
        raise HTTPException(status_code=403, detail="Нельзя указать user_id другого пользователя")
    
    conv.user_id = user.id
    return await create_conversation(db, conv)

@router.get("/", response_model=list[UserConversationOut])
def history(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return get_user_conversations(db, user.id)