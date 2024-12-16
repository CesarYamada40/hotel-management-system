from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Any
from datetime import datetime
from ...database import get_db
from ...models import reservation as models
from ...schemas import reservation as schemas
from ...crud import crud_reservation
from ...core import deps

router = APIRouter()

@router.post("/", response_model=schemas.Reservation)
def create_reservation(
    *,
    db: Session = Depends(get_db),
    reservation_in: schemas.ReservationCreate,
    current_user = Depends(deps.get_current_user)
) -> Any:
    """
    Create new reservation.
    """
    # Verificar disponibilidade do quarto
    if not crud_reservation.is_room_available(
        db,
        room_id=reservation_in.room_id,
        check_in=reservation_in.check_in,
        check_out=reservation_in.check_out
    ):
        raise HTTPException(
            status_code=400,
            detail="Room is not available for the selected dates"
        )
    
    reservation = crud_reservation.create_with_owner(
        db=db,
        obj_in=reservation_in,
        owner_id=current_user.id
    )
    return reservation

@router.get("/", response_model=List[schemas.Reservation])
def read_reservations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(deps.get_current_user)
) -> Any:
    """
    Retrieve reservations.
    """
    return crud_reservation.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )

@router.get("/{id}", response_model=schemas.Reservation)
def read_reservation(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user = Depends(deps.get_current_user)
) -> Any:
    """
    Get reservation by ID.
    """
    reservation = crud_reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )
    if reservation.owner_id != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Not enough permissions"
        )
    return reservation

@router.put("/{id}", response_model=schemas.Reservation)
def update_reservation(
    *,
    db: Session = Depends(get_db),
    id: int,
    reservation_in: schemas.ReservationUpdate,
    current_user = Depends(deps.get_current_user)
) -> Any:
    """
    Update reservation.
    """
    reservation = crud_reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )
    if reservation.owner_id != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Not enough permissions"
        )
    reservation = crud_reservation.update(
        db=db, db_obj=reservation, obj_in=reservation_in
    )
    return reservation

@router.delete("/{id}")
def delete_reservation(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user = Depends(deps.get_current_user)
) -> Any:
    """
    Delete reservation.
    """
    reservation = crud_reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )
    if reservation.owner_id != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="Not enough permissions"
        )
    crud_reservation.remove(db=db, id=id)
    return {"success": True}
