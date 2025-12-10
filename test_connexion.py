# On importe depuis le NOUVEAU fichier "brain"
from backend.services.brain import ai_engine

print("--- 📞 Test de l'appel à l'IA ---")

try:
    cerveau = ai_engine.get_llm()
    print("🤖 Envoi de la question...")
    
    reponse = cerveau.invoke("Dis bonjour au développeur Pershop.")
    
    print(f"IA : {reponse.content}")
    print("--- ✅ SUCCÈS ---")

except Exception as e:
    print(f"--- ❌ ÉCHEC : {e} ---")