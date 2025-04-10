const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true 
    },
    event: {
        type: String,
        enum: ['LOGIN', 'LOGOUT'],
        required: true
    },
    times: { 
        type: Date, 
        default: Date.now 
    }
});

const Session = mongoose.model('Sesion', sessionSchema);
module.exports = Session;

