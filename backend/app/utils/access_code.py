import uuid
import jwt
from datetime import datetime, timedelta
from ..core.config import settings

def generate_access_code(reservation_id: str, check_in: datetime, check_out: datetime) -> str:
    """
    Gera um código de acesso seguro para a reserva
    """
    payload = {
        'reservation_id': reservation_id,
        'check_in': check_in.isoformat(),
        'check_out': check_out.isoformat(),
        'code': str(uuid.uuid4()),
        'exp': datetime.utcnow() + timedelta(days=30)  # Expira em 30 dias
    }
    
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
