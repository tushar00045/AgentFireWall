from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client=OpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

# def ask_agent(prompt:str):
#   response=client.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[
#       {
#         "role":"system",
#         "content":"You are a helpful AI assistent."
#       },
#       {
#         "role":"user",
#         "content":prompt
#       }
#     ]
#   )
#   return response.choices[0].message.content

def ask_agent(prompt: str):
    return f"Agent Firewall received: {prompt}"