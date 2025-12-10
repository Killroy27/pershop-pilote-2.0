from backend.agents.mirror_agent.emotional_analyzer import MirrorAgent
from backend.agents.harmony_orchestrator.matching_engine import HarmonyEngine
import json

# 1. Le Client parle
texte_client = """
Je suis avocate, je viens de divorcer et je veux refaire ma garde-robe. 
Je veux me sentir puissante au tribunal mais je ne veux pas ressembler à un homme.
J'ai un bon budget.
"""

print("--- 🚀 ÉTAPE 1 : ANALYSE PSYCHO (Mirror) ---")
mirror = MirrorAgent()
analysis = mirror.analyze(texte_client)
print(f"🧠 Besoin détecté : {analysis['hidden_needs']}")
print(f"📉 Confiance : {analysis['confidence_score']}/100")

print("\n--- 🎻 ÉTAPE 2 : MATCHING (Harmony) ---")
harmony = HarmonyEngine()
matches = harmony.match(analysis)

print("\n--- ✨ RÉSULTATS POUR LE CLIENT ---")
for i, m in enumerate(matches):
    print(f"\n🏆 #{i+1} : {m['shopper_name']} ({m['match_score']}% Match)")
    print(f"   🗣️ {m['why_this_match']}")
    print(f"   🏷️ Tags : {m['tags']}")