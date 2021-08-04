### DosscheJordan_7_08062021

Projet 7 de la formation Openclassrooms

---

### Avant de commencer :

1- Verifiez que les ports 3000 & 8080 ne sont pas utilisez
2- Verifiez que vous avez bien installer npm (node package manager) & node.js

### Procédure d'installation :

---

## SQL :

- Installer un serveur MySQL en local sur votre machine ( MySQL Server ) (https://openclassrooms.com/fr/courses/1959476-administrez-vos-bases-de-donnees-avec-mysql/1959969-installez-mysql)
- Une fois le serveur installer en local sur la machine, creer une base de donnée avec le nom "development_groupomania" avec la commande " CREATE DATABASE development_groupomania"
- Executer le serveur et connecter vous avec un utilisateur "root" dans un autre terminal (powershell,etc)

## API:

- Cloner le "repositories" du projet avec `git clone https://github.com/zeddoth/DosscheJordan_7_08062021.git` dans un terminal (powershell ou celui que vous voulez)
- Une fois cloner rendez vous dans le dossier "api/config/" et editer le fichier "config.json" afin d'y inscrire les informations lié à l'utilisateur MySQL dans l'objet "development"
- Pour cette version afin de tester et simplifier l'installation le fichier ".env" et "config.json" et inclus dans le "repo" ( ont aurrais tendence à les retirer normalement )
- Ouvrir un terminal dans le dossier "api" et executer la commande `npm install`
- Une fois les "node_modules" installer , saisissez la commande `npm start`
  ( si vous obtenez cette erreur "Error: listen EADDRINUSE: address already in use :::8080" , c'est que le port 8080 est déja utilisez )

- Une fois la commande `npm start` executer une premiere fois rendez vous dans le dossier "api/models" et modifier le fichier index.js et decommentez cette partie du code (ligne 35 à 37)
- Une fois le code decommentez re-executer la commande `npm start`, retournez dans le fichier et commentez le code à nouveau afin d'executer une dernière fois le code afin que nos tables
  soit correctement configurer

## CLIENT:

- Rendez vous cette fois-ci dans le dossier client et ouvrez un terminal depuis celui-ci
- Saissisez la commande `npm install`, vous risquez d'avoir "10 moderate severity vulnerabilities" , rien d'alarmant
- Saissisez la commande `npm start`, ensuite votre navigateur internet par défaut devrez s'ouvrir avec la page de l'application WEB sous le port 3000

Afin de pouvoir profiter des privilèges administrateur nous allons faire quelque manipulations:

- Creer un compte depuis l'application web
- Tester de vous connecter avec votre compte sur l'application web
- Une fois que l'inscription et la connexion se sont déroulé avec succès rendez vous dans notre terminal la ou on est connecter à SQL
- Saissisez ces commandes :
  ```sql
  USE development_groupomania;
  UPDATE `users`
  SET `roles` = "admin"
  WHERE `username` = "votre pseudo";
  ```
- Vous êtes désormais administrateur du site et vous pourrez supprimer ce que bon vous semble ( commentaires , publications )
- Vous avez accès au projet et pouvez le testez dans son intégralité
