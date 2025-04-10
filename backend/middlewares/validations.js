const { body, validationResult } = require('express-validator');

//validaciones para el ingreo de datos 
const validateCreateUsuario = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de caracteres.')
    .matches(/^(?!.*[\W_])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,20}$/)
    .withMessage('El nombre debe tener al menos un número, una mayúscula, no contener signos y tener entre 8 y 20 caracteres.'),

  body('apellido')
    .isString()
    .withMessage('El apellido debe ser una cadena de caracteres.'),

  body('identificacion')
    .isString()
    .matches(/^(?!.*(\d)\1{3})(\d{10})$/)
    .withMessage('La identificación no puede contener el mismo número repetido 4 veces seguidas.'),

  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`_]).{8,}$/)
    .withMessage('La contraseña debe tener al menos una mayúscula, un signo y no debe contener espacios.'),

    body('email')
    .optional() 
    .isEmail()
    .withMessage('Debe ser un email válido.')
    .normalizeEmail(),

  body('role')
    .isString()
    .optional()
    .withMessage('El rol debe ser una cadena de caracteres.')
];

// Middleware para manejar errores de validación
const handleErrors = (req, res, next) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
  
    return res.status(400).json({ errors: errors.array() });
  }
  next(); 
};

module.exports = { validateCreateUsuario, handleErrors };
