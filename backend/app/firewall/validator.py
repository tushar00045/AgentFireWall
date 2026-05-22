from app.detection.llm_detector import analyze_prompt_with_llm

SUSPICIOUS_PATTERNS = [
    "ignore previous instructions",
    "reveal secrets",
    "bypass security",
    "delete database",
    "act as admin",
    "disable firewall",
]


def validate_prompt(prompt: str):

    prompt_lower = prompt.lower()

    regex_score = 0
    detected_threats = []

    # =========================
    # RULE-BASED DETECTION
    # =========================

    for pattern in SUSPICIOUS_PATTERNS:

        if pattern in prompt_lower:
            regex_score += 20
            detected_threats.append(pattern)

    # =========================
    # AI-BASED DETECTION
    # =========================

    llm_result = analyze_prompt_with_llm(prompt)

    llm_score = llm_result["risk_score"]

    # =========================
    # COMBINED RISK SCORE
    # =========================

    final_score = regex_score + llm_score

    if final_score > 100:
        final_score = 100

    # =========================
    # POLICY DECISION
    # =========================

    decision = "ALLOW"

    if final_score >= 70:
        decision = "BLOCK"

    elif final_score >= 40:
        decision = "WARNING"

    # =========================
    # FINAL RESPONSE
    # =========================

    return {
        "risk_score": final_score,
        "decision": decision,
        "threats": detected_threats,
        "llm_analysis": llm_result
    }