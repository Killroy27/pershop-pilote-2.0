print("--- 🧠 CHARGEMENT DU CERVEAU (BRAIN.PY) ---")
import os
from dotenv import load_dotenv

# Adaptateur Groq
try:
    from langchain_groq import ChatGroq
except ImportError:
    ChatGroq = None

# Adaptateur Google Gemini
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
except ImportError:
    ChatGoogleGenerativeAI = None

from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

load_dotenv()

class BrainService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY") 
        self.anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        self.google_key = os.getenv("GOOGLE_API_KEY")
        self.provider = "unknown"

        # DÉTECTION
        if self.google_key and self.google_key.startswith("AIza"):
            self.provider = "google"
        elif self.api_key and self.api_key.startswith("gsk_"):
            self.provider = "groq"
        elif self.api_key and self.api_key.startswith("sk-"):
            self.provider = "openai"
        elif self.anthropic_key:
            self.provider = "anthropic"
        else:
            print("⚠️ Aucune clé reconnue.")
        
        print(f"🔑 Provider détecté: {self.provider}")

    def get_llm(self):
        if self.provider == "google":
            if ChatGoogleGenerativeAI is None: 
                raise ImportError("Installe langchain-google-genai !")
            return ChatGoogleGenerativeAI(
                model="gemini-1.5-flash",
                temperature=0.7,
                google_api_key=self.google_key
            )

        if self.provider == "groq":
            if ChatGroq is None: raise ImportError("Installe langchain-groq !")
            return ChatGroq(model="llama-3.3-70b-versatile", temperature=0.7, api_key=self.api_key)

        if self.provider == "openai":
            return ChatOpenAI(model="gpt-4o", temperature=0.7, api_key=self.api_key)

        if self.provider == "anthropic":
            return ChatAnthropic(model="claude-3-5-sonnet-20241022", temperature=0.7, api_key=self.anthropic_key)

        raise ValueError("❌ Aucune clé valide !")

# Instance unique
ai_engine = BrainService()