// Importation d'Express et initialisation d'un router
import express from 'express';
const router = express.Router();

// Importation des fonctions des contrôleurs de sauces, du middleware d'authentification et du middleware de gestion des images
import * as saucesControllers from '../controllers/sauces.js';
import { auth } from '../controllers/auth.js';
import multerConfig from '../middlewares/multerConfig.js';

// Définition des routes pour les sauces
router.get('/', auth, saucesControllers.getAllSauces);
router.get('/:id', auth, saucesControllers.getSauce);
router.post('/', auth, multerConfig, saucesControllers.postSauce);
router.put('/:id', auth, multerConfig, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.post('/:id/like', auth, saucesControllers.likeSauce);

// Exportation du router
export default router;
