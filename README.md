# M-Motors - Location/achat voitures

## Présentation

M-Motors est une application web permettant la vente de véhicules d'occasion ainsi que la location longue durée avec option d'achat.

L'application permet aux utilisateurs de consulter le catalogue de véhicules, créer un compte, déposer un dossier avec justificatifs et suivre l'avancement de leur demande.

Une interface d'administration permet de gérer les véhicules et les dossiers déposés par les clients.

## Accès rapide

| Lien Git frontend |  |
| Lien Git backend |  |
| Lien application |  |
| Lien API backend |  |
| Lien Healthcheck Backend |  |

| Email : admin-motors@gmail.com |
| Mot de passe | Voir documentation d'évaluation |

## Installation

Backend :

```bash
cd backend 
python -m venv venv 
.\venv\Scripts\activate 
pip install -r requirements.txt 
uvicorn app.main:app --reload
```

Frontend :

```bash
cd mmotors/frontend
npm install
npm run dev
```

URLs locales :

- Frontend : `http://localhost:5173`
- Backend : `http://localhost:8000`
- Documentation API : `http://localhost:8000/docs`
- Santé API : `http://localhost:8000/health`

## Architecture

```bash
L'application repose sur une architecture client-serveur composée de trois éléments principaux :

Un frontend développé avec React et Vite permettant l'affichage de l'interface utilisateur.
Une API REST développée avec FastAPI qui gère l'authentification, les véhicules, les dossiers et les différentes règles métier.
Une base de données PostgreSQL utilisée pour stocker les utilisateurs, les véhicules, les dossiers et les documents.

L'authentification est réalisée à l'aide de jetons JWT. Les mots de passe sont sécurisés grâce au hachage bcrypt. Les échanges entre le frontend et le backend sont réalisés via des requêtes HTTP.

Cette architecture a été choisie pour sa simplicité, sa maintenabilité et sa facilité de déploiement sur des plateformes cloud comme Vercel et Render.
```

## Fonctionnalités

-Espace client :

Consultation du catalogue de véhicules
Recherche et filtrage des véhicules
Création de compte
Connexion sécurisée
Dépôt d'un dossier
Téléversement de documents
Suivi du statut du dossier


-Espace administrateur :

Ajout de véhicules
Modification des véhicules
Gestion des offres de vente et location
Consultation des dossiers
Validation ou refus des demandes
Ajout de commentaires administratifs

## Sécurité

Authentification JWT
Mots de passe chiffrés avec bcrypt
Gestion des rôles utilisateur / administrateur
Validation des données avec Pydantic
Contrôle d'accès aux routes sensibles
Variables d'environnement pour les données sensibles

## Monitoring

Endpoint de santé : /health
Endpoint de test : /health/alert-test
Journalisation des requêtes
Suivi des erreurs applicatives

## Déploiement

Frontend
    Vercel
Backend
    Render
Base de données
    PostgreSQL

## Variables principales :

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `CORS_ORIGINS`
- `VITE_API_URL`

## Technologies utilisées

Frontend
    React
    Vite
    React Router
    CSS
Backend
    FastAPI
    SQLAlchemy
    Pydantic
    JWT
    Bcrypt
Base de données
    PostgreSQL