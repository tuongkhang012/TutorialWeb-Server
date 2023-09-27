const express = require('express');
const auth = require('../config/auth.js');
const userCtl = require('../controllers/userController.js');

const router = express.Router();
router.post('/register', userCtl.registerNewUser)
router.post('/login', userCtl.loginUser)
router.get('/me', auth, userCtl.getUserDetails)

module.exports = router;