import express from 'express';
import * as authController from '../controller/authController.js';
import { validatorSignInPerson, validatorSignUpPerson } from '../validators/auth.js';
const router = express.Router();

router.post('/sign-in', validatorSignInPerson, authController.signInUser);          
router.post('/sign-up', validatorSignUpPerson, authController.signUpUser);          

export default router;