from sqlalchemy.orm import Session
from app.models.ai import Ai, Tag
from app.schemas.ai import AiCreate, AiUpdate

def create_ai(db: Session, ai: AiCreate):
    # Convert Pydantic model to dict, excluding tags for now
    ai_data = ai.dict(exclude={"tags"})
    
    # Create the Ai instance without tags
    db_ai = Ai(**ai_data)
    
    # Handle tags
    if ai.tags:
        tag_objects = []
        for tag in ai.tags:
            # Check if tag already exists in the database
            db_tag = db.query(Tag).filter(Tag.name == tag.name).first()
            if not db_tag:
                # Create new tag if it doesn't exist
                db_tag = Tag(name=tag.name)
                db.add(db_tag)
            tag_objects.append(db_tag)
        # Assign the tag objects to the Ai instance
        db_ai.tags = tag_objects
    
    # Add and commit the Ai instance
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