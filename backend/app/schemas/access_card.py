from pydantic import BaseModel
from datetime import date
from typing import Optional

class AccessCardBase(BaseModel):
    reservation_id: int
    guest_name: str
    property_name: str
    location: str
    check_in: date
    check_out: date
    access_code: str

class AccessCardCreate(AccessCardBase):
    pass

class AccessCard(AccessCardBase):
    id: int

    class Config:
        orm_mode = True

class AccessCardWithQR(AccessCard):
    qr_code: str  # Base64 encoded QR code image
