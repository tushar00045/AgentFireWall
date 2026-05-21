SUSPICIOUS_PATTERNS = [
    "ignore previous instructions",
    "reveal secrets",
    "bypass security",
    "delete database",
    "act as admin",
    "system prompt",
    "disable firewall",
]

def validate_prompt(prompt: str):

    prompt_lower = prompt.lower()

    risk_score = 0
    detected_threats = []

    for pattern in SUSPICIOUS_PATTERNS:

        if pattern in prompt_lower:
            risk_score += 20
            detected_threats.append(pattern)

    decision = "ALLOW"

    if risk_score >= 40:
        decision = "BLOCK"

    return {
        "risk_score": risk_score,
        "decision": decision,
        "threats": detected_threats
    }