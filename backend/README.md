# M-Motors - Location / achat de véhicules

## Présentation

Le backend de M-Motors est développé avec FastAPI et expose une API REST permettant de gérer les utilisateurs, les véhicules, les dossiers de location et l'administration de l'application.

L'API communique avec une base de données PostgreSQL et assure l'ensemble des traitements métier de l'application.


## Installation
### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## URLs locales

  API : http://localhost:8000
  Documentation Swagger : http://localhost:8000/docs
  Endpoint santé : http://localhost:8000/health


## Architecture

  L'API repose sur une architecture simple et maintenable :

  FastAPI pour l'exposition des routes REST ;
  SQLAlchemy pour l'accès aux données ;
  PostgreSQL pour le stockage des données ;
  JWT pour l'authentification ;
  Bcrypt pour le chiffrement des mots de passe ;
  Pydantic pour la validation des données.

  Cette architecture facilite les évolutions futures tout en conservant une bonne lisibilité du code.

## Fonctionnalités

Gestion des utilisateurs
  Création de compte
  Authentification
  Gestion des rôles utilisateur et administrateur

Gestion des véhicules
  Consultation des véhicules
  Ajout de véhicules
  Modification des véhicules
  Gestion des offres de vente et location

Gestion des dossiers
  Dépôt d'un dossier
  Téléversement de documents
  Consultation du statut
  Validation ou refus des demandes

## Sécurité

  Authentification JWT
  Mots de passe chiffrés avec bcrypt
  Validation des données avec Pydantic
  Contrôle d'accès aux routes administrateur
  Variables d'environnement pour les données sensibles

## Monitoring

  Endpoint /health
  Endpoint /health/alert-test
  Journalisation des requêtes
  Suivi des erreurs applicatives

## Variables d'environnement

DATABASE_URL= 
JWT_SECRET_KEY= 
CORS_ORIGINS=

## Technologies utilisées

Framework
  FastAPI
Base de données
  PostgreSQL
  SQLAlchemy
Sécurité
  JWT
  Bcrypt
Validation
  Pydantic

  