from fastapi import APIRouter
from . import auth, user, chats, conversations, ai

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(user.router, prefix="/users", tags=["Users"])
api_router.include_router(ai.router, prefix="/ai", tags=["Ai"])
api_router.include_router(chats.router, prefix="/chats", tags=["Chats"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["Conversations"])
