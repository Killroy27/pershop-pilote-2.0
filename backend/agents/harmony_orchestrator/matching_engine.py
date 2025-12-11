import json
import os
from typing import List, Dict
from backend.services.brain import ai_engine
from backend.agents.geo_sync.geo_locator import GeoLocator
from langchain_core.prompts import ChatPromptTemplate

# Chemin vers ta base de données
DB_PATH = "data/shoppers_db.json"

class HarmonyEngine:
    def __init__(self):
        self.llm = ai_engine.get_llm()
        self.shoppers = self._load_shoppers()
        self.locator = GeoLocator()

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

    def match(self, mirror_analysis: Dict, context_analysis: Dict, limit=3):
        print("🎻 Harmony cherche le match parfait (Multi-Agent + Geo-Sync)...")
        
        scored_shoppers = []
        
        # Extraction des données clés
        emotional = mirror_analysis.get('emotional_profile', {})
        constraints = context_analysis.get('constraints', {})
        
        critical_urgency = constraints.get('urgency_score', 0)
        target_occasion = constraints.get('occasion', "").lower()
        client_city = constraints.get('location_city', "Unknown")
        
        for shopper in self.shoppers:
            score = 0
            breakdown = {"psych": 0, "tech": 0, "context": 0, "metrics": 0, "geo": 0}
            
            # --- 0. GEO-SYNC (Distance Check) ---
            # Si le client a donné sa ville, on check la distance
            distance_km = 999
            if client_city and client_city.lower() != "unknown":
                is_near, dist = self.locator.is_nearby(client_city, shopper['location'])
                distance_km = dist
                if is_near:
                    breakdown['geo'] += 25 # Gros bonus proximité
                elif dist < 100:
                    breakdown['geo'] += 10 # Pas loin
                else:
                    breakdown['geo'] -= 10 # Loin (sauf si visio accepté, à voir V3)
            
            # --- 1. PSYCHOLOGICAL FIT (30%) ---
            # Si client peu confiant -> Shopper expérimenté et bien noté
            client_conf = emotional.get('confidence_level', 50)
            if client_conf < 40 and shopper['metrics']['experience_years'] > 8:
                breakdown['psych'] += 30
            elif client_conf > 80 and "style" in str(shopper.get('specialties', [])).lower():
                 breakdown['psych'] += 30 # Client confiant veut du challenge style
            else:
                breakdown['psych'] += 15 # Base match
                
            # --- 2. TECHNICAL EXPERTISE (30%) ---
            shopper_tags = " ".join(str(t) for t in shopper.get('specialties', [])).lower()
            needs = mirror_analysis.get('hidden_needs', "").lower()
            
            if any(word in needs for word in shopper_tags.split()):
                breakdown['tech'] += 30
            else:
                breakdown['tech'] += 10
                
            # --- 3. CRITICAL CONSTRAINTS & RELIABILITY (20%) ---
            # Si urgence haute, on booste les taux de succès élevés (Simulé via success_rate)
            shopper_success = shopper['metrics'].get('success_rate', 0)
            
            if critical_urgency > 70:
                if shopper_success > 15: # Top performer
                    breakdown['context'] += 20
                else:
                    breakdown['context'] -= 10 # Pénalité si urgent et shopper moyen
            
            if target_occasion in shopper_tags:
                breakdown['context'] += 10

            # --- 4. METRICS & SOCIAL PROOF (20%) ---
            rating = shopper['metrics'].get('rating', 0)
            breakdown['metrics'] += min(rating * 4, 20) # Max 20 pts

            # TOTAL SCORE
            total_score = breakdown['psych'] + breakdown['tech'] + breakdown['context'] + breakdown['metrics'] + breakdown['geo']
            
            scored_shoppers.append({
                "shopper": shopper,
                "score": total_score,
                "breakdown": breakdown
            })

        # 2. TRI ET SÉLECTION
        scored_shoppers.sort(key=lambda x: x['score'], reverse=True)
        top_3 = scored_shoppers[:limit]

        # 3. LA TOUCHE MAGIQUE (Narrative Generation)
        results = []
        for item in top_3:
            narrative = self._generate_narrative(item['shopper'], mirror_analysis, context_analysis)
            results.append({
                "shopper_name": item['shopper']['name'],
                "match_score": int(item['score']),
                "why_this_match": narrative,
                "tags": item['shopper'].get('specialties', [])[:3],
                "location": item['shopper']['location']['name']
            })
            
        return results

    def _generate_narrative(self, shopper, mirror_analysis, context_analysis):
        prompt = ChatPromptTemplate.from_messages([
            ("system", "Tu es un assistant de matching expert."),
            ("user", """
            Explique en UNE phrase courte pourquoi ce shopper est parfait pour ce client.
            
            CLIENT (Psy): {hidden_needs} (Confiance: {confidence}/100)
            CLIENT (Contexte): {occasion}, Urgence: {urgency}/100
            
            SHOPPER : {shopper_name}, {shopper_bio}
            Tags: {tags}
            
            Ta réponse doit être rassurante et prouver la fiabilité ("Il est idéal car...").
            """)
        ])
        
        chain = prompt | self.llm
        
        emotional = mirror_analysis.get('emotional_profile', {})
        constraints = context_analysis.get('constraints', {})
        
        try:
            res = chain.invoke({
                "hidden_needs": mirror_analysis.get('hidden_needs', 'Besoin de style'),
                "confidence": emotional.get('confidence_level', 50),
                "occasion": constraints.get('occasion', 'Quotidien'),
                "urgency": constraints.get('urgency_score', 50),
                "shopper_name": shopper['name'],
                "shopper_bio": shopper['bio'],
                "tags": shopper.get('specialties', [])
            })
            return res.content
        except Exception:
            return "Un match excellent basé sur vos critères."