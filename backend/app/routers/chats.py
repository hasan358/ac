from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud.chat import create_custom_chat
from app.services.chat_service import ChatService
from app.schemas.chat import CustomChatOut, CustomChatCreate, PublicChatOut, PublicChatCreate
from app.dependencies import get_db, get_current_user
from app.models.user import User 

router = APIRouter()

@router.post("/custom/", response_model=CustomChatOut)
def create_a_custom_chat(chat: CustomChatCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    chat.creator_id = user.id
    return create_custom_chat(db, chat)

@router.post("/custom/{chat_id}/publish", response_model=CustomChatOut)
def publish(chat_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return ChatService.publish_custom_chat(db, chat_id, user)

@router.get("/public", response_model=list[PublicChatOut])
def list_public_chats(
    db: Session = Depends(get_db),
    theme: str = None,
    rating: float = None,
    interface: str = None,
    foundation: str = None,
    monetization_type: str = None,
    skip: int = 0,
    limit: int = 10,
):
    return ChatService.get_filtered_public_chats(db, theme, rating, interface, foundation, monetization_type, skip, limit)
