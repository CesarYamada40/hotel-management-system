from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Hotel Management System"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key-here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/hotel_db"
    
    class Config:
        env_file = ".env"

settings = Settings()
