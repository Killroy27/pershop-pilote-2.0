# PERSHOP PILOTE 2.0 - Docker Setup

## 🐳 Lancement avec Docker

### Prérequis
- Docker et Docker Compose installés
- Fichier `.env` à la racine avec vos clés API

### Démarrage rapide

```bash
# 1. Créer le fichier .env avec vos clés
cp .env.example .env
# Puis éditez .env avec vos vraies clés API

# 2. Lancer l'application complète
docker-compose up --build

# 3. Accéder à l'application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Documentation API: http://localhost:8000/docs
```

### Commandes utiles

```bash
# Arrêter les conteneurs
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuild sans cache
docker-compose build --no-cache

# Arrêter et supprimer les volumes
docker-compose down -v
```

## 📦 Architecture

- **Frontend** (Next.js) : Port 3000
- **Backend** (FastAPI) : Port 8000
- **Network** : pershop-network (bridge)

## 🔧 Variables d'environnement

Créez un fichier `.env` à la racine :

```env
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
ANTHROPIC_API_KEY=sk-ant-...
```

## 🚀 Production

Pour déployer en production, utilisez :

```bash
docker-compose -f docker-compose.yml up -d
```
