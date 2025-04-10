const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  identificacion: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, default: null }, 
  password: { type: String, required: true },
  status: { type: String, required: true, default: 'activo' },  
  role: { 
    type: String, 
    enum: ['usuario', 'admin'],  
    default: 'usuario'
  } 
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);

