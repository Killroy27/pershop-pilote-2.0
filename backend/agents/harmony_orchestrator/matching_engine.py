import json
import os
from typing import List, Dict
from backend.services.brain import ai_engine
from langchain_core.prompts import ChatPromptTemplate

# Chemin vers ta base de données
DB_PATH = "data/shoppers_db.json"

class HarmonyEngine:
    def __init__(self):
        self.llm = ai_engine.get_llm()
        self.shoppers = self._load_shoppers()

    def _load_shoppers(self) -> List[Dict]:
        """Charge les 200 profils depuis le JSON"""
        try:
            # On cherche le fichier data à la racine
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
            full_path = os.path.join(base_dir, DB_PATH)
            
            # Si ça échoue, on tente le chemin relatif simple
            if not os.path.exists(full_path):
                full_path = DB_PATH

            with open(full_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Erreur chargement DB ({e}). On utilise une liste vide.")
            return []

    def match(self, client_analysis: Dict, limit=3):
        print("🎻 Harmony cherche le match parfait...")
        
        scored_shoppers = []
        
        # 1. LE FILTRAGE LOGIQUE
        for shopper in self.shoppers:
            score = 0
            
            # Sécurité : On récupère les données même si les clés changent un peu
            # On cherche 'specialties' OU 'tags' (si l'un manque, on prend l'autre)
            shopper_tags = shopper.get('specialties', shopper.get('tags', []))
            years_exp = shopper.get('metrics', {}).get('experience_years', 0)

            # Critère A : Expérience vs Confiance Client
            if client_analysis['confidence_score'] < 50:
                if years_exp > 5:
                    score += 20

            # Critère B : Mots-clés
            needs = " ".join(client_analysis['psychological_blocks'] + client_analysis['detected_life_events']).lower()
            
            # On transforme la liste de tags en une seule chaîne de texte pour chercher dedans
            tags_text = " ".join(str(t) for t in shopper_tags).lower()
            
            if "confiance" in needs and "conseil" in tags_text:
                score += 15
            if "travail" in needs or "pro" in needs:
                if "mode" in tags_text or "luxe" in tags_text:
                    score += 10
            
            scored_shoppers.append({
                "shopper": shopper,
                "score": score,
                "tags": shopper_tags # On stocke les tags trouvés pour l'affichage
            })

        # 2. TRI ET SÉLECTION
        scored_shoppers.sort(key=lambda x: x['score'], reverse=True)
        top_3 = scored_shoppers[:limit]

        # 3. LA TOUCHE MAGIQUE (L'IA explique)
        results = []
        for item in top_3:
            narrative = self._generate_narrative(item['shopper'], client_analysis)
            results.append({
                "shopper_name": item['shopper']['name'],
                "match_score": 90 + int(item['score'] / 5),
                "why_this_match": narrative,
                "tags": item['tags'][:3] # <-- Correction ici : on utilise les tags récupérés plus haut
            })
            
        return results

    def _generate_narrative(self, shopper, client_analysis):
        prompt = ChatPromptTemplate.from_messages([
            ("system", "Tu es un assistant de matching expert."),
            ("user", """
            Explique en UNE phrase courte pourquoi ce shopper est parfait pour ce client.
            
            CLIENT : {client_needs} (Confiance: {confidence}/100)
            SHOPPER : {shopper_name}, {shopper_bio}
            
            Ta réponse doit être rassurante et personnalisée ("Il est parfait car...").
            """)
        ])
        
        chain = prompt | self.llm
        res = chain.invoke({
            "client_needs": client_analysis['hidden_needs'],
            "confidence": client_analysis['confidence_score'],
            "shopper_name": shopper['name'],
            "shopper_bio": shopper['bio']
        })
        return res.content