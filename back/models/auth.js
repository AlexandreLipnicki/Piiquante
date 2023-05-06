// On importe le module "mongoose" pour interagir avec une base de données MongoDB
import mongoose from 'mongoose';
// On importe le module "mongoose-unique-validator" pour faciliter la validation des champs uniques dans Mongoose
import uniqueValidator from 'mongoose-unique-validator';

// On définit un nouveau schéma Mongoose pour les utilisateurs
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // On définit le champ "email" comme obligatoire et unique
    password: { type: String, required: true } // On définit le champ "password" comme obligatoire
});

// On ajoute le plugin "mongoose-unique-validator" au schéma, pour valider automatiquement les champs uniques
userSchema.plugin(uniqueValidator);

// On exporte un modèle Mongoose pour les utilisateurs, qui utilise le schéma défini précédemment
export default mongoose.model('user', userSchema);
