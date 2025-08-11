from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
from app.core.security import hash_password
from sqlalchemy.exc import SQLAlchemyError

def create_user(db: Session, user: UserCreate) -> User:
    try:
        if get_user_by_email(db, user.email):
            raise ValueError("User with this email already exists")
        db_user = User(
            name=user.name,
            email=user.email,
            hashed_password=hash_password(user.password),
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_user(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, user_update: UserOut) -> User | None:
    try:
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            return None
        if user_update.email and user_update.email != db_user.email and get_user_by_email(db, user_update.email):
            raise ValueError("User with this email already exists")
        update_data = user_update.dict(exclude_unset=True)
        if "password" in update_data:
            update_data["hashed_password"] = hash_password(update_data.pop("password"))
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
        return db_user
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")

def delete_user(db: Session, user_id: int) -> bool:
    try:
        db_user = get_user(db, user_id)
        if not db_user:
            return False
        db.delete(db_user)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error: {str(e)}")