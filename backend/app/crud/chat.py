from sqlalchemy.orm import Session
from app.models.chat import PublicChat, CustomChat
from app.schemas.chat import PublicChatCreate, CustomChatCreate, PublicChatOut, CustomChatOut
from app.models.user import User
from sqlalchemy.exc import SQLAlchemyError

def create_public_chat(db: Session, chat: PublicChatCreate) -> PublicChat:
    try:
        if chat.user_id and not db.query(User).filter(User.id == chat.user_id).first():
            raise ValueError("User does not exist")
        db_chat = PublicChat(**chat.dict())
        db.add(db_chat)
        db.commit()
        db.refresh(db_chat)
        return db_chat
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def create_custom_chat(db: Session, chat: CustomChatCreate) -> CustomChat:
    try:
        if chat.user_id and not db.query(User).filter(User.id == chat.user_id).first():
            raise ValueError("User does exist")
        db_chat = CustomChat(**chat.dict())
        db.add(db_chat)
        db.commit()
        db.refresh(db_chat)
        return db_chat
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def get_public_chat(db: Session, chat_id: int) -> PublicChat | None:
    return db.query(PublicChat).filter(PublicChat.id == chat_id).first()

def get_custom_chat(db: Session, chat_id: int) -> CustomChat | None:
    return db.query(CustomChat).filter(CustomChat.id == chat_id).first()

def get_public_chats(db: Session, skip=0, limit=10) -> list[PublicChat]:
    return db.query(PublicChat).offset(skip).limit(limit).all()

def get_custom_chats(db: Session, skip=0, limit=10) -> list[CustomChat]:
    return db.query(CustomChat).offset(skip).limit(limit).all()

def update_public_chat(db: Session, chat_id: int, chat_update: PublicChatOut) -> PublicChat | None:
    try:
        db_chat = db.query(PublicChat).filter(PublicChat.id == chat_id).first()
        if not db_chat:
            return None
        if chat_update.user_id and not db.query(User).filter(User.id == chat_update.user_id).first():
            raise ValueError("User does not exist")
        for key, value in chat_update.dict(exclude_unset=True).items():
            setattr(db_chat, key, value)
        db.commit()
        db.refresh(db_chat)
        return db_chat
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def update_custom_chat(db: Session, chat_id: int, chat_update: CustomChatOut) -> CustomChat | None:
    try:
        db_chat = db.query(CustomChat).filter(CustomChat.id == chat_id).first()
        if not db_chat:
            return None
        if chat_update.user_id and not db.query(User).filter(User.id == chat_update.user_id).first():
            raise ValueError("User does not exist")
        for key, value in chat_update.dict(exclude_unset=True).items():
            setattr(db_chat, key, value)
        db.commit()
        db.refresh(db_chat)
        return db_chat
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def delete_public_chat(db: Session, chat_id: int) -> bool:
    try:
        db_chat = get_public_chat(db, chat_id)
        if not db_chat:
            return False
        db.delete(db_chat)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def delete_custom_chat(db: Session, chat_id: int) -> bool:
    try:
        db_chat = get_custom_chat(db, chat_id)
        if not db_chat:
            return False
        db.delete(db_chat)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")