from fastapi import APIRouter
from app.models.request_models import PromptRequest
from app.agents.agent import ask_agent
from app.firewall.validator import validate_prompt

router = APIRouter()


@router.post("/chat")
def chat(request: PromptRequest):

    # ==============================
    # FIREWALL VALIDATION
    # ==============================

    firewall_result = validate_prompt(request.prompt)

    # ==============================
    # LOGGING SECTION
    # ==============================

    print("\n========================================")
    print(" NEW REQUEST RECEIVED ")
    print("========================================")

    print(f"Prompt: {request.prompt}")

    print(f"Risk Score: {firewall_result['risk_score']}")

    print(f"Decision: {firewall_result['decision']}")

    print(f"Threats Detected: {firewall_result['threats']}")

    print("========================================\n")

    # ==============================
    # BLOCK MALICIOUS PROMPTS
    # ==============================

    if firewall_result["decision"] == "BLOCK":

        print(" PROMPT BLOCKED BY FIREWALL\n")

        return {
            "blocked": True,
            "message": "Prompt blocked by Agent Firewall",
            "firewall": firewall_result
        }

    # ==============================
    # SAFE PROMPT → SEND TO AI
    # ==============================

    print(" SAFE PROMPT ALLOWED\n")

    response = ask_agent(request.prompt)

    # ==============================
    # RETURN RESPONSE
    # ==============================

    return {
        "blocked": False,
        "response": response,
        "firewall": firewall_result
    }