from sqlalchemy.orm import Session

from app.core.config import settings
from app.db import base  # noqa: F401
from app.schemas.user import UserCreate
from app.crud.user import create_user
from app.crud.room import create_initial_rooms

def init_db(db: Session) -> None:
    # Create super user if it doesn't exist
    user = UserCreate(
        email=settings.FIRST_SUPERUSER,
        password=settings.FIRST_SUPERUSER_PASSWORD,
        full_name="Initial Super User",
        is_superuser=True,
    )
    create_user(db, user)
    
    # Create initial rooms
    create_initial_rooms(db)
