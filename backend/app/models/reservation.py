from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    check_in_date = Column(Date)
    check_out_date = Column(Date)
    status = Column(String)  # pending, confirmed, cancelled
    guests_count = Column(Integer)
    special_requests = Column(String, nullable=True)
    access_code = Column(Text, nullable=True)  # Código QR para acesso

    # Relationships
    user = relationship("User", back_populates="reservations")
    room = relationship("Room", back_populates="reservations")
