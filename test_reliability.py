import sys
import os
from dotenv import load_dotenv

# Ajout du chemin racine pour les imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

from backend.agents.mirror_agent.emotional_analyzer import MirrorAgent
from backend.agents.context_genius.context_analyzer import ContextGeniusAgent
from backend.agents.harmony_orchestrator.matching_engine import HarmonyEngine

def test_urgent_wedding_scenario():
    print("\n🧪 TEST SCENARIO: Urgent Wedding (High Stress, High Urgency)")
    user_text = "Je suis en panique totale. J'ai le mariage de ma soeur ce samedi et je n'ai RIEN à me mettre. Je ne me sens pas belle en ce moment, j'ai pris du poids et je déteste mon image. J'ai besoin de quelqu'un qui ne me jugera pas. J'ai un budget de 500€ max."
    
    print(f"📝 Input: {user_text}")
    
    # 1. PSY
    print("\n--- 1. Mirror Agent ---")
    mirror = MirrorAgent()
    mirror_res = mirror.analyze(user_text)
    print(f"🧠 Confiance: {mirror_res['emotional_profile']['confidence_level']}/100")
    print(f"🧠 Besoin Caché: {mirror_res['hidden_needs']}")
    
    # 2. CONTEXT
    print("\n--- 2. Context Genius ---")
    context = ContextGeniusAgent()
    context_res = context.analyze(user_text)
    print(f"⏱️ Urgence: {context_res['constraints']['urgency_score']}/100")
    print(f"📅 Occasion: {context_res['constraints']['occasion']}")
    
    # 3. HARMONY
    print("\n--- 3. Harmony Engine ---")
    harmony = HarmonyEngine()
    matches = harmony.match(mirror_res, context_res)
    
    for i, m in enumerate(matches, 1):
        print(f"\n🏆 MATCH #{i}: {m['shopper_name']} (Score: {m['match_score']})")
        print(f"   📍 {m['location']}")
        print(f"   🏷️ Tags: {m['tags']}")
        print(f"   💬 Raison: {m['why_this_match']}")

    print("\n------------------------------------------------")
    print("🧪 TEST SCENARIO: Location Proximity (Levallois -> Paris vs Marseille)")
    print("------------------------------------------------")
    geo_text = "Je cherche une styliste, je suis basé à Levallois, c'est assez urgent pour un gala."
    
    context2 = ContextGeniusAgent()
    c_res2 = context2.analyze(geo_text)
    print(f"📍 Ville détectée: {c_res2['constraints']['location_city']}")
    
    mirror2 = MirrorAgent().analyze(geo_text)
    
    harmony_geo = HarmonyEngine()
    matches_geo = harmony_geo.match(mirror2, c_res2)
    
    for i, m in enumerate(matches_geo, 1):
        print(f"\n🏆 MATCH #{i}: {m['shopper_name']} (Score: {m['match_score']})")
        print(f"   📍 {m['location']}")
        print(f"   💬 {m['why_this_match']}")

if __name__ == "__main__":
    test_urgent_wedding_scenario()
