
const usuarioCtrl = require('../controllers/usuario.controller');
const express = require('express');
const router = express.Router();
const { validateCreateUsuario, handleErrors } = require('../middlewares/validations');
const { verifyToken } = require('../controllers/auth.controller');
const admin = require('../middlewares/admin');
const multer = require('multer'); 
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// rutas para el manejo de CRUD
router.post( '/',validateCreateUsuario, handleErrors,usuarioCtrl.createUsuario);
router.get('/sesions/:userId', usuarioCtrl.getSessions);
router.put('/update/:id',  usuarioCtrl.actualizarUsuario);
router.get('/filter',verifyToken, admin, usuarioCtrl.filtrarUsuarios);
router.get('/', usuarioCtrl.verUsuarios);
router.delete('/:id',verifyToken, admin, usuarioCtrl.deleteUsuario);
router.get('/mis-sesiones/:userId', usuarioCtrl.getSesionesPorUsuario);
router.get('/:id',  usuarioCtrl.getUsuario);
router.post('/upload', upload.single('file'), usuarioCtrl.uploadUsuarios);


module.exports = router;
