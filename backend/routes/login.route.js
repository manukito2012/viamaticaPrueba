
const loginCtrl = require('../controllers/login.controller');
const express = require('express');
const router = express.Router();

// Rutas para login y logout
router.post('/login', loginCtrl.loginUsuario);//
router.post('/logout',loginCtrl.logoutUsuario)

module.exports = router;