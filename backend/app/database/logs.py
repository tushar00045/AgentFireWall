from app.database.db import get_db_connection

# =========================================
# SAVE SECURITY EVENT
# =========================================

def save_security_log(prompt,decision,risk_score,threat_type, reason):

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO security_logs (
            prompt,
            decision,
            risk_score,
            threat_type,
            reason
        )
        VALUES (?, ?, ?, ?, ?)

    """, (
        prompt,
        decision,
        risk_score,
        threat_type,
        reason
    ))

    connection.commit()
    connection.close()

# =========================================
# SAVE RUNTIME EVENT
# =========================================

def save_runtime_log(tool_name,status,message):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO runtime_logs (
            tool_name,
            status,
            message
        )
        VALUES (?, ?, ?)

    """, (
        tool_name,
        status,
        message
    ))

    connection.commit()
    connection.close()
    
# =========================================
# FETCH SECURITY LOGS
# =========================================

def get_security_logs():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM security_logs
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    connection.close()

    return [dict(row) for row in rows]


# =========================================
# FETCH RUNTIME LOGS
# =========================================

def get_runtime_logs():

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""

        SELECT *

        FROM runtime_logs

        ORDER BY id DESC

    """)

    rows = cursor.fetchall()

    connection.close()

    return [dict(row) for row in rows]