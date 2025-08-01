import asyncio

def test_send_message(monkeypatch, client):
    # Mock the AI response as an async function
    async def mock_generate_response(*args, **kwargs):
        return "Mocked AI Response"
    monkeypatch.setattr("app.services.ai_service.AIService.generate_response", mock_generate_response)

    # Log in to get a token
    login = client.post("/auth/token", data={
        "username": "test@example.com",
        "password": "secret123"
    })
    token = login.json()["access_token"]

    # Send a message with model as query parameter and corrected body
    response = client.post(
        "/conversations/?model=deepseek/DeepSeek-R1-0528",
        json={
            "name": "string",
            "question": "string",
            "user_id": 1,
            "chat_id": 1,
            "chat_type": "public"
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200
    assert response.json()["response"] == "Mocked AI Response"