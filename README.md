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
</body>
</html>
