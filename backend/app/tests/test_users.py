def test_get_current_user(client):
    login = client.post("/auth/token", data={
        "username": "test@example.com",
        "password": "secret123"
    })
    token = login.json()["access_token"]

    response = client.get("/users/me", headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
