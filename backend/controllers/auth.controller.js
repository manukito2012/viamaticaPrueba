const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ status: '0', message: 'Token requerido' });
    }
    try {
        // Verifica el token y decodifica el payload
        const decoded = jwt.verify(token, 'secreto');
        req.usuario = decoded;  

        next(); 
    } catch (error) {
        console.error(error);
        return res.status(401).json({ status: '0', message: 'Token inválido o expirado' });
    }
};

module.exports = { verifyToken };

