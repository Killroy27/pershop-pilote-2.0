from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# On importe nos agents champions
from backend.agents.mirror_agent.emotional_analyzer import MirrorAgent
from backend.agents.harmony_orchestrator.matching_engine import HarmonyEngine

# --- 1. CONFIGURATION ---
app = FastAPI(title="Pershop Pilote API", version="2.0")

# Autoriser le Frontend (React) à nous parler (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Pour le hackathon, on autorise tout le monde
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. MODÈLES DE DONNÉES (Ce que le frontend doit envoyer) ---
class ClientRequest(BaseModel):
    text: str # Le message du client (ex: "Je suis avocate...")

# --- 3. LES ROUTES (Les endpoints) ---

@app.get("/")
def home():
    return {"status": "online", "message": "Bienvenue sur l'API Pershop Intelligence 🚀"}

@app.post("/api/analyze-and-match")
async def process_client(request: ClientRequest):
    """
    Cette route fait tout le travail en une fois :
    1. Analyse psy (Mirror)
    2. Recherche des shoppers (Harmony)
    """
    print(f"📩 Reçu demande client : {request.text[:30]}...")
    
    try:
        # ÉTAPE 1 : Mirror Agent
        mirror = MirrorAgent()
        analysis = mirror.analyze(request.text)
        
        if not analysis:
            raise HTTPException(status_code=500, detail="L'analyse psychologique a échoué.")

        # ÉTAPE 2 : Harmony Orchestrator
        harmony = HarmonyEngine()
        matches = harmony.match(analysis)

        # On renvoie tout au Frontend
        return {
            "profile_analysis": analysis,
            "shoppers_found": matches
        }

    except Exception as e:
        print(f"🔥 Erreur API : {e}")
        raise HTTPException(status_code=500, detail=str(e))