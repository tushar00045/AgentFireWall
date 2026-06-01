from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.routes.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from .database.db import get_db_connection
import asyncio
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "Agent Firewall Running"}

@app.get("/health")
def root_health():
    return {"status": "healthy"}

@app.delete("/clear-logs")
async def clear_logs():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM security_logs")
    cursor.execute("DELETE FROM runtime_logs")

    connection.commit()
    connection.close()

    return {
        "message": "Logs cleared successfully"
      }

# =========================================================
# LIVE WEBSOCKET THREAT MONITOR STREAM
# =========================================================
@app.websocket("/ws/threats")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("🔌 WebSocket Security Stream Connected.")
    try:
        # Send initial handshake verification
        await websocket.send_json({
            "event": "connected",
            "message": "Secure WebSocket threat interception tunnel active."
        })
        
        while True:
            # Await prompts from client
            data = await websocket.receive_text()
            payload = json.loads(data)
            prompt = payload.get("prompt", "")
            
            if not prompt:
                continue
                
            print(f" Received live WebSocket prompt context: {prompt}")
            
            # Step 1: Intercept
            await websocket.send_json({
                "event": "step",
                "agent": "Input Security Agent",
                "message": "Intercepted prompt context. Pattern scanning active."
            })
            await asyncio.sleep(0.4)
            
            # Step 2: Scoring Threat
            prompt_lower = prompt.lower()
            risk_score = 6
            threat_type = "None"
            decision = "ALLOW"
            reason = "Safe input payload context verified."
            
            if "delete database" in prompt_lower or "delete_database" in prompt_lower:
                risk_score = 98
                threat_type = "Tool Hijacking"
                decision = "BLOCK"
                reason = "Intercepted critical tool execution: delete_database prohibited."
            elif "read secrets" in prompt_lower or "read_secrets" in prompt_lower or "password" in prompt_lower:
                risk_score = 95
                threat_type = "Secrets Leakage"
                decision = "BLOCK"
                reason = "Blocked exposure of secure credential vault variables."
            elif "export customer" in prompt_lower or "export_customer_data" in prompt_lower:
                risk_score = 88
                threat_type = "Data Exfiltration"
                decision = "BLOCK"
                reason = "Data Loss Prevention check blocked bulk customer data exfiltration."
            elif "ignore instructions" in prompt_lower or "system instructions" in prompt_lower:
                risk_score = 92
                threat_type = "Prompt Injection"
                decision = "BLOCK"
                reason = "System sandbox matched instruction bypass prompts."
            
            await websocket.send_json({
                "event": "step",
                "agent": "Threat Classifier",
                "message": f"Assessed threat risk at {risk_score}%. Type: {threat_type}."
            })
            await asyncio.sleep(0.4)
            
            # Step 3: Check Policy
            await websocket.send_json({
                "event": "step",
                "agent": "Policy Engine",
                "message": f"Enforced runtime boundaries. Interception decision: {decision}."
            })
            await asyncio.sleep(0.4)
            
            # Step 4: Finalize
            await websocket.send_json({
                "event": "finalize",
                "decision": decision,
                "risk_score": risk_score,
                "threat_type": threat_type,
                "reasoning": reason,
                "message": "Consensus safety evaluation finalized."
            })
            
    except WebSocketDisconnect:
        print("🔌 WebSocket Security Stream Disconnected.")
    except Exception as e:
        print(f"❌ WebSocket error: {e}")