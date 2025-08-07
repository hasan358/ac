from sqlalchemy.orm import Session
from app.models.ai import Ai
from app.schemas.ai import AiCreate, AiUpdate

def create_ai(db: Session, ai: AiCreate) -> Ai:
    """
    Create a new AI in the database.
    
    Args:
        db (Session): Database session
        ai (AiCreate): Pydantic schema with AI data
    
    Returns:
        Ai: Created AI object
    """
    db_ai = Ai(**ai.dict())
    db.add(db_ai)
    db.commit()
    db.refresh(db_ai)
    return db_ai

def get_ai(db: Session, ai_id: int) -> Ai | None:
    """
    Retrieve an AI by its ID.
    
    Args:
        db (Session): Database session
        ai_id (int): ID of the AI to retrieve
    
    Returns:
        Ai | None: AI object if found, else None
    """
    return db.query(Ai).filter(Ai.id == ai_id).first()

def get_ais(db: Session, skip: int = 0, limit: int = 100) -> list[Ai]:
    """
    Retrieve a list of AIs with pagination.
    
    Args:
        db (Session): Database session
        skip (int): Number of records to skip (for pagination)
        limit (int): Maximum number of records to return
    
    Returns:
        list[Ai]: List of AI objects
    """
    return db.query(Ai).offset(skip).limit(limit).all()

def update_ai(db: Session, ai_id: int, ai_update: AiUpdate) -> Ai | None:
    """
    Update an AI by its ID.
    
    Args:
        db (Session): Database session
        ai_id (int): ID of the AI to update
        ai_update (AiUpdate): Pydantic schema with updated data
    
    Returns:
        Ai | None: Updated AI object if found, else None
    """
    db_ai = db.query(Ai).filter(Ai.id == ai_id).first()
    if not db_ai:
        return None
    update_data = ai_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_ai, key, value)
    db.commit()
    db.refresh(db_ai)
    return db_ai

def delete_ai(db: Session, ai_id: int) -> bool:
    """
    Delete an AI by its ID.
    
    Args:
        db (Session): Database session
        ai_id (int): ID of the AI to delete
    
    Returns:
        bool: True if deletion was successful, False if AI not found
    """
    db_ai = db.query(Ai).filter(Ai.id == ai_id).first()
    if not db_ai:
        return False
    db.delete(db_ai)
    db.commit()
    return True