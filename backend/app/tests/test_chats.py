def test_create_custom_chat(client):
    login = client.post("/auth/token", data={
        "username": "test@example.com",
        "password": "secret123"
    })
    token = login.json()["access_token"]

    response = client.post("/chats/custom/", json={
        "title": "Test Chat",
        "description": "Test description",
        "foundation": "gpt-4",
        "interface": "default",
        "monetization_type": "Free",
        "cost": 0,
        "creator_id": 1
    }, headers={
        "Authorization": f"Bearer {token}"
    })

    assert response.status_code == 200
    assert response.json()["title"] == "Test Chat"
