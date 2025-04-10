
function admin(req, res, next) {
    if (req.usuario && req.usuario.usuario_role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
}
module.exports = admin; 
