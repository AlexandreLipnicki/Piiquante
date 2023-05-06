// Importation des modules nécessaires
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js';
import saucesRoutes from './routes/sauces.js';

// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));

// Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware pour parser les données JSON
app.use(express.json());

// Middleware pour servir les fichiers images
app.use('/images', express.static(path.join('images')));

// Routes pour la gestion de l'authentification
app.use('/api/auth', authRoutes);

// Routes pour la gestion des sauces
app.use('/api/sauces', saucesRoutes);

// Exportation de l'application
export default app;