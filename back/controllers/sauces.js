// Import des modules et des modèles nécessaires
import sauce from '../models/sauce.js';
import fs from 'fs';
import path from 'path';

// Récupère toutes les sauces
export function getAllSauces(req, res) {
    return sauce.find()
        .then(sauces => { res.status(200).json(sauces) })
        .catch(error => res.status(400).json({ error }));
};

// Récupère une sauce spécifique en fonction de l'ID fourni
export function getSauce(req, res) {
    return sauce.findOne({ _id: req.params.id })
        .then(specSauce => res.status(200).json(specSauce))
        .catch(error => res.status(404).json({ error }));
};

// Crée une nouvelle sauce
export function postSauce(req, res) {
    // Vérifie que toutes les informations nécessaires ont été fournies et qu'elles sont valides
    const sauceObject = JSON.parse(req.body.sauce);
    if (!sauceObject.name || sauceObject.name.length < 3 || sauceObject.name.length > 30) {
        throw 'Le nom doit comporter entre 3 et 20 caractères';
    } else if (!sauceObject.manufacturer || sauceObject.manufacturer.length < 3 || sauceObject.manufacturer.length > 30) {
        throw 'Le nom du manufacturer doit comporter entre 3 et 20 cartactères';
    } else if (sauceObject.description.length > 300) {
        throw 'La description est trop longue';
    } else if (!sauceObject.mainPepper || sauceObject.mainPepper.length < 3 || sauceObject.mainPepper.length > 20) {
        throw 'Le piment principal doit comporter entre 3 et 20 caractères';
    } else if (!sauceObject.heat) {
        throw 'Mauvais format d\'intensité ';
    }

    // Vérifie que le fichier envoyé est au format image
    if (req.file) {
        const fileExtension = path.extname(req.file.filename);
        if (!['.jpg', '.jpeg', '.png'].includes(fileExtension.toLowerCase())) {
            throw 'Le fichier doit être au format jpg, jpeg ou png';
        }
    }

    try {
        // Crée une nouvelle sauce avec les informations fournies
        const newSauce = new sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });

        // Enregistre la nouvelle sauce dans la base de données
        return newSauce.save()
            .then(() => res.status(201).json({ message: 'La sauce a bien été créée' }))
            .catch((error) => res.status(400).json({ error }));

    } catch (error) {
        return res.status(403).json({ error });
    }
};

// Modifie une sauce existante
export function modifySauce(req, res) {
    // Vérifie que le fichier envoyé est au format image
    if (req.file) {
        const fileExtension = path.extname(req.file.filename);
        if (!['.jpg', '.jpeg', '.png'].includes(fileExtension.toLowerCase())) {
            throw 'Le fichier doit être au format jpg, jpeg ou png';
        }
    }

    try {
        // Récupère la sauce existante
        return sauce.findOne({ _id: req.params.id })

            .then((displayedSauce) => {

                // Vérifie si la sauce existe
                if (!req.params.id) {
                    return res.status(404).json({ error: 'sauce non trouvée' });
                    // Vérifie si l'utilisateur a l'autorisation de modifier la sauce
                } else if (displayedSauce.userId !== req.auth.userId) {
                    return res.status(401).json({ error: 'requête non autorisée' });
                }

                // Crée un objet sauce avec les données reçues
                const sauceObject = req.file ?
                    {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : { ...req.body };

                // Met à jour la sauce avec les nouvelles données
                return sauce.updateOne({ _id: req.params.id }, { ...sauceObject, id: req.params.id })
                    .then(() => res.status(200).json({ message: 'sauce modifiée' }))
                    .catch(error => res.status(400).json({ error }));
            })

    } catch (err) {
        return res.status(403).json({ err })
    }

};

// Supprime une sauce existante
export function deleteSauce(req, res) {

    // Récupère la sauce existante
    return sauce.findOne({ _id: req.params.id })
        .then(sauce => {

            // Vérifie si la sauce existe
            if (!sauce) {
                return res.status(404).json({ error: 'sauce non trouvée' });
                // Vérifie si l'utilisateur a l'autorisation de supprimer la sauce
            } else if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({ error: 'requête non autorisée' });
            }

            // Supprime l'image correspondante
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                // Supprime la sauce de la base de données
                return sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'sauce supprimée' }))
                    .catch(error => res.status(404).json({ error }));
            });

        })
        .catch(error => res.status(404).json({ error }));

};

// Gère les votes sur une sauce
export function likeSauce(req, res) {

    // Récupère la sauce correspondante à l'id fourni dans la requête
    sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Récupère l'id de l'utilisateur et le choix de vote (like, dislike ou annulation)
            let curentUserId = req.body.userId;
            let userLikeState = req.body.like;
            // Récupère les listes des utilisateurs ayant liké et disliké la sauce
            let likedUsersList = sauce.usersLiked;
            let dislikedUsersList = sauce.usersDisliked;

            // Cas où l'utilisateur dislike la sauce
            if (userLikeState == -1) {
                // Cas où l'utilisateur avait déjà liké la sauce
                if (likedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    // Réduit le compteur de likes et retire l'utilisateur de la liste des utilisateurs ayant liké
                    sauce.likes -= 1;
                    likedUsersList.pop(curentUserId);
                    // Augmente le compteur de dislikes et ajoute l'utilisateur à la liste des utilisateurs ayant disliké
                    sauce.dislikes += 1;
                    dislikedUsersList.push(curentUsertId);
                }
                // Cas où l'utilisateur n'avait pas encore voté
                else if (dislikedUsersList.indexOf(`${curentUserId}`) == -1) {
                    // Augmente le compteur de dislikes et ajoute l'utilisateur à la liste des utilisateurs ayant disliké
                    sauce.dislikes += 1;
                    dislikedUsersList.push(curentUserId);
                }
            }

            // Cas où l'utilisateur annule son vote
            else if (userLikeState == 0) {
                // Cas où l'utilisateur avait disliké la sauce
                if (dislikedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    // Réduit le compteur de dislikes et retire l'utilisateur de la liste des utilisateurs ayant disliké
                    sauce.dislikes -= 1;
                    dislikedUsersList.pop(curentUserId);
                }
                // Cas où l'utilisateur avait liké la sauce
                else if (likedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    // Réduit le compteur de likes et retire l'utilisateur de la liste des utilisateurs ayant liké
                    sauce.likes -= 1;
                    likedUsersList.pop(curentUserId);
                }
            }

            // Cas où l'utilisateur like la sauce
            else if (userLikeState == 1) {
                // Cas où l'utilisateur n'avait pas encore liké la sauce
                if (likedUsersList.indexOf(`${curentUserId}`) == -1) {
                    // Augmente le compteur de likes et ajoute l'utilisateur à la liste des utilisateurs ayant liké
                    sauce.likes += 1;
                    likedUsersList.push(curentUserId);
                }
                // Cas où l'utilisateur avait disliké la sauce
                else if (dislikedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    // Réduit le compteur de dislikes, retire l'utilisateur de la liste des utilisateurs ayant disliké,
                    // augmente le compteur de likes et ajoute l'utilisateur à la liste des utilisateurs ayant liké
                    sauce.dislikes -= 1;
                    dislikedUsersList.pop(curentUserId);
                    sauce.likes += 1;
                    likedUsersList.push(curentUsertId);
                }
            }

            // Enregistre la sauce modifiée
            return sauce.save()
                // Envoie une réponse JSON pour confirmer que le vote a été enregistré
                .then(res.status(200).json({ message: 'Vote enregistré' }))
                // Envoie une réponse JSON avec une erreur 404 si une erreur se produit lors de l'enregistrement de la sauce
                .catch(error => { res.status(404).json({ error }) })
        })
        // Si une erreur se produit lors de la recherche de la sauce
        .catch(error => {
            // Envoie une réponse JSON avec une erreur 404
            res.status(404).json({ error })
        })
};

