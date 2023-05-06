// On importe le module "multer" qui permet de gérer les fichiers envoyés depuis un formulaire HTML
import multer from 'multer';

// On définit un objet "MIME_TYPES" qui contient des correspondances entre les types MIME et les extensions de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// On crée une configuration de stockage pour Multer
const storage = multer.diskStorage({
  // On définit le dossier de destination où les fichiers seront stockés
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // On définit le nom du fichier en combinant son nom d'origine, la date actuelle et son extension
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // On remplace les espaces par des underscores dans le nom du fichier
    const extension = MIME_TYPES[file.mimetype]; // On récupère l'extension de fichier correspondant au type MIME
    callback(null, name + Date.now() + '.' + extension); // On appelle la fonction de rappel avec le nom complet du fichier
  }
});

// On exporte une instance de Multer configurée avec la configuration de stockage définie précédemment, en spécifiant que le formulaire HTML envoie un fichier appelé "image"
export default multer({ storage: storage }).single('image');
