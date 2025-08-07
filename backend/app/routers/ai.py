from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.crud.ai import create_ai, get_ai, get_ais
from app.schemas.ai import AiCreate, AiWithRelations
from app.models.ai import Ai
from app.dependencies import get_db

router = APIRouter()

@router.post("/add", response_model=AiWithRelations)
def create_new_ai(ai: AiCreate, db: Session = Depends(get_db)):
    """
    Create a new AI.
    
    Args:
        ai: Data for creating a new AI.
        db: Database session.
    
    Returns:
        Created AI with related chat data.
    
    Raises:
        HTTPException: If creation fails or chat_id is invalid.
    """
    db_ai = create_ai(db, ai)
    db_ai = db.query(Ai).options(joinedload(Ai.chats)).filter(Ai.id == db_ai.id).first()
    return db_ai

@router.get("/get/{ai_id}", response_model=AiWithRelations)
def read_ai(ai_id: int, db: Session = Depends(get_db)):
    """
    Retrieve an AI by ID.
    
    Args:
        ai_id: ID of the AI to retrieve.
        db: Database session.
    
    Returns:
        AI with related chat data.
    
    Raises:
        HTTPException: If AI is not found.
    """
    db_ai = get_ai(db, ai_id)
    if not db_ai:
        raise HTTPException(status_code=404, detail="AI not found")
    return db.query(Ai).options(joinedload(Ai.chats)).filter(Ai.id == ai_id).first()

@router.get("/get", response_model=list[AiWithRelations])
def read_ais(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of AIs with pagination.
    
    Args:
        skip: Number of records to skip (for pagination).
        limit: Maximum number of records to return.
        db: Database session.
    
    Returns:
        List of AIs with related chat data.
    """
    return db.query(Ai).options(joinedload(Ai.chats)).offset(skip).limit(limit).all()