import sqlite3
import os
DATABASE_NAME= "agent_firewall.db"

def get_db_connection():
  connection=sqlite3.connect(DATABASE_NAME)
  connection.row_factory=sqlite3.Row
  print("DB PATH:", os.path.abspath("agent_firewall.db"))
  return connection