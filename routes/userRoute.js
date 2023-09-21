import express from 'express';
import auth from '../config/auth.js'
import * as userCtl from '../controllers/userController.js';

const router = express.Router();
router.post('/register', userCtl.registerNewUser)
router.post('/login', userCtl.loginUser)
router.get('/me', auth, userCtl.getUserDetails)

export default router;