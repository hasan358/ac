from fastapi import FastAPI
from app.database import Base, engine
from app.routers import api_router
import uvicorn

app = FastAPI(
    title="AI Catalog Backend",
)

Base.metadata.create_all(bind=engine)
app.include_router(api_router)

if __name__ == '__main__':
    uvicorn.run('app.main:app', reload=True)