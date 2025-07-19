from sqlalchemy.orm import Session
from app.models.conversation import UserConversation
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.models.user import User
from sqlalchemy.exc import SQLAlchemyError

def create_conversation(db: Session, conv: UserConversationCreate) -> UserConversation:
    try:
        if not db.query(User).filter(User.id == conv.user_id).first():
            raise ValueError("User does not exist")
        db_conv = UserConversation(**conv.dict())
        db.add(db_conv)
        db.commit()
        db.refresh(db_conv)
        return db_conv
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def get_conversation(db: Session, conv_id: int) -> UserConversation | None:
    return db.query(UserConversation).filter(UserConversation.id == conv_id).first()

def get_user_conversations(db: Session, user_id: int, skip=0, limit=10) -> list[UserConversation]:
    return db.query(UserConversation).filter(UserConversation.user_id == user_id).offset(skip).limit(limit).all()

def update_conversation(db: Session, conv_id: int, conv_update: UserConversationOut) -> UserConversation | None:
    try:
        db_conv = db.query(UserConversation).filter(UserConversation.id == conv_id).first()
        if not db_conv:
            return None
        if conv_update.user_id and not db.query(User).filter(User.id == conv_update.user_id).first():
            raise ValueError("User does not exist")
        for key, value in conv_update.dict(exclude_unset=True).items():
            setattr(db_conv, key, value)
        db.commit()
        db.refresh(db_conv)
        return db_conv
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def delete_conversation(db: Session, conv_id: int) -> bool:
    try:
        db_conv = get_conversation(db, conv_id)
        if not db_conv:
            return False
        db.delete(db_conv)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")