# Démarche à suivre pour l'éxécution en local

## 1) Importer le code

Clonez ce github sur votre machine ou téléchargez le zip

## 2) Créez une base de données MySQL

Créez une base de données MySQL sur votre machine

## 3) Modifier le fichier config.json

Dans ./server/confing/config.json, modifiez la partie "development" du fichier config.json avec les informations de la base de données que vous venez de créer

Exemple:

```json
  "development": {
    "username": "myUsername",
    "password": "myPassword",
    "database": "myDatabaseName",
    "host": "IpOfHost",
    "dialect": "mysql"
  }
```

## 4) Installez les dépendances npm

Executez la commande npm install dans le dossier server ET client

cd ./client/
npm install

cd ./server/
npm install

## 5) Lancez le site en local

Executez la commande npm start dans le dossier server ET client

cd ./client/
npm start

cd ./server/
npm start

Vous pouvez maintenant utilisez le site en local

## 6) Concernant l'utilisateur admin

L'utilisateur est crée automatiquement par le fichier ./server/index.js
Vous pouvez directement vous connecter en tant qu'admin sur le serveur avec les informations suivantes:
email: admin@mail.com
mot de passe: Admin@123456
Vous pourrez ensuite changez ces informations
