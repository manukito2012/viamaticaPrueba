
const loginCtrl = {}
const Usuario = require('../models/usuarios');
const Sesion = require('../models/sesion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

loginCtrl.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                status: '0',
                message: 'Usuario no encontrado'
            });
        }
        const esContraseñaValida = await bcrypt.compare(password, usuario.password);
        if (!esContraseñaValida) {
            return res.status(401).json({
                status: '0',
                message: 'Contraseña inválida'
            });
        }
        const payload = {
            usuario_id: usuario._id,
            username: usuario.nombre + " " + usuario.apellido,
            usuario_role: usuario.role, 
            usuario_email: usuario.email
        };
        const token = jwt.sign(payload, "secreto", { expiresIn: '1h' });
        // Registrar las sesiones
        const newSession = new Sesion({
            userId: usuario._id,
            event: 'LOGIN',
            times: new Date(),
        });
        await newSession.save();
        // Respuesta con el token y los datos del usuario
        res.json({
            status: '1',
            message: 'Inicio de sesión exitoso',
            token,
            usuario: {
                usuario_id: usuario._id,
                username: usuario.nombre + " " + usuario.apellido,
                usuario_email: usuario.email,
                usuario_role: usuario.role,
                status: usuario.status
            }
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error al iniciar sesión'
        });
    }
};

loginCtrl.logoutUsuario = async (req, res) => {
    const { userId } = req.body; 
    try {
        const newSession = new Sesion({
            userId,
            event: 'LOGOUT',
            times: new Date(),
        });
        await newSession.save();

        return res.json({
            status: '1',
            message: 'Cierre de sesión exitoso'
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error al cerrar sesión'
        });
    }
};

module.exports = loginCtrl;