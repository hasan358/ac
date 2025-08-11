from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserOut
from app.dependencies import get_db, get_current_user

router = APIRouter()

@router.get("/me", response_model=UserOut)
def read_profile(current_user = Depends(get_current_user)):
    return current_user
