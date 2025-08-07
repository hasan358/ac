from sqlalchemy.orm import Session
from app.models.chat import Chat
from app.schemas.chat import ChatCreate, ChatUpdate

async def create_chat(db: Session, chat_data: ChatCreate) -> Chat:
    db_chat = Chat(
        title=chat_data.title,
        creator_id=chat_data.creator_id,
        ai_id=chat_data.ai_id,
        question=chat_data.question
    )
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat
def get_chat(db: Session, chat_id: int) -> Chat | None:
    """
    Retrieve a chat by its ID.
    
    Args:
        db (Session): Database session
        chat_id (int): ID of the chat to retrieve
    
    Returns:
        Chat | None: Chat object if found, else None
    """
    return db.query(Chat).filter(Chat.id == chat_id).first()

def get_chats(db: Session, skip: int = 0, limit: int = 100) -> list[Chat]:
    """
    Retrieve a list of chats with pagination.
    
    Args:
        db (Session): Database session
        skip (int): Number of records to skip (for pagination)
        limit (int): Maximum number of records to return
    
    Returns:
        list[Chat]: List of chat objects
    """
    return db.query(Chat).offset(skip).limit(limit).all()

def update_chat(db: Session, chat_id: int, chat_update: ChatUpdate) -> Chat | None:
    """
    Update a chat by its ID.
    
    Args:
        db (Session): Database session
        chat_id (int): ID of the chat to update
        chat_update (ChatUpdate): Pydantic schema with updated data
    
    Returns:
        Chat | None: Updated chat object if found, else None
    """
    db_chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not db_chat:
        return None
    update_data = chat_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_chat, key, value)
    db.commit()
    db.refresh(db_chat)
    return db_chat

def delete_chat(db: Session, chat_id: int) -> bool:
    """
    Delete a chat by its ID.
    
    Args:
        db (Session): Database session
        chat_id (int): ID of the chat to delete
    
    Returns:
        bool: True if deletion was successful, False if chat not found
    """
    db_chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not db_chat:
        return False
    db.delete(db_chat)
    db.commit()
    return True