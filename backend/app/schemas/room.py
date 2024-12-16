from pydantic import BaseModel
from typing import Optional

class RoomBase(BaseModel):
    number: str
    type: str
    price: float
    capacity: int
    description: Optional[str] = None
    amenities: Optional[str] = None

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: int
    is_available: bool

    class Config:
        orm_mode = True
