import time

def test_register(client):
    unique_email = f"test{int(time.time())}@example.com"
    response = client.post("/auth/register", json={
        "name": "Tester",
        "email": unique_email,
        "password": "secret123"
    })
    assert response.status_code == 200
    # Add any additional assertions as needed

def test_login(client):
    response = client.post("/auth/token", data={
        "username": "test@example.com",
        "password": "secret123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
