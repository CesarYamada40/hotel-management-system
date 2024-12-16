from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...database import get_db
from ...models import reservation as models
from ...schemas import reservation as schemas
from ...utils.access_code import generate_access_code

router = APIRouter()

@router.get("/active", response_model=List[schemas.ReservationWithAccessCode])
def get_active_access_cards(
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_user)
):
    """
    Retorna todos os cartões de acesso ativos do usuário
    """
    reservations = db.query(models.Reservation).filter(
        models.Reservation.user_id == current_user.id,
        models.Reservation.status == "confirmed",
        models.Reservation.check_out >= datetime.now()
    ).all()

    for reservation in reservations:
        if not reservation.access_code:
            reservation.access_code = generate_access_code(
                str(reservation.id),
                reservation.check_in,
                reservation.check_out
            )
            db.commit()

    return reservations

@router.get("/{reservation_id}/access-code")
def generate_new_access_code(
    reservation_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(deps.get_current_user)
):
    """
    Gera um novo código de acesso para uma reserva específica
    """
    reservation = db.query(models.Reservation).filter(
        models.Reservation.id == reservation_id,
        models.Reservation.user_id == current_user.id
    ).first()

    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    if reservation.status != "confirmed":
        raise HTTPException(status_code=400, detail="Reservation is not confirmed")

    reservation.access_code = generate_access_code(
        str(reservation.id),
        reservation.check_in,
        reservation.check_out
    )
    db.commit()

    return {"access_code": reservation.access_code}
