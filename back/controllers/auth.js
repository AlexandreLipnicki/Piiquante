// Importe le modèle utilisateur depuis le fichier auth.js
import user from '../models/auth.js';

// Importe le module bcrypt pour le hachage des mots de passe
import bcrypt from 'bcrypt';

// Importe la fonction validationResult du module express-validator pour la validation des entrées utilisateur
import { validationResult } from 'express-validator';

// Importe le module jsonwebtoken pour la gestion des jetons d'authentification
import jwt from 'jsonwebtoken';

// Importe le module dotenv pour la gestion des variables d'environnement
import dotenv from 'dotenv'

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

// Fonction pour la création d'un nouvel utilisateur
export function signupPost(req, res) {

    // Valide les entrées utilisateur en utilisant la fonction validationResult d'express-validator
    const errors = validationResult(req);

    // Si des erreurs sont détectées, renvoie une réponse avec un code d'erreur 400 et une liste des erreurs détectées
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Si les entrées sont valides, hache le mot de passe fourni par l'utilisateur à l'aide de bcrypt, crée un nouvel utilisateur avec l'adresse e-mail et le mot de passe haché, puis le sauvegarde dans la base de données
    else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newUser = new user({
                    email: req.body.email,
                    password: hash
                });
                return newUser.save()
                    .then(() => res.status(201).json({ message: 'Le compte a bien été créé' }))
                    .catch(error => res.status(400).json({ error }))
                    ;
            })
            .catch(error => res.status(500).json({ error }));
    }
};

// Fonction pour l'authentification d'un utilisateur existant
export function loginPost(req, res) {

    // Cherche un utilisateur avec l'adresse e-mail fournie dans la base de données
    return user.findOne({ email: req.body.email })

        // Si aucun utilisateur n'est trouvé, renvoie une réponse avec un code d'erreur 401 (non autorisé)
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Connexion impossible' })
            }

            // Si l'utilisateur est trouvé, compare le mot de passe fourni avec le mot de passe stocké (haché) à l'aide de bcrypt
            return bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    // Si les mots de passe ne correspondent pas, renvoie une réponse avec un code d'erreur 401 (non autorisé)
                    if (!valid) {
                        return res.status(401).json({ error: 'Connexion impossible' })
                    }

                    // Si les mots de passe correspondent, crée un jeton d'authentification à l'aide de jsonwebtoken et renvoie une réponse avec le code 200 (OK), l'ID de l'utilisateur et le jeton d'authentification
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })

                // Si une erreur se produit, renvoie une réponse avec un code d'erreur 500 (erreur interne du serveur)
                .catch(error => res.status(500).json({ error }))
                ;
        })

        // Si une erreur est survenue lors de la recherche de l'utilisateur, retourner une réponse avec l'erreur en json
        .catch(error => res.status(500).json({ error }))
        ;

}

// Vérifie si l'utilisateur est authentifié
export function auth(req, res, next) {
    try {
        // On récupère le token d'authentification depuis les headers de la requête
        const token = req.headers.authorization.split(' ')[1];
        // On décode le token en utilisant la clé secrète JWT_SECRET
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // On récupère l'id de l'utilisateur depuis le token décodé
        const userId = decodedToken.userId;
        // On ajoute l'identifiant de l'utilisateur à la requête
        req.auth = { userId };

        // On vérifie que l'id de l'utilisateur dans le corps de la requête correspond bien à celui dans le token décodé
        if (req.body.userId && req.body.userId !== userId) {
            // Si les ids ne correspondent pas, on lance une exception avec le message 'user id non valable'
            throw 'user id non valable';
        } else {
            // Sinon, on passe à la prochaine fonction middleware
            next();
        }
    } catch (error) {
        // Si une erreur est survenue pendant l'exécution du code, on renvoie une réponse avec un code d'erreur 401 (non autorisé) et un message d'erreur
        res.status(401).json({ error: 'Requête non authentifiée' });
    }
}