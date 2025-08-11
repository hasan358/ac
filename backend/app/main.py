from fastapi import FastAPI
from app.database import Base, engine
from app.routers import api_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="AI Catalog Backend",
)
origins = [
    "http://localhost:5173",  # Vite dev server
    "https://your-frontend-domain.com"  # Production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)
app.include_router(api_router)

if __name__ == '__main__':
    uvicorn.run('app.main:app', reload=True)