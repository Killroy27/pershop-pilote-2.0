import pandas as pd
import json
import random
import os

# Chemins relatifs (adaptés à ta structure)
INPUT_CSV = "../../data/personal_shopper_dataset.csv"
OUTPUT_JSON = "../../data/shoppers_db.json"

# Données pour "humaniser" les profils
CITIES = [
    {"name": "Paris 8e", "lat": 48.872, "lon": 2.308},
    {"name": "Paris Le Marais", "lat": 48.857, "lon": 2.358},
    {"name": "Lyon Confluence", "lat": 45.740, "lon": 4.819},
    {"name": "Bordeaux Centre", "lat": 44.837, "lon": -0.579},
    {"name": "Marseille Vieux-Port", "lat": 43.295, "lon": 5.374},
    {"name": "Lille", "lat": 50.629, "lon": 3.057}
]

FIRST_NAMES = ["Marine", "Thomas", "Sarah", "Lucas", "Emma", "Julien", "Léa", "Hugo", "Chloé"]

BIOS_TEMPLATES = [
    "Expert(e) en {category}, j'aide mes clients à reprendre confiance.",
    "Passionné(e) par le style {style}, je crée des dressings durables.",
    "Spécialiste {category} avec {years} ans d'expérience.",
    "Je transforme votre image pro. Expert(e) en codes vestimentaires {style}."
]

def generate_database():
    print(f"🔄 Lecture de {INPUT_CSV}...")
    
    # 1. Vérification du fichier
    if not os.path.exists(INPUT_CSV):
        # On essaie le chemin absolu si le relatif échoue
        current_dir = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(current_dir, INPUT_CSV)
        if not os.path.exists(csv_path):
            print(f"❌ ERREUR : Impossible de trouver le fichier CSV.")
            return

    df = pd.read_csv(INPUT_CSV)

    # 2. Agrégation des données (1 ligne = 1 Shopper)
    print("⚙️ Calcul des statistiques Shoppers...")
    shoppers = df.groupby('shopper_id').agg({
        'shopper_experience_years': 'first',
        'shopper_specialties': 'first',
        'shopper_avg_rating': 'first',
        'shopper_clients_count': 'first',
        'product_category': lambda x: x.mode()[0] if not x.mode().empty else 'Mode',
        'purchased': lambda x: round((x == True).mean() * 100, 1) # Taux de succès réel
    }).reset_index()

    enriched_db = []

    # 3. Enrichissement
    for _, row in shoppers.iterrows():
        city = random.choice(CITIES)
        first_name = random.choice(FIRST_NAMES)
        last_name = row['shopper_id'][-3:] 
        
        specialties = str(row['shopper_specialties']).split(';')
        if row['product_category'] not in specialties:
            specialties.append(row['product_category'])
            
        bio = random.choice(BIOS_TEMPLATES).format(
            category=row['product_category'],
            style=specialties[0],
            years=row['shopper_experience_years']
        )

        # Création du profil final
        profile = {
            "id": row['shopper_id'],
            "name": f"{first_name} {last_name}.",
            "bio": bio,
            "location": city,
            "metrics": {
                "rating": float(row['shopper_avg_rating']),
                "experience_years": int(row['shopper_experience_years']),
                "clients_count": int(row['shopper_clients_count']),
                "success_rate": float(row['purchased'])
            },
            "specialties": specialties,
            "main_category": row['product_category']
        }
        enriched_db.append(profile)

    # 4. Sauvegarde
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(enriched_db, f, indent=4, ensure_ascii=False)
        
    print(f"✅ SUCCÈS : Base de données générée avec {len(enriched_db)} profils dans 'data/shoppers_db.json'.")

if __name__ == "__main__":
    generate_database()