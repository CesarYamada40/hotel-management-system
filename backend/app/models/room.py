from sqlalchemy import Column, Integer, String, Float, Boolean
from ..database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, index=True)
    type = Column(String)  # single, double, suite
    price = Column(Float)
    is_available = Column(Boolean, default=True)
    description = Column(String)
    capacity = Column(Integer)
    amenities = Column(String)  # JSON string of amenities
