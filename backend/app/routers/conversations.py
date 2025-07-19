from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.models.conversation import UserConversation
from app.dependencies import get_db, get_current_user
from app.crud.conversation import create_conversation, get_user_conversations

router = APIRouter()

@router.post("/", response_model=UserConversationOut)
def send_message(conv: UserConversationCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return create_conversation(db, conv)

@router.get("/", response_model=list[UserConversationOut])
def history(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return get_user_conversations(db, user.id)
