TOOL_POLICIES = {
    "get_weather": {
        "allowed": True,
        "risk_level": "LOW"
    },

    "translate_text": {
        "allowed": True,
        "risk_level": "LOW"
    },

    "send_email": {
        "allowed": True,
        "risk_level": "MEDIUM"
    },


    "delete_database": {
        "allowed": False,
        "risk_level": "CRITICAL"
    },

    "read_secrets": {
        "allowed": False,
        "risk_level": "CRITICAL"
    },

    "export_customer_data": {
        "allowed": False,
        "risk_level": "CRITICAL"
    }
}