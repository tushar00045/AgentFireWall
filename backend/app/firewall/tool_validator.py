from app.policies.tool_policy import TOOL_POLICIES

def validate_tool(tool_name: str):
  if tool_name not in TOOL_POLICIES:
      dangerous_keywords = [
          "delete",
          "secret",
          "password",
          "admin",
          "database",
          "export",
          "credential",
          "token",
          "disable"
      ]

      tool_lower = tool_name.lower()

      for keyword in dangerous_keywords:
          if keyword in tool_lower:
            return {
                "allowed": False,
                "risk_level": "CRITICAL",
                "message": f"Unknown dangerous tool detected: {tool_name}"
            }

          return {
              "allowed": True,
              "risk_level": "MEDIUM",
              "message": f"Unknown but potentially safe tool: {tool_name}"
          }

  is_allowed = TOOL_POLICIES[tool_name]

  if not is_allowed:
        return {
            "allowed": False,
            "risk_level": "CRITICAL",
            "message": f"{tool_name} is blocked by firewall"
        }
           
  return {
        "allowed": True,
        "risk_level": "LOW",
        "message": f"{tool_name} is allowed"
  }