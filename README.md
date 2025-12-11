# 🎩 PERSHOP PILOTE 2.0

**Plateforme intelligente de matching client-personal shopper** propulsée par l'IA.

---

## 🚀 Démarrage Rapide

### Option 1 : Avec Docker (Recommandé)

```bash
# 1. Cloner le projet
cd pershop-pilote-2.0

# 2. Créer le fichier .env avec vos clés API
cp .env.example .env
# Éditez .env et ajoutez vos clés OpenAI, Groq, Anthropic

# 3. Lancer l'application
docker-compose up --build

# 4. Accéder à l'application
# Frontend : http://localhost:3000
# Backend API : http://localhost:8000/docs
```

**C'est tout !** L'application est prête. 🎉

---

### Option 2 : En mode développement (sans Docker)

#### Backend (FastAPI)

```bash
# 1. Installer les dépendances Python
pip install -r requirements.txt

# 2. Créer un fichier .env à la racine
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
ANTHROPIC_API_KEY=sk-ant-...

# 3. Lancer le serveur backend
uvicorn backend.main:app --reload

# Backend disponible sur http://localhost:8000
```

#### Frontend (Next.js)

```bash
# 1. Aller dans le dossier frontend
cd pershop-front

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# Frontend disponible sur http://localhost:3000
```

---

## 📦 Architecture

```
pershop-pilote-2.0/
├── backend/                    # FastAPI Backend
│   ├── agents/                 # Agents IA (Mirror, Context Genius, Harmony)
│   ├── services/               # Services (Brain LLM)
│   └── main.py                 # Point d'entrée API
├── pershop-front/              # Next.js Frontend
│   ├── app/                    # Pages Next.js
│   ├── components/             # Composants React
│   └── public/                 # Assets statiques
├── data/                       # Base de données (shoppers_db.json)
├── docker-compose.yml          # Orchestration Docker
└── requirements.txt            # Dépendances Python
```

---

## 🎯 Fonctionnalités

### 🧠 Backend - Agents IA
- **Mirror Agent** : Analyse psychologique et émotionnelle du client
- **Context Genius** : Extraction des contraintes (urgence, budget, occasion, localisation)
- **Harmony Engine** : Matching intelligent avec scoring pondéré et Geo-Sync
- **Retry Logic** : Robustesse des appels LLM avec backoff exponentiel

### 🎨 Frontend - Interface Premium
- **Wizard Onboarding** : Questionnaire interactif en 5 étapes
  - Occasion (avec option "Autre" personnalisable)
  - Urgence (slider)
  - Budget (sélection visuelle)
  - Psychologie (textarea pour sentiments)
  - Localisation (ville)
- **Premium Loader** : Animation dorée avec checklist d'agents
- **Radar Chart** : Visualisation de l'empreinte stylistique (7 dimensions)
- **Results Dashboard** : Cartes de shoppers avec scores de match
- **Shopper Profile Modal** : Vue détaillée avec portfolio, services, et **système de réservation**
- **Design "Midnight Luxe"** : Thème noir & or avec glassmorphism

---

## 🔑 Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
# Clés API pour les LLM
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
ANTHROPIC_API_KEY=sk-ant-...

# Frontend (optionnel)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🐳 Commandes Docker Utiles

```bash
# Lancer l'app
docker-compose up

# Lancer en arrière-plan
docker-compose up -d

# Rebuild complet
docker-compose up --build

# Voir les logs
docker-compose logs -f

# Arrêter l'app
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v
```

---

## 🧪 Tester l'API

Une fois le backend lancé, accédez à la documentation interactive :

👉 **http://localhost:8000/docs**

Exemple de requête :

```bash
curl -X POST http://localhost:8000/api/analyze-and-match \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Je cherche une tenue pour un mariage urgent ce weekend à Paris, budget 1500€. Je me sens stressée et je veux être élégante."
  }'
```

---

## 📚 Stack Technique

### Backend
- **FastAPI** : Framework web Python
- **LangChain** : Orchestration LLM
- **Pydantic** : Validation de données
- **OpenAI / Groq / Anthropic** : Modèles LLM

### Frontend
- **Next.js 15** : Framework React
- **Tailwind CSS** : Styling
- **shadcn/ui** : Composants UI
- **Framer Motion** : Animations
- **Recharts** : Visualisations (Radar Chart)

### DevOps
- **Docker & Docker Compose** : Containerisation
- **Uvicorn** : Serveur ASGI

---

## 🎨 Captures d'écran

### Wizard Onboarding
![Wizard](docs/wizard.png)

### Results Dashboard
![Results](docs/results.png)

### Shopper Profile avec Booking
![Profile](docs/profile.png)

---

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/votre-repo/pershop-pilote-2.0/issues)
- Consultez la [documentation complète](DOCKER.md)

---

**Fait avec ❤️ et ✨ par l'équipe Pershop**
