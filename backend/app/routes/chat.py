from fastapi import APIRouter
from app.models.request_models import PromptRequest
from app.agents.agent import ask_agent

router = APIRouter()

@router.post("/chat")
def chat(request: PromptRequest):

    response = ask_agent(request.prompt)

    return {
        "response": response
    }