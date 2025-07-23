from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.config import settings
from datetime import datetime, timedelta
from passlib.context import CryptContext
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

class AuthService:
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        user = db.query(User).filter(User.email == email).first()
        if not user or not pwd_context.verify(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def create_access_token(data: dict) -> str:
        try:
            to_encode = data.copy()
            expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
            to_encode.update({"exp": expire})
            return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
        except jwt.PyJWTError as e:
            raise Exception(f"Failed to create access token: {str(e)}")

    @staticmethod
    def decode_token(db: Session, token: str) -> Optional[User]:
        try:
            payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
            user_id: str = payload.get("sub")
            if user_id is None:
                return None
            user = db.query(User).filter(User.id == int(user_id)).first()
            return user
        except JWTError:
            return None
        
    @staticmethod
    def get_token_sub(token: str) -> Optional[str]:
        try:
            payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
            user_id: str = payload.get("sub")
            return user_id
        except JWTError:
            return None