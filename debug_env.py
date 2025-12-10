import os
from dotenv import load_dotenv

print("--- 🕵️‍♂️ DÉBUT DU DIAGNOSTIC ---")

# 1. On essaie de charger le fichier .env
reussite = load_dotenv()

if reussite:
    print("✅ Fichier .env trouvé et chargé.")
else:
    print("❌ Fichier .env NON trouvé ! Python ne le voit pas.")
    print("👉 Vérifie qu'il est bien à la racine du projet.")

# 2. On vérifie la clé
cle = os.getenv("OPENAI_API_KEY")

if cle:
    print(f"✅ Clé récupérée : {cle[:7]}... (masquée)")
    if cle.startswith("sk-proj-"):
        print("✅ Le format de la clé semble correct.")
    else:
        print("⚠️ ATTENTION : La clé ne commence pas par 'sk-proj-'. Vérifie le copier-coller.")
else:
    print("❌ AUCUNE CLÉ trouvée dans les variables d'environnement.")

print("--- FIN DU DIAGNOSTIC ---")