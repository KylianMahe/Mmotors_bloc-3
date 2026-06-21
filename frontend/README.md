# Frontend M-Motors

Frontend de l'application M-Motors développé avec React et Vite.

Cette interface permet aux utilisateurs de consulter les véhicules disponibles, créer un compte, déposer un dossier et suivre leurs demandes. Elle comprend également un espace d'administration pour la gestion des véhicules et des dossiers.

## Installation

```bash
cd frontend
npm install
npm run dev
```

## URL locale

http://localhost:5173

## Configuration

    Créer un fichier .env à la racine du dossier frontend si nécessaire :

```bash
VITE_API_URL=http://localhost:8000
```

## Fonctionnalités
-Espace client

    Consultation des véhicules
    Recherche et filtrage
    Création de compte
    Connexion
    Dépôt d'un dossier
    Téléversement de documents
    Suivi des demandes

-Espace administrateur

    Gestion des véhicules
    Gestion des dossiers
    Validation ou refus des demandes
    Mise à jour des statuts

## Technologies utilisées

    React
    Vite
    React Router
    Axios
    CSS