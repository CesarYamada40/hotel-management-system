from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.schemas.reservation import ReservationCreate, Reservation
from app.crud import crud_reservation

router = APIRouter()

@router.post("/", response_model=Reservation)
def create_reservation(
    reservation: ReservationCreate,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    """
    Create new reservation
    """
    return crud_reservation.create_with_owner(
        db=db, obj_in=reservation, owner_id=current_user.id
    )

@router.get("/", response_model=List[Reservation])
def read_reservations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    """
    Retrieve reservations
    """
    return crud_reservation.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
