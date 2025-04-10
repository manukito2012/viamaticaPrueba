const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

//modulo de direccionamiento de rutas
app.use('/usuario', require('./routes/usuario.route'));
app.use('/user', require('./routes/login.route'));

// Middleware para capturar errores no manejados
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: 'Algo salió mal, por favor intente más tarde.' });
  });

  
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});
