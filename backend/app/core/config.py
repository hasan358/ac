from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    access_token_expire_minutes: int = 30
    ai_api_key:str
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"

settings = Settings()
