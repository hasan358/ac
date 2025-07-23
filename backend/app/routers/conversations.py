# app/routers/conversations.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud.conversation import create_conversation, get_user_conversations
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.chat import CustomChat, PublicChat
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/", response_model=UserConversationOut)
def send_message(conv: UserConversationCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    logger.info(f"Received POST request to /conversations/ with data: {conv.dict()} for user_id={user.id}")
    if conv.user_id and conv.user_id != user.id:
        raise HTTPException(status_code=403, detail="Cannot set user_id to another user")
    
    conv.user_id = user.id
    
    # Обработка chat_id, если предоставлен
    if conv.chat_id is not None:
        chat_id = conv.chat_id
        if conv.is_custom_chat is None:
            raise HTTPException(status_code=400, detail="is_custom_chat must be provided when chat_id is specified")
        
        if conv.is_custom_chat:
            custom_chat = db.query(CustomChat).filter(CustomChat.id == chat_id).first()
            if not custom_chat:
                raise HTTPException(status_code=400, detail="Custom chat does not exist")
            conv.custom_chat_id = chat_id
            conv.public_chat_id = None
        else:
            public_chat = db.query(PublicChat).filter(PublicChat.id == chat_id).first()
            if not public_chat:
                raise HTTPException(status_code=400, detail="Public chat does not exist")
            conv.public_chat_id = chat_id
            conv.custom_chat_id = None
        conv.chat_id = None
        conv.is_custom_chat = None
    
    # Проверка, что хотя бы один из chat_id указан
    if not conv.custom_chat_id and not conv.public_chat_id:
        raise HTTPException(status_code=400, detail="Either custom_chat_id or public_chat_id must be provided")
    
    return create_conversation(db, conv)

@router.get("/", response_model=list[UserConversationOut])
def history(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return get_user_conversations(db, user.id)