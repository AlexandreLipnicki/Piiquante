<!DOCTYPE html>
<html lang="fr">
<body>
  <h1>Projet 6 OpenClassrooms : Piiquante</h1>
  <p>Piiquante est un projet développé dans le cadre du cours de développement web d'OpenClassrooms. Il s'agit d'une application web permettant de partager des sauces piquantes entre les utilisateurs.</p>
  
  <h2>Mission</h2>
  <p>La mission de Piiquante est de créer une plateforme de partage de sauces piquantes en ligne. L'application permet aux utilisateurs de publier des sauces, et de les évaluer.
  
  <h2>Technologies utilisées</h2>
  <ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>Angular</li>
  </ul>

  <h2>Fonctionnalités</h2>
  <ul>
    <li>Création, lecture, mise à jour et suppression de sauces</li>
    <li>Évaluation et notation des sauces par les utilisateurs</li>
    <li>Ajout et suppression de sauces à la liste de favoris de l'utilisateur</li>
    <li>Système de sécurité pour empêcher les utilisateurs non autorisés d'accéder à certaines fonctionnalités</li>
  </ul>
  
  <h2>Installation et utilisation</h2>
  <p>Pour installer et utiliser Piiquante, suivez les instructions ci-dessous :</p>
  <ol>
    <li>Clonez le repository GitHub</li>
    <li>Installer les dépendances avec <code>npm install</code> dans le dossier <strong>back</strong> et <strong>front</strong>.</li>
    <li>Créez un fichier <code>.env</code> dans <strong>back</strong> contenant : <br>
    <code>JWT_SECRET= VOTRE_CLÉ_SECRÈTE</code><br>
    <code>DB_LINK = "VOTRE_LIEN_DE_CONNEXION_À_MONGODB"</code></li>
<li>Exécutez la commande <code>nodemon server</code> depuis <strong>back</strong> pour lancer le serveur</li>
<li>Exécutez la commande <code>npm start</code> depuis <strong>front</strong> pour lancer l'application</li>
<li>Ouvrez votre navigateur et accédez à l'adresse <code>http://localhost:4200</code> pour utiliser l'application</li>
  </ol>
  
  <h2>Aperçu de l'application</h2>
  <strong>Page login / sign up</strong>
  <img width="961" alt="login" src="https://user-images.githubusercontent.com/97740379/236632949-43b911ee-f0b9-437a-b466-6a2b29f08fa6.png">
  <strong>Page regroupant toutes les sauces</strong>
  <img width="949" alt="sauces" src="https://user-images.githubusercontent.com/97740379/236632964-c4574e2f-7cf2-4fb3-8a02-976c63bee876.png">
  <strong>Page produit d'une sauce</strong>
  <img width="961" alt="sauce" src="https://user-images.githubusercontent.com/97740379/236632972-5c28f585-f3c7-4a28-a746-a4dd9e55ce92.png">
  <strong>Page "ajouter une sauce" / "modifier une sauce"</strong>
  <img width="949" alt="modify" src="https://user-images.githubusercontent.com/97740379/236632977-c821e3c1-6a7a-4c60-bb97-02a0edfd31d0.png">
</body>
</html>
