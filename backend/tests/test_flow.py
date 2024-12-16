import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timedelta
from app.main import app

client = TestClient(app)

def test_complete_reservation_flow():
    # 1. Registro de usuário
    user_data = {
        "email": "test@example.com",
        "password": "test123",
        "full_name": "Test User"
    }
    response = client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 200
    
    # 2. Login
    login_data = {
        "username": "test@example.com",
        "password": "test123"
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    assert response.status_code == 200
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Buscar quartos disponíveis
    check_in = datetime.now() + timedelta(days=1)
    check_out = check_in + timedelta(days=2)
    params = {
        "check_in": check_in.isoformat(),
        "check_out": check_out.isoformat(),
        "guests": 2
    }
    response = client.get("/api/v1/rooms/available", params=params, headers=headers)
    assert response.status_code == 200
    rooms = response.json()
    assert len(rooms) > 0
    
    # 4. Fazer reserva
    reservation_data = {
        "room_id": rooms[0]["id"],
        "check_in": check_in.isoformat(),
        "check_out": check_out.isoformat(),
        "guests_count": 2
    }
    response = client.post("/api/v1/reservations", json=reservation_data, headers=headers)
    assert response.status_code == 200
    reservation = response.json()
    
    # 5. Verificar cartão de acesso
    response = client.get(f"/api/v1/access-cards/{reservation['id']}", headers=headers)
    assert response.status_code == 200
    access_card = response.json()
    assert "qr_code" in access_card
