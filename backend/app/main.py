from fastapi import FastAPI
from app.routes.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from .database.db import get_db_connection

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
def health():
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