from app.database.db import get_db_connection

def initialize_database():
    connection = get_db_connection()
    cursor = connection.cursor()

    # =====================================
    # SECURITY LOGS TABLE
    # =====================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS security_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prompt TEXT,
            decision TEXT,
            risk_score INTEGER,
            threat_type TEXT,
            reason TEXT,
            timestamp DATETIME DEFAULT (datetime('now', '+5 hours', '+30 minutes'))
        )

    """)

    # =====================================
    # RUNTIME LOGS TABLE
    # =====================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS runtime_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tool_name TEXT,
            status TEXT,
            message TEXT,
            timestamp DATETIME DEFAULT (datetime('now', '+5 hours', '+30 minutes'))
        )
    """)

    connection.commit()
    connection.close()

    print("Database initialized successfully!")