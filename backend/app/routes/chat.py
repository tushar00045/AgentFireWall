from fastapi import APIRouter
from app.models.request_models import PromptRequest
from app.agents.agent import ask_agent
from app.firewall.validator import validate_prompt
from app.firewall.tool_validator import validate_tool
from app.tools.tool_executor import execute_tool
from app.graph.security_graph import graph
from app.database.logs import (
    save_security_log,
    save_runtime_log,
    get_runtime_logs,
    get_security_logs
)
router = APIRouter()


# =========================================================
# CHAT ROUTE
# =========================================================

@router.post("/chat")
def chat(request: PromptRequest):

    # =====================================================
    # FIREWALL VALIDATION
    # =====================================================

    # firewall_result = validate_prompt(request.prompt)
    
    # =====================================================
    # LANGGRAPH ORCHESTRATION
    # =====================================================

    result = graph.invoke({
        "prompt": request.prompt,
        "threat_type": "",
        "risk_score": 0,
        "decision": "",
        "runtime_blocked": False,
        "reasoning": "",
        "trace": []
    })
 
    firewall_result = {
        "decision":
        result["decision"],

        "risk_score":
        result["risk_score"],

        "threats":
        [result["threat_type"]],

        "llm_analysis": {

            "threat_type":
            result["threat_type"],

            "reason":
            result["reasoning"]

        },

        "trace":
        result["trace"]
    }
    
    # =====================================================
    # SAVE SECURITY LOG
    # =====================================================

    save_security_log(
        request.prompt,
        firewall_result["decision"],
        firewall_result["risk_score"],
        firewall_result["llm_analysis"]["threat_type"],
        firewall_result["llm_analysis"]["reason"]
    )

    # =====================================================
    # CONSOLE LOGGING
    # =====================================================

    print("\n========================================")
    print(" NEW REQUEST RECEIVED ")
    print("========================================")

    print(f"Prompt: {request.prompt}")
    print(f"Risk Score: {firewall_result['risk_score']}")
    print(f"Decision: {firewall_result['decision']}")
    print(f"Threats Detected: {firewall_result['threats']}")

    print("========================================\n")

    # =====================================================
    # TOOL DETECTION
    # =====================================================

    requested_tool = None

    prompt_lower = request.prompt.lower()

    if "weather" in prompt_lower:
        requested_tool = "get_weather"

    elif "delete database" in prompt_lower:
        requested_tool = "delete_database"

    elif "read secrets" in prompt_lower:
        requested_tool = "read_secrets"

    elif "export customer data" in prompt_lower:
        requested_tool = "export_customer_data"

    elif "send email" in prompt_lower:
        requested_tool = "send_email"

    # =====================================================
    # BLOCK MALICIOUS PROMPTS
    # =====================================================

    if firewall_result["decision"] == "BLOCK":

        print(" PROMPT BLOCKED BY FIREWALL\n")

        # =================================================
        # SAVE RUNTIME LOG FOR BLOCKED TOOL ATTEMPTS
        # =================================================

        if requested_tool:

            save_runtime_log(
                requested_tool,
                "BLOCKED",
                "Blocked by firewall before execution"
            )

            print(" BLOCKED TOOL ATTEMPT LOGGED\n")

        return {
            "blocked": True,
            "message": "Prompt blocked by Agent Firewall",
            "firewall": firewall_result,
            "tool_result": {
                "tool": requested_tool,
                "status": "BLOCKED",
                "message": "Blocked by firewall before execution"
            } if requested_tool else None
        }

    # =====================================================
    # SAFE PROMPT → SEND TO AGENT
    # =====================================================

    print(" SAFE PROMPT ALLOWED\n")

    response = ask_agent(request.prompt)

    # =====================================================
    # TOOL VALIDATION
    # =====================================================

    tool_result = None

    if requested_tool:
        validation = validate_tool(requested_tool)

        print("\n========== TOOL VALIDATION ==========")
        print(f"Requested Tool: {requested_tool}")
        print(f"Validation Result: {validation}")

        # =================================================
        # BLOCK TOOL
        # =================================================

        if not validation["allowed"]:
            tool_result = {
                "tool": requested_tool,
                "status": "BLOCKED",
                "message": validation["message"]
            }

            save_runtime_log(
                requested_tool,
                "BLOCKED",
                validation["message"]
            )

            print(" TOOL BLOCKED & LOGGED")

        # =================================================
        # EXECUTE SAFE TOOL
        # =================================================

        else:
            execution = execute_tool(requested_tool)

            tool_result = {
                "tool": requested_tool,
                "status": "EXECUTED",
                "message": execution["message"]
            }

            save_runtime_log(
                requested_tool,
                "EXECUTED",
                execution["message"]
            )

            print(" TOOL EXECUTED & LOGGED")

        print(f"Tool Result: {tool_result}")
        print("=====================================\n")

    # =====================================================
    # RETURN RESPONSE
    # =====================================================

    return {
        "blocked": False,
        "response": response,
        "firewall": firewall_result,
        "tool_result": tool_result
    }

# =========================================================
# FETCH SECURITY LOGS
# =========================================================

@router.get("/security-logs")
def fetch_security_logs():
    logs = get_security_logs()
    return {
        "logs": logs
    }


# =========================================================
# FETCH RUNTIME LOGS
# =========================================================

@router.get("/runtime-logs")
def fetch_runtime_logs():
    logs = get_runtime_logs()
    return {
        "logs": logs
    }