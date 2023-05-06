// On importe la fonction "check" du module "express-validator"
import { check } from 'express-validator';

// On crée une variable "signupCheck" qui contient un tableau de vérifications à effectuer pour l'inscription
export const signupCheck = [

    // On ajoute une vérification pour le champ "email"
    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide')
        .isEmail().withMessage('Format incorrect, veuillez entrer une adresse email valide'),

    // On ajoute une vérification pour le champ "password"
    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage('Votre mot de passe doit comporter au moins 8 caractères, un caractère en majuscule et un chiffre')
]

// On crée une variable "loginCheck" qui contient un tableau de vérifications à effectuer pour la connexion
export const loginCheck = [

    // On ajoute une vérification pour le champ "email"
    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide'),

    // On ajoute une vérification pour le champ "password"
    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')
]
