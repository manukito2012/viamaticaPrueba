const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1/viamatica2025';
mongoose.connect(URI)
    .then(db => console.log('La Base de datos esta conectada'))
    .catch(err => console.error(err))
module.exports = mongoose; 