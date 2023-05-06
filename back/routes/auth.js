import express from 'express';
// router creation
const router = express.Router();
// auth controllers & auth data validation
import * as authControllers from '../controllers/auth.js';
import * as auth from '../middlewares/auth.js';

// router actions
// auth.signupCheck/loginCheck = data validation with the express-validator package
// authControllers.signupPost/loginPost = function triggered 
router.post('/signup', auth.signupCheck, authControllers.signupPost);

router.post('/login', auth.loginCheck, authControllers.loginPost);

export default router;