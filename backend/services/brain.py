print("--- 🧠 CHARGEMENT DU CERVEAU (BRAIN.PY) ---")
import os
from dotenv import load_dotenv

# Adaptateur Groq
try:
    from langchain_groq import ChatGroq
except ImportError:
    ChatGroq = None

from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

load_dotenv()

class BrainService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY") 
        self.anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        self.provider = "unknown"

        # DÉTECTION
        if self.api_key and self.api_key.startswith("gsk_"):
            self.provider = "groq"
            print(f"🔌 Mode détecté : GROQ (Clé : {self.api_key[:10]}...)")
        elif self.api_key and self.api_key.startswith("sk-"):
            self.provider = "openai"
            print("🔌 Mode détecté : OPENAI")
        else:
            print("⚠️ Aucune clé reconnue.")

    def get_llm(self):
        if self.provider == "groq":
            if ChatGroq is None: raise ImportError("Installe langchain-groq !")
            return ChatGroq(model="llama-3.3-70b-versatile", temperature=0.7, api_key=self.api_key)

        if self.provider == "openai":
            return ChatOpenAI(model="gpt-4o", temperature=0.7, api_key=self.api_key)

        if self.anthropic_key:
            return ChatAnthropic(model="claude-3-5-sonnet-20241022", temperature=0.7, api_key=self.anthropic_key)

        raise ValueError("❌ Aucune clé valide !")

# Instance unique
ai_engine = BrainService()