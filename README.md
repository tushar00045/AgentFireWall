# 🛡️ AgentFireWall

> **Runtime Security & Threat Intelligence Command Layer for Autonomous AI Agents**

As AI agents transition from simple conversational chatbots into autonomous executors capable of executing shell commands, writing code, querying databases, and calling third-party APIs, they introduce a massive new attack surface: **Indirect Prompt Injection & Tool Hijacking**. 

**AgentFireWall** is a high-performance, real-time security proxy layer that intercepts inputs and tool calls at runtime, evaluating them through a multi-agent safety consensus graph to block attacks before damage occurs.

---

## 🚀 Key Features

*   **⚡ Real-Time Input Interception**: Intercepts unverified prompt contexts before they are evaluated by the primary agent model.
*   **🕸️ LangGraph Multi-Agent Security Flow**: Leverages a consensus-driven security graph of specialized classification nodes (Jailbreak Scanner, Injection Detector, Policy Evaluator) to score threat probability in real-time.
*   **🛡️ Fine-Grained Tool Governance**: Restricts and shields dangerous system-level functions by enforcing strict schemas.
*   **📋 Interactive Cyber Defense Command Terminal**: A single-screen Next.js dashboard featuring glassmorphic controls, interactive dial threat score metrics, and animated grids to monitor live alerts and audit histories.
*   **🔌 Bulletproof Fail-safe Sandbox**: Built-in high-fidelity offline simulation capability, allowing the front-end dashboard to perfectly demonstrate threat behaviors, scores, and timelines even during backend offline presentations.

---

## 🧭 Threat Mitigation & Guarded Tools

AgentFireWall guards critical execution nodes, mapping specific system roles to appropriate containment boundaries:

| Tool | Category | Risk Level | Active Policy Boundary | Interception Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `delete_database` | Destructive | **💀 Critical** | Prohibits anonymous database drops or table wipes. | **STRICT BLOCK & ALERT** |
| `read_secrets` | Data Access | **💀 Critical** | Blocks runtime exposure of credential vaults or keys. | **STRICT BLOCK & ALERT** |
| `export_customer_data` | Exfiltration | **🚨 High** | Restricts massive record transfers or CSV downloads. | **STRICT BLOCK & ALERT** |
| `send_email` | Communication | **⚠️ Medium** | Warns and triggers boundaries on high-frequency mailing. | **CHECK & RATE LIMIT** |
| `get_weather` | Utility | **✅ Low** | Safe, unprivileged utility. Allowed instantly. | **BYPASS & EXECUTE** |

---

## 🧬 Architectural Flow Diagram

When a prompt enters the system, it goes through an active defensive security pipeline:

```
User Prompt Input 
       │
       ▼
1. FastAPI Middleware Interceptor (Freezes Agent execution context)
       │
       ▼
2. LLM Scanner & Embeddings Classifier (Scans for inject patterns)
       │
       ▼
3. LangGraph Safety Graph Consensus (Multi-agent agreement check)
       │
       ▼
4. Tool Policy Governance Shield (Inspects database/API parameters)
       │
       ▼
 ┌─────┴────────────────────────┐
 │                              │
 ▼                              ▼
[BLOCK: Log to SQLite DB]   [ALLOW: Execute Tool API]
```

---

## 🛠️ Tech Stack & Prerequisites

*   **Backend**: Python, FastAPI, SQLite, LangGraph, Google Gemini Pro API.
*   **Frontend**: Next.js, React, Tailwind CSS v4, Framer Motion, HTML5 Canvas.
*   **Node.js**: `v18.x` or later.
*   **Python**: `v3.10` or later.

---

## 🚀 Setup & Installation Guide

Follow these steps to run the complete, active AgentFireWall platform locally:

### 1. Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd AgentFireWall/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Setup your security audit database:
   ```bash
   python setup_database.py
   ```
5. Configure your environmental variables (`.env`):
   ```env
   GEMINI_API_KEY=your_google_gemini_key_here
   DATABASE_URL=sqlite:///agent_firewall.db
   ```
6. Spin up the FastAPI API server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### 2. Frontend Dashboard Setup
1. Navigate to the frontend directory:
   ```bash
   cd AgentFireWall/frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to **`http://localhost:3000`** to access your Security Dashboard!

---

## 🔬 Interactive Hackathon Presentation Sandbox

To provide a flawless, reliable demonstration on stage, AgentFireWall is equipped with a **Cyber Simulation Sandbox Mode**.
* If the FastAPI backend is offline during your pitch, the dashboard will **automatically detect it** and switch to Sandbox Mode.
* In Sandbox Mode, you can trigger preset exploit attacks (Jailbreaks, Prompt Injections, Admin Escalations) or call guarded tools (Delete DB, Export User records) under **today's actual date and live local times**. 
*Dials will rotate, neon grid connection threads will pulse, and threat streams will populate dynamically without needing a local server connection!*