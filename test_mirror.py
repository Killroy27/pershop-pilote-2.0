from backend.agents.mirror_agent.emotional_analyzer import MirrorAgent

# Histoire client : Une femme qui a eu une promotion mais qui doute
texte_client = """
Salut Pershop. Alors voilà, je viens d'être nommée Directrice Marketing. 
C'est super, mais... je me sens comme une imposteur. 
Je porte toujours mes vieux jeans et j'ai l'impression que mes équipes ne me respectent pas.
En plus, j'ai pris 5kg l'hiver dernier et je déteste me voir dans le miroir en ce moment.
Je veux juste me sentir "la patronne" sans être déguisée.
"""

print("--- 🧠 Démarrage du Test Mirror (avec Groq) ---")
agent = MirrorAgent()
resultat = agent.analyze(texte_client)

if resultat:
    print("\n✅ RÉSULTAT DE L'ANALYSE :")
    print(f"❤️ État émotionnel : {resultat['emotional_state']}")
    print(f"📉 Confiance : {resultat['confidence_score']}/100")
    print(f"📅 Événements : {resultat['detected_life_events']}")
    print(f"🚧 Blocages : {resultat['psychological_blocks']}")
    print(f"🎯 Besoin caché : {resultat['hidden_needs']}")
else:
    print("❌ L'analyse a échoué.")