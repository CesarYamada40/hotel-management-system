from fastapi import APIRouter
from app.api.endpoints import auth, reservations, access_cards, rooms

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(reservations.router, prefix="/reservations", tags=["reservations"])
api_router.include_router(access_cards.router, prefix="/access-cards", tags=["access-cards"])
api_router.include_router(rooms.router, prefix="/rooms", tags=["rooms"])
