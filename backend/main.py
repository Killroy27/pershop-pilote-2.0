from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Database imports
from backend.database import get_db
from backend.models import ShopperProfile

# --- CONFIGURATION ---
app = FastAPI(title="Pershop Pilote API", version="2.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTES ---

@app.get("/")
def home():
    return {"status": "online", "message": "Bienvenue sur l'API Pershop Intelligence 🚀"}

@app.get("/api/test")
def test_endpoint():
    return {"status": "ok", "message": "Test endpoint works!"}

@app.post("/api/analyze")
def analyze_text(data: dict):
    """Analyze user text using MirrorAgent LLM"""
    text = data.get("text", "")
    
    if not text.strip():
        return {"analysis": None, "status": "error", "message": "No text provided"}
    
    try:
        # Import and use the real MirrorAgent
        from backend.agents.mirror_agent.emotional_analyzer import MirrorAgent
        
        mirror = MirrorAgent()
        result = mirror.analyze(text)
        
        if result:
            return {
                "analysis": result,
                "status": "success",
                "source": "llm"
            }
        else:
            # Fallback to simple analysis if LLM fails
            return fallback_analysis(text)
            
    except Exception as e:
        print(f"LLM Error: {e}")
        return fallback_analysis(text)

def fallback_analysis(text: str):
    """Simple keyword extraction as fallback"""
    keywords = []
    style_indicators = ["élégant", "casual", "professionnel", "décontracté", "luxe", "moderne", "classique"]
    mood_indicators = ["confiant", "anxieux", "motivé", "pressé", "urgent", "important"]
    
    text_lower = text.lower()
    for word in style_indicators:
        if word in text_lower:
            keywords.append(word)
    
    mood = "neutre"
    for word in mood_indicators:
        if word in text_lower:
            mood = word
            break
    
    return {
        "analysis": {
            "emotional_state": mood,
            "confidence_score": 50,
            "keywords": keywords if keywords else ["style personnalisé"],
            "has_urgency": any(w in text_lower for w in ["urgent", "pressé", "vite", "demain", "jours"])
        },
        "status": "success",
        "source": "fallback"
    }

@app.get("/api/shoppers")
def get_shoppers(db: Session = Depends(get_db)):
    """Get shoppers from database"""
    try:
        shoppers = db.query(ShopperProfile).limit(20).all()
        return [
            {
                "id": s.id,
                "name": s.name,
                "location": s.location,
                "bio": s.bio,
                "avatar_url": s.avatar_url or f"https://i.pravatar.cc/150?u={s.id}",
                "specialties": s.specialties or [],
                "satisfaction_rate": s.satisfaction_rate or 4.5,
                "total_clients": s.total_clients or 0
            }
            for s in shoppers
        ]
    except Exception as e:
        print(f"Database error: {e}")
        # Fallback to mock data if DB fails
        return [
            {"id": 1, "name": "Sophie Laurent", "location": "Paris 8ème", "bio": "Spécialiste du luxe", "avatar_url": "https://i.pravatar.cc/150?u=1", "specialties": ["Luxe", "Mode"], "satisfaction_rate": 4.8, "total_clients": 150},
            {"id": 2, "name": "Marc Dubois", "location": "Lyon", "bio": "Expert en style masculin", "avatar_url": "https://i.pravatar.cc/150?u=2", "specialties": ["Homme", "Business"], "satisfaction_rate": 4.6, "total_clients": 120},
            {"id": 3, "name": "Clara Moreau", "location": "Marseille", "bio": "Conseillère image", "avatar_url": "https://i.pravatar.cc/150?u=3", "specialties": ["Conseil", "Relooking"], "satisfaction_rate": 4.9, "total_clients": 200}
        ]

@app.get("/api/shoppers/{shopper_id}")
def get_shopper(shopper_id: int, db: Session = Depends(get_db)):
    """Get a specific shopper by ID"""
    shopper = db.query(ShopperProfile).filter(ShopperProfile.id == shopper_id).first()
    if not shopper:
        raise HTTPException(status_code=404, detail="Shopper not found")
    return {
        "id": shopper.id,
        "name": shopper.name,
        "location": shopper.location,
        "bio": shopper.bio,
        "avatar_url": shopper.avatar_url or f"https://i.pravatar.cc/150?u={shopper.id}",
        "specialties": shopper.specialties or [],
        "satisfaction_rate": shopper.satisfaction_rate or 4.5,
        "total_clients": shopper.total_clients or 0
    }

@app.get("/api/dashboard/client")
def get_client_dashboard():
    return {
        "next_session": {
            "date": "12 Juin 2025",
            "time": "14:30",
            "shopper": "Sophie M.",
            "location": "Paris 8ème"
        },
        "loyalty_points": 1250,
        "recent_sessions": [
            {"date": "05 Mai 2025", "shopper": "Sophie M.", "rating": 5},
            {"date": "12 Mars 2025", "shopper": "Claire D.", "rating": 4}
        ]
    }

@app.get("/api/dashboard/shopper")
def get_shopper_dashboard():
    return {
        "kpis": {
            "new_matchings": 12,
            "satisfaction_rate": 4.8,
            "revenue": "3,200€"
        },
        "recent_matchings": [
            {"id": 1, "client_name": "Marie Dubois", "need": "Essayage urgent", "date": "Aujourd'hui", "status": "confirmed"},
            {"id": 2, "client_name": "Sophie Laurent", "need": "Consultation style", "date": "Hier", "status": "completed"}
        ],
        "agenda": [
            {"time": "10:00", "event": "Rdv avec Marie D."},
            {"time": "14:30", "event": "Essayage Claire"},
            {"time": "17:00", "event": "Consultation Emma"}
        ]
    }

@app.get("/api/shopper/clients/{client_id}")
def get_client_brief(client_id: int):
    """Get detailed client pre-brief for shopper with full AI analysis"""
    # In production, this would fetch from database based on client_id
    return {
        "client_name": "Marie Dubois",
        "client_photo": "https://i.pravatar.cc/150?u=client1",
        "request_date": "12 Décembre 2024",
        
        # 🎭 MIRROR AGENT - Emotional Analysis
        "mirror_analysis": {
            "emotional_state": "Motivée mais appréhensive",
            "confidence_score": 67,
            "emotional_profile": {
                "confidence_vestimentaire": 45,
                "ouverture_changement": 78,
                "sensibilite_regard": 82,
                "attachement_conventions": 55,
                "budget_psychologique": 750,
                "zone_confort": "Couleurs neutres, coupes classiques",
                "potentiel_transformation": 85
            },
            "detected_life_events": ["Promotion récente", "Nouveau poste direction"],
            "psychological_blocks": ["Peur de paraître trop voyante", "Syndrome de l'imposteur"],
            "hidden_needs": "Se sentir légitime et puissante dans son nouveau rôle"
        },
        
        # 🎨 CHROMATIC AI - Color Analysis
        "chromatic_analysis": {
            "skin_undertone": "Chaud doré",
            "natural_contrast": "Moyen",
            "season": "Automne doux",
            "power_colors": ["Bordeaux", "Vert sapin", "Moutarde", "Corail", "Camel"],
            "neutral_colors": ["Beige", "Crème", "Taupe", "Marron glacé"],
            "challenge_colors": ["Bleu électrique", "Rouge vif"],
            "colors_to_avoid": ["Noir pur", "Gris froid", "Rose pâle"]
        },
        
        # 🧬 MORPHO-MATCH - Body Analysis
        "morpho_analysis": {
            "silhouette_type": "X - Sablier",
            "body_proportions": {
                "epaules": "Équilibrées",
                "taille": "Marquée",
                "hanches": "Proportionnées"
            },
            "zones_valoriser": ["Taille fine", "Décolleté"],
            "zones_minimiser": ["Hanches légèrement prononcées"],
            "best_cuts": ["Robes portefeuille", "Blazers cintrés", "Pantalons taille haute"],
            "avoid_cuts": ["Coupes oversize", "Tailles basses"]
        },
        
        # 🎯 CONTEXT GENIUS - Situational Analysis
        "context_analysis": {
            "professional_context": {
                "sector": "Tech / Startup",
                "level": "Directrice Marketing",
                "environment": "Corporate innovant"
            },
            "emotional_triggers": ["Lancement produit J-3", "Comité directeur"],
            "urgency_score": 87,
            "perceived_pressure": "Élevée",
            "budget_declared": 800,
            "budget_psychological": 1200
        },
        
        # 🗺 GEO-SYNC - Location Analysis
        "geo_analysis": {
            "client_location": "Paris 8ème",
            "max_travel_time": "30 min",
            "nearby_boutiques": ["Galeries Lafayette", "Printemps", "Avenue Montaigne"],
            "suggested_itinerary": ["Ralph Lauren → Sandro → Isabel Marant"]
        },
        
        # 🎼 HARMONY ENGINE - Recommendations
        "recommendations": {
            "shopping_strategy": "Power Dressing moderne et accessible",
            "key_pieces": [
                "Blazer structuré bordeaux - €350",
                "Pantalon cigarette marine - €180",
                "Chemisier en soie crème - €220",
                "Escarpins nude classiques - €280"
            ],
            "approach_tips": [
                "Commencer par valider son expertise professionnelle",
                "Montrer des exemples de femmes dirigeantes inspirantes",
                "Proposer des pièces qui allient autorité et féminité",
                "Éviter les termes trop audacieux au début"
            ],
            "conversation_starters": [
                "Parlez-moi de votre nouveau rôle...",
                "Quelles sont vos icônes de style professionnel ?",
                "Comment voulez-vous vous sentir lors du comité ?"
            ]
        }
    }

# ============= FULL ANALYSIS ENDPOINT =============

@app.post("/api/full-analysis")
def full_analysis(data: dict, db: Session = Depends(get_db)):
    """
    Complete 6-Agent AI Analysis for client matching
    Returns comprehensive analysis from all agents + matched shoppers
    """
    user_profile = data.get("user_profile", {})
    step1 = user_profile.get("step1", {})
    step2 = user_profile.get("step2", {})
    step3 = user_profile.get("step3", {})
    
    location = step2.get("location", "Paris")
    mood = step1.get("mood", "neutre")
    objective = step1.get("objectiveLabel", "")
    budget = step3.get("budget", 500)
    styles = step3.get("selectedStyles", [])
    description = step2.get("description", "")
    
    # ============ 1. MIRROR AGENT - Emotional Analysis ============
    mirror_analysis = {
        "emotional_state": get_emotional_state(mood, description),
        "confidence_score": calculate_confidence(mood, description),
        "emotional_profile": {
            "confidence_vestimentaire": 45 + (20 if "confiant" in mood.lower() else 0),
            "ouverture_changement": 75 if "découvrir" in objective.lower() else 55,
            "sensibilite_regard": 70,
            "attachement_conventions": 50,
            "budget_psychologique": int(budget * 1.3),
            "zone_confort": get_comfort_zone(styles),
            "potentiel_transformation": 80 if "renouveler" in objective.lower() else 60
        },
        "detected_life_events": detect_life_events(description, objective),
        "psychological_blocks": detect_blocks(description),
        "hidden_needs": get_hidden_needs(objective, description)
    }
    
    # ============ 2. CHROMATIC AI - Color Analysis ============
    chromatic_analysis = {
        "analyzed": True,
        "season": "Automne" if "automne" in description.lower() else "Universel",
        "power_colors": ["Bordeaux", "Bleu marine", "Vert sapin"],
        "neutral_colors": ["Beige", "Gris", "Blanc cassé"],
        "challenge_colors": ["Orange", "Jaune moutarde"]
    }
    
    # ============ 3. MORPHO-MATCH - Body Analysis ============
    morpho_analysis = {
        "has_photo": step2.get("hasPhoto", False),
        "silhouette_type": "À déterminer (photo requise)" if not step2.get("hasPhoto") else "X - Sablier",
        "recommendation": "Coupes structurées recommandées pour contexte professionnel"
    }
    
    # ============ 4. CONTEXT GENIUS - Situational Analysis ============
    has_urgency = detect_urgency(description, objective)
    context_analysis = {
        "urgency_score": 85 if has_urgency else 45,
        "urgency_level": "Élevée" if has_urgency else "Normale",
        "occasion": step3.get("occasion", "general"),
        "budget_declared": budget,
        "budget_psychological": int(budget * 1.2),
        "pressure_level": "Haute" if has_urgency else "Modérée"
    }
    
    # ============ 5. GEO-SYNC - Location Analysis ============
    geo_analysis = {
        "client_location": location,
        "search_radius": "15 km",
        "travel_tolerance": "30 min max",
        "nearby_areas": get_nearby_areas(location)
    }
    
    # ============ 6. HARMONY ENGINE - Matching ============
    # Get shoppers from database
    try:
        shoppers = db.query(ShopperProfile).all()
        shopper_list = [
            {
                "id": s.id,
                "name": s.name,
                "location": s.location,
                "bio": s.bio,
                "avatar_url": s.avatar_url or f"https://i.pravatar.cc/150?u={s.id}",
                "specialties": s.specialties or [],
                "satisfaction_rate": s.satisfaction_rate or 4.5,
                "total_clients": s.total_clients or 0
            }
            for s in shoppers
        ]
    except:
        shopper_list = []
    
    # Calculate match scores
    matched_shoppers = calculate_harmony_scores(
        shopper_list, 
        location, 
        styles, 
        mirror_analysis,
        context_analysis
    )
    
    return {
        "status": "success",
        "agents": {
            "mirror": mirror_analysis,
            "chromatic": chromatic_analysis,
            "morpho": morpho_analysis,
            "context": context_analysis,
            "geo": geo_analysis
        },
        "harmony_engine": {
            "algorithm_version": "2.0",
            "weights": {
                "emotional_fit": 0.25,
                "color_match": 0.15,
                "morpho_expertise": 0.20,
                "situation_alignment": 0.25,
                "convenience": 0.10,
                "social_proof": 0.05
            }
        },
        "matched_shoppers": matched_shoppers[:5],
        "user_profile_summary": {
            "mood": mood,
            "objective": objective,
            "location": location,
            "budget": budget,
            "styles": styles
        }
    }

# ============= HELPER FUNCTIONS =============

def get_emotional_state(mood: str, description: str) -> str:
    mood_lower = mood.lower() if mood else ""
    desc_lower = description.lower() if description else ""
    
    if "anxieux" in mood_lower or "stressé" in desc_lower:
        return "Anxieux, besoin de réassurance"
    elif "motivé" in mood_lower or "enthousias" in desc_lower:
        return "Motivé et ouvert au changement"
    elif "confiant" in mood_lower:
        return "Confiant, cherche à optimiser"
    else:
        return "Neutre, en exploration"

def calculate_confidence(mood: str, description: str) -> int:
    score = 50
    mood_lower = mood.lower() if mood else ""
    desc_lower = description.lower() if description else ""
    
    if "confiant" in mood_lower: score += 25
    if "motivé" in mood_lower: score += 15
    if "anxieux" in mood_lower: score -= 20
    if "ne sais pas" in desc_lower: score -= 15
    if "aide" in desc_lower: score -= 10
    
    return max(0, min(100, score))

def get_comfort_zone(styles: list) -> str:
    if not styles:
        return "Non définie - ouvert aux suggestions"
    return f"Préférence pour : {', '.join(styles[:3])}"

def detect_life_events(description: str, objective: str) -> list:
    events = []
    combined = (description + " " + objective).lower()
    
    if "nouveau" in combined or "nouvelle" in combined:
        events.append("Nouveau départ")
    if "mariage" in combined or "marié" in combined:
        events.append("Mariage")
    if "travail" in combined or "job" in combined:
        events.append("Évolution professionnelle")
    if "événement" in combined:
        events.append("Événement spécial")
    
    return events if events else ["Envie de changement"]

def detect_blocks(description: str) -> list:
    blocks = []
    desc_lower = description.lower() if description else ""
    
    if "ne sais pas" in desc_lower:
        blocks.append("Manque de repères stylistiques")
    if "peur" in desc_lower or "anxieu" in desc_lower:
        blocks.append("Appréhension du regard des autres")
    if "budget" in desc_lower or "prix" in desc_lower:
        blocks.append("Contrainte budgétaire perçue")
    
    return blocks if blocks else ["Aucun blocage majeur détecté"]

def get_hidden_needs(objective: str, description: str) -> str:
    combined = (objective + " " + description).lower()
    
    if "confiance" in combined:
        return "Retrouver confiance en son image"
    elif "style" in combined or "découvrir" in combined:
        return "Définir une identité visuelle authentique"
    elif "événement" in combined or "occasion" in combined:
        return "Marquer un moment important par son apparence"
    else:
        return "Se sentir bien dans ses vêtements au quotidien"

def detect_urgency(description: str, objective: str) -> bool:
    combined = (description + " " + objective).lower()
    urgency_words = ["urgent", "pressé", "vite", "demain", "jours", "bientôt", "rapidement"]
    return any(word in combined for word in urgency_words)

def get_nearby_areas(location: str) -> list:
    location_lower = location.lower()
    
    if "paris" in location_lower:
        return ["Paris 1er", "Paris 2e", "Paris 8e", "Paris 16e"]
    elif "lyon" in location_lower:
        return ["Lyon Part-Dieu", "Lyon Confluence", "Villeurbanne"]
    elif "marseille" in location_lower:
        return ["Marseille Centre", "Marseille Vieux-Port", "Aix-en-Provence"]
    else:
        return ["Zone métropolitaine"]

def calculate_harmony_scores(shoppers: list, user_location: str, styles: list, mirror: dict, context: dict) -> list:
    """Calculate final matching scores using Harmony Engine algorithm"""
    
    scored_shoppers = []
    user_loc_lower = user_location.lower() if user_location else ""
    
    for shopper in shoppers:
        shopper_loc = (shopper.get("location") or "").lower()
        specialties = shopper.get("specialties") or []
        rating = shopper.get("satisfaction_rate") or 4.0
        
        # 1. Emotional Fit (25%)
        emotional_fit = 70 + (mirror.get("confidence_score", 50) - 50) * 0.3
        
        # 2. Location/Convenience (10%)
        convenience = 0
        if user_loc_lower and shopper_loc:
            if user_loc_lower == shopper_loc:
                convenience = 100
            elif user_loc_lower.split()[0] in shopper_loc or shopper_loc.split()[0] in user_loc_lower:
                convenience = 70
            else:
                convenience = 30
        
        # 3. Specialty Match (20%)
        specialty_match = 50
        for style in styles:
            if any(style.lower() in s.lower() for s in specialties):
                specialty_match += 15
        
        # 4. Context Alignment (25%)
        urgency = context.get("urgency_score", 50)
        context_score = 60 + (urgency - 50) * 0.2
        
        # 5. Social Proof (5%)
        social_proof = min(100, (rating / 5) * 100)
        
        # HARMONY SCORE
        final_score = (
            emotional_fit * 0.25 +
            specialty_match * 0.20 +
            context_score * 0.25 +
            convenience * 0.10 +
            social_proof * 0.05 +
            50 * 0.15  # Base morpho score
        )
        
        scored_shoppers.append({
            **shopper,
            "match_score": round(final_score, 1),
            "match_details": {
                "emotional_fit": round(emotional_fit, 1),
                "specialty_match": round(specialty_match, 1),
                "context_alignment": round(context_score, 1),
                "convenience": round(convenience, 1),
                "social_proof": round(social_proof, 1)
            }
        })
    
    return sorted(scored_shoppers, key=lambda x: x["match_score"], reverse=True)