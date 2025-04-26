const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const verifyToken = require('../auth/verifyToken.js');
const verifyRole = require('../auth/verifyRole');

router.post('/registro', authController.registrar);
router.post('/login', authController.login);
//ruta protegida para administradores
router.get('/usuarios', verifyToken, verifyRole(['admin']), authController.obtenerUsuarios);

module.exports = router;
