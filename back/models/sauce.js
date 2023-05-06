// On importe le module "mongoose" pour interagir avec une base de données MongoDB
import mongoose from 'mongoose';

// On définit un nouveau schéma Mongoose pour les sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true }, // L'id de l'utilisateur qui a créé la sauce, champ obligatoire
    name: { type: String, required: true }, // Le nom de la sauce, champ obligatoire
    manufacturer: { type: String, required: true }, // Le fabricant de la sauce, champ obligatoire
    description: { type: String, required: true }, // La description de la sauce, champ obligatoire
    mainPepper: { type: String, required: true }, // Le principal ingrédient de la sauce, champ obligatoire
    imageUrl: { type: String, required: true }, // L'URL de l'image de la sauce, champ obligatoire
    heat: { type: Number, required: true }, // La force de la sauce sur une échelle de 1 à 10, champ obligatoire
    likes: { type: Number, required: true }, // Le nombre de likes de la sauce, champ obligatoire
    dislikes: { type: Number, required: true }, // Le nombre de dislikes de la sauce, champ obligatoire
    usersLiked: { type: Array, required: true }, // La liste des utilisateurs qui ont liké la sauce, champ obligatoire
    usersDisliked: { type: Array, required: true }, // La liste des utilisateurs qui ont disliké la sauce, champ obligatoire
});

// On exporte un modèle Mongoose pour les sauces, qui utilise le schéma défini précédemment
export default mongoose.model('sauce', sauceSchema);
