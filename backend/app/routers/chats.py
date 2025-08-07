from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.crud.conversation import create_conversation
from app.crud.chat import create_chat
from app.crud.ai import get_ai
from app.schemas.chat import Chat, ChatCreate
from app.schemas.conversation import UserConversationCreate, UserConversationOut
from app.models.chat import Chat as ChatModel
from app.models.user import User
from app.dependencies import get_db, get_current_user
from typing import List
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=Chat)
async def create_chat_with_conversation(
    chat_data: ChatCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    print(f"Создание чата с данными: {chat_data.dict()}")
    if chat_data.creator_id != current_user.id:
        print(f"Несоответствие creator_id: {chat_data.creator_id} != {current_user.id}")
        raise HTTPException(status_code=403, detail="Creator ID does not match authenticated user")

    db_ai = get_ai(db, chat_data.ai_id)
    if not db_ai:
        print(f"AI с id={chat_data.ai_id} не найден")
        raise HTTPException(status_code=404, detail="AI not found")
    print(f"AI найден: id={db_ai.id}, model={db_ai.model}")

    try:
        chat_create = ChatCreate(
            title=chat_data.title,
            creator_id=chat_data.creator_id,
            ai_id=chat_data.ai_id,
            question=chat_data.question
        )
        db_chat = await create_chat(db, chat_create)
        print(f"Чат создан: id={db_chat.id}")

        if chat_data.question:
            conv_data = UserConversationCreate(question=chat_data.question, chat_id=db_chat.id)
            await create_conversation(db, conv_data, ai_model=db_ai.model)
            print(f"Беседа создана для чата id={db_chat.id}")

        db_chat = db.query(ChatModel).options(joinedload(ChatModel.conversations)).filter(ChatModel.id == db_chat.id).first()
        print(f"Чат id={db_chat.id} загружен с беседами")
        return db_chat
    except Exception as e:
        db.rollback()
        print(f"Не удалось создать чат или беседу: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Не удалось создать чат или беседу: {str(e)}")

@router.post("/{chat_id}/conversation", response_model=Chat)
async def add_conversation_to_chat(
    chat_id: int,
    question: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Проверка существования чата
    if question:
        conv_data = UserConversationCreate(question=question, chat_id=chat_id)
        print(f"Беседа создана для чата id={chat_id}")

    print(f"Добавление беседы к чату id={chat_id}")
    db_chat = db.query(ChatModel).filter(ChatModel.id == chat_id).first()
    if not db_chat:
        print(f"Чат id={chat_id} не найден")
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.creator_id != current_user.id:
        print(f"Несанкционированное изменение чата id={chat_id} пользователем id={current_user.id}")
        raise HTTPException(status_code=403, detail="Not authorized to modify this chat")

    # Проверка Ai по ai_id из чата
    db_ai = get_ai(db, db_chat.ai_id)  # Awaited async call
    if not db_ai:
        logger.warning(f"AI с id={db_chat.ai_id} не найден для чата id={chat_id}")
        raise HTTPException(status_code=404, detail="AI not found for this chat")

    try:
        # Создание новой беседы
        conv_data.chat_id = chat_id
        db_conv = await create_conversation(db, conv_data, ai_model=db_ai.model)
        logger.info(f"Беседа создана для чата id={chat_id}, беседа id={db_conv.id}")

        # Обновляем заголовок чата, если нужно
        if not db_chat.title or db_chat.title == "New Chat":
            db_chat.title = db_conv.question[:80] if db_conv.question else "New Chat"
        db.commit()
        db.refresh(db_chat)
        logger.info(f"Чат id={chat_id} обновлен")

        # Загружаем чат с беседами для возврата
        db_chat = db.query(ChatModel).options(joinedload(ChatModel.conversations)).filter(ChatModel.id == chat_id).first()
        logger.info(f"Чат id={chat_id} загружен с беседами")
        return db_chat
    except Exception as e:
        db.rollback()
        logger.error(f"Не удалось создать беседу: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Не удалось создать беседу: {str(e)}")

@router.get("/get/{chat_id}", response_model=Chat)
async def read_chat(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Загружаем чат с его беседами
    logger.info(f"Получение чата id={chat_id}")
    db_chat = db.query(ChatModel).options(joinedload(ChatModel.conversations)).filter(ChatModel.id == chat_id).first()
    if not db_chat:
        logger.warning(f"Чат id={chat_id} не найден")
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.creator_id != current_user.id:
        logger.warning(f"Несанкционированный доступ к чату id={chat_id} пользователем id={current_user.id}")
        raise HTTPException(status_code=403, detail="Not authorized to access this chat")
    return db_chat

@router.get("/get", response_model=List[Chat])
async def read_chats(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Получаем чаты текущего пользователя
    logger.info(f"Получение списка чатов для пользователя id={current_user.id}, skip={skip}, limit={limit}")
    chats = (
        db.query(ChatModel)
        .options(joinedload(ChatModel.conversations))
        .filter(ChatModel.creator_id == current_user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    logger.info(f"Найдено {len(chats)} чатов")
    return chats or []