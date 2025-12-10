import os
import sys

print("--- 🕵️‍♂️ DÉTECTION DU DOSSIER FANTÔME ---")

# 1. Où est le terminal actuellement ?
dossier_actuel = os.getcwd()
print(f"📍 Le Terminal est ici : {dossier_actuel}")

try:
    # 2. On essaie d'importer le fichier "supprimé"
    import backend.services.llm_service as fantome
    
    print("\n👻 J'AI TROUVÉ LE FICHIER FANTÔME !")
    print(f"👉 Il est caché ici : {fantome.__file__}")
    print("\nCompare ce chemin avec celui de ton VS Code. Ce n'est pas le même, n'est-ce pas ?")

except ImportError:
    print("\n✅ Tout va bien : Python ne trouve pas le fichier (puisqu'il est supprimé).")
    print("Le problème venait peut-être d'un cache, réessaie de créer le nouveau fichier maintenant.")

print("--- FIN ---")