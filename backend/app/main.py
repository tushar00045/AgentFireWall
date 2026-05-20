from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def root():
  return {"message":"Agent Firewall Running"}

@app.get("/health")
def health():
  return {"status":"healthy"}
