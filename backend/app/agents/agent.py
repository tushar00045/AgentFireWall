#from openai import OpenAI
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

# client=OpenAI(
#   api_key=os.getenv("OPENAI_API_KEY")
# )

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def ask_agent(prompt: str):

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
    )

    return response.text


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

# def ask_agent(prompt: str):
#     return f"Agent Firewall received: {prompt}"