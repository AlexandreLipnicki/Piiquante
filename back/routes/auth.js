// Importation d'Express et initialisation d'un router
import express from 'express';
const router = express.Router();

// Importation des fonctions des contrôleurs de l'authentification et des middlewares
import * as authControllers from '../controllers/auth.js';
import * as auth from '../middlewares/auth.js';

// Définition des routes pour l'inscription et la connexion d'un utilisateur
router.post('/signup', auth.signupCheck, authControllers.signupPost);
router.post('/login', auth.loginCheck, authControllers.loginPost);

// Exportation du router pour une utilisation dans d'autres fichiers
export default router;
