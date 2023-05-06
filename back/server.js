// Importation du module Node.js "http"
import http from 'http'; 
// Importation de notre application express définie dans le fichier "app.js"
import app from './app.js'; 
// Configuration du port de l'application en utilisant la variable d'environnement "process.env.PORT" ou le port 3000 si la variable n'est pas définie
app.set('port', process.env.PORT || 3000); 
// Création du serveur HTTP en utilisant l'application express comme gestionnaire de requêtes
const server = http.createServer(app); 

// Le serveur écoute les requêtes sur le port défini dans la variable d'environnement "process.env.PORT" ou sur le port 3000 si la variable n'est pas définie
server.listen(process.env.PORT || 3000);