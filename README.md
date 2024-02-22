# Leitner System

Application web conçue pour aider les étudiants et les professionnels à optimiser leur apprentissage grâce aux principes de la répétition espacée et de l'auto-évaluation. L'application est basée sur le système de Leitner, qui divise les fiches d'apprentissage en catégories et ajuste la fréquence de révision en fonction des performances de l'utilisateur.

## Stack technique

**Client :** React, TailwindCSS

**Server :** Node, Express, PostgreSQL

## Installation et lancement du projet

### Pré-requis

-   [Installation Node.js et npm](https://nodejs.org/en/)
-   [Installation Docker](https://www.docker.com/)

### Installation

-   Cloner le projet : `git clone git@github.com:Choetsu/leitner-system.git`
-   Se placer dans le dossier du projet : `cd leitner-system`
-   Installer les dépendances (côté back) : `cd server && npm install`
-   Installer les dépendances (côté front) : `cd ../client && npm install`
-   Lancer le docker-compose : `cd .. && docker compose up -d`
-   Lancer les migrations : `docker compose exec node npm run d:s:u`

### Lancement du projet

-   Le serveur de l'API est accessible à l'adresse : `http://localhost:8080`
-   Lancer le client : `cd client && npm run start`
-   Le client est accessible à l'adresse suivante : `http://localhost:3000`

## Fonctionnalités

-   Inscription/connexion d'un utilisateur
-   Création d'une fiche/tag
-   Ajouts d'un tag sur une fiche
-   Suppression d'un tag d'une fiche
-   Lancement d'un quizz avec choix de la date
-   Visualisation de la bonne réponse
-   Forcer la validation d'une réponse

## Expression du besoin

Les entités :

    - L'utilisateur va pouvoir gérer ses fiches via un CRUD (création de fiche,, ...) et déclencher des questionnaires en fonction de ses bibliothèque de fiches.
    - L'utilisateur va pouvoir créer des tags et les attribuer aux fiches. À savoir, que plusieurs tags seront possibles par fiche.
    - Les fiches qui seront la matière pour composer les questionnaires et mises en avant dans un cycle de temps respectant la théorie de Leitner.
    - Les questionnaires qui seront les containers qui vont accueillir les questions.
    - Les catégories qui sont placées au sein de l’entité fiches car elles représentent un champ dans la table fiches. Nous avons fait ce choix, car elles sont fixes et n’ont pas vocation à être dynamique (Exemple : pas de création de catégorie par l’utilisateur). Dans le cas inverse, nous aurions créé une table spécifique afin de pouvoir y mettre en place une logique de CRUD.

Structure du schéma hexagonal :

    - Le nombre de services est le même que celui des entités pour avoir une séparation claire.
    - La base de données est PostgreSQL et l'ORM Sequelize pour simuler la base de données objet.
    - Les services qui vont accueillir la logique de récupération des données selon la structure des modèles.
    - L'API, utilisateur non connecté qui va servir l'utilisateur via les routes login et register.
    - L'API connectée qui va servir les autres routes du jeu dans un contexte où il a un statut connecté.

## Architecture (Schéma)

![DDD](https://media.discordapp.net/attachments/1195378783465779290/1204154790637084713/Capture_decran_du_2024-02-05_21-01-03.png?ex=65e6288a&is=65d3b38a&hm=893ef2ceba2126695d83479fa419751f8fd20e896b7784b9caf3e8c0a651e263&=&format=webp&quality=lossless)

![Hexagonale](https://media.discordapp.net/attachments/1195378783465779290/1204154927656738826/image.png?ex=65e628aa&is=65d3b3aa&hm=e3bb5c3f057f8450db02475d9deb710758304bcab85165e9cac3a33d1ecd5255&=&format=webp&quality=lossless&width=550&height=302)

## Référence API

#### Post user

```http
  POST /users/register
```

Example :

```json
{
    "firstname": "Jean",
    "lastname": "People",
    "email": "jean@gmail.com",
    "password": "Testtest"
}
```

```http
  POST /users/login
```

Example :

```json
{
    "email": "jean@gmail.com",
    "password": "Testtest"
}
```

#### Get all cards

```http
  GET /cards
```

| Paramètres | Type            | Description              |
| :--------- | :-------------- | :----------------------- |
| `userId`   | `integer`       | **Required**. Id of user |
| `tags`     | `array[string]` | Example : tag1,tag2      |

#### Get card by id

```http
  GET /cards/card/{cardId}
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `cardId`   | `integer` | **Required**. Id of card |

#### Post card

```http
  POST /cards
```

Example :

```json
{
  "category": "FIRST"
  "question": "Qu'est-ce que la programmation en binôme ?",
  "answer": "Une pratique de travail en paire sur le même ordinateur.",
  "userId": 1,
}
```

#### Delete card

```http
  DELETE /cards/card/{cardId}
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `cardId`   | `integer` | **Required**. Id of card |

#### Get learning

```http
  GET /cards/quizz
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `userId`   | `integer` | **Required**. Id of user |
| `date`     | `string`  | Example : 2024-02-10     |

#### Patch learning

```http
  PATCH /cards/{cardId}/answer
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `userId`   | `integer` | **Required**. Id of user |
| `cardId`   | `ìnteger` | **Required**. Id of card |
| `ìsValid`  | `boolean` | Example : true           |

#### Get all tags by user

```http
  GET /tags/{userId}
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `userId`   | `integer` | **Required**. Id of user |

#### Post tag

```http
  POST /tags
```

| Paramètres | Type      | Description               |
| :--------- | :-------- | :------------------------ |
| `userId`   | `integer` | **Required**. Id of user  |
| `name`     | `string`  | **Required**. Name of tag |

#### Post tag to card

```http
  POST /cards/add-card-tag
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `cardId`   | `ìnteger` | **Required**. Id of card |
| `tagId`    | `integer` | **Required**. Id of tag  |

#### Delete tag to card

```http
  DELETE /cards/remove-card-tag/{tagId}
```

| Paramètres | Type      | Description              |
| :--------- | :-------- | :----------------------- |
| `tagId`    | `integer` | **Required**. Id of tag  |
| `cardId`   | `ìnteger` | **Required**. Id of card |

## Auteurs

-   **Samy Amallah** _alias_ [@Choetsu](https://github.com/Choetsu)
-   **Morade Chemlal** _alias_ [@mchemlal](https://github.com/mchemlal)
-   **Antoine Chaberneaud** _alias_ [@senex127](https://github.com/senex127)
