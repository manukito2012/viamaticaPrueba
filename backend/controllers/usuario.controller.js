const Usuario = require('../models/usuarios');
const Sesion = require('../models/sesion');
const usuarioCtrl = {}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const XLSX = require('xlsx');


//METODO CREAR USUARIO
usuarioCtrl.createUsuario = async (req, res) => {
    const { nombre, apellido, identificacion, password, email } = req.body;

    let existingUser = await Usuario.findOne({ identificacion });
    if (existingUser) {
      return res.status(400).json({ msg: 'Ya existe una cuenta registrada con esa identificación.' });
    }
    try {
      // Si no se proporciona email, lo generamos
      let generarEmail = email || generateEmail(nombre, apellido); 
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailRegex.test(generarEmail)) {
        return res.status(400).json({ status: '0', msg: 'El email generado no tiene un formato válido.' });
      }
      req.body.email = generarEmail.toLowerCase();
      // Llamamos a la validación de los demás campos
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Si el email ya existe, le agregamos un número al final
      existingUser = await Usuario.findOne({ email: generarEmail });
      let counter = 1;
  
      while (existingUser) {
        generarEmail = generateEmail(nombre, apellido, counter);
        existingUser = await Usuario.findOne({ email: generarEmail });
        counter++;
      }
      req.body.email = generarEmail;
  
      // aqui cifra la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
  
      // Crear el usuario
      const usuario = new Usuario(req.body);
      await usuario.save();
  
      // Generar el JWT
      const payload = {
        usuario_id: usuario._id,
        nombre: usuario.nombre,
        role: usuario.role
      };
  
      const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });
      // Retornar la respuesta con el token
      return res.json({
        status: '1',
        msg: 'Usuario guardado correctamente.',
        usuario: usuario,
        token: token 
      });
    } catch (error) {
      return res.status(500).json({
        status: '0',
        msg: 'Error procesando la operación.'
      });
    }
};
  // Función para generar email
  const generateEmail = (nombre, apellido, counter = 0) => {
    const primercaracterName = nombre.charAt(0).toLowerCase();
    const formattedApellido = apellido.replace(/\s+/g, '').toLowerCase();
    let email = `${primercaracterName}${formattedApellido}@mail.com`;
    if (counter > 0) {
      email = `${primercaracterName}${formattedApellido}${counter}@mail.com`;
    }
    return email;
  };


//METODO PARA VER SESION DE USUARIO POR SU ID solo el admin
  usuarioCtrl.getSessions = async (req, res) => {
    const { userId } = req.params;
    try {
        const sesiones = await Sesion.find({ userId }).exec();
        if (sesiones.length === 0) {
            return res.status(404).json({
                status: '0',
                message: 'No se encontraron sesiones para este usuario'
            });
        }
        // Devuelve las sesiones encontradas
        return res.json({
            status: '1',
            message: 'Sesiones obtenidas exitosamente',
            sesiones
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error al obtener las sesiones'
        });
    }
};

// Metodo para obtener las sesiones de un usuario por su ID
usuarioCtrl.getSesionesPorUsuario = async (req, res) => {
    const { userId } = req.params;
    try {
      const sesiones = await Sesion.find({ userId });
  
      if (!sesiones || sesiones.length === 0) {
        return res.status(404).json({
          status: '0',
          message: 'No se encontraron sesiones para este usuario',
        });
      }
      return res.status(200).json({
        status: '1',
        message: 'Sesiones encontradas',
        sesiones,
      });
    } catch (error) {
      return res.status(500).json({
        status: '0',
        message: 'Error del servidor al obtener sesiones',
      });
    }
  };
  
//METODO PARA MODIFICAR USUARIO SOLO POR EL ADMIN
usuarioCtrl.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const usuarioExistente = await Usuario.findById(id);

        if (!usuarioExistente) {
            return res.status(404).json({
                status: '0',
                message: `Usuario con ID ${id} no encontrado`
            });
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

        if (!usuarioActualizado) {
            return res.status(500).json({
                status: '0',
                message: `No se pudo actualizar el usuario`
            });
        }
        return res.json({
            status: '1',
            message: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error al actualizar el usuario'
        });
    }
};


// Método para filtrar usuarios
usuarioCtrl.filtrarUsuarios = async (req, res) => {
    const { nombre, apellido, identificacion } = req.query; 
    // se crea un objeto para almacenar las condiciones de búsqueda
    const filterConditions = {};
    if (nombre) {
      filterConditions['nombre'] = { $regex: nombre.trim(), $options: 'i' };
    }
    if (apellido) {
      filterConditions['apellido'] = { $regex: apellido.trim(), $options: 'i' }; 
    }
  
    if (identificacion) {
      filterConditions['identificacion'] = identificacion;
    }
    try {
      const usuarios = await Usuario.find(filterConditions);  
      console.log('Usuarios encontrados:', usuarios);
      
      if (usuarios.length === 0) {
        return res.status(404).json({ message: 'No se encontraron usuarios con los criterios de búsqueda' });
      }
  
      return res.json(usuarios);  
    } catch (error) {
      return res.status(500).json({ message: 'Error al realizar la búsqueda' });
    }
  };

// Método para obtener todos los usuarios
usuarioCtrl.verUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json({ status: '1', data: usuarios });
    } catch (error) {
      res.status(500).json({ status: '0', message: 'Error al obtener los usuarios' });
    }
  };

  //METODO VER USUARIO POR ID
  usuarioCtrl.getUsuario = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          status: '0',
          message: 'ID no válido',
        });
      }
      const user = await Usuario.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          status: '0',
          message: `Usuario con ID ${req.params.id} no encontrado`,
        });
      }
      res.status(200).json({
        status: '1',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: '0',
        message: 'Error al obtener el usuario',
      });
    }
  };
  
  //metodo para eliminar usuario por id
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!deletedUsuario) {
            return res.status(404).json({
                'status': '0',
                'message': 'Usuario no encontrado'
            });
        }
        res.json({
            'status': '1',
            'message': 'Usuario eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'message': 'Error al eliminar el usuario'
        });
    }
};


//METODO PARA CARGA MASIVA ARCHIVO EXCEL
usuarioCtrl.uploadUsuarios = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se ha recibido un archivo.' });
    }
    // Leer el archivo Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return res.status(400).json({ message: 'El archivo no contiene hojas de datos.' });
    }

    const usersData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const requiredColumns = ['nombre', 'apellido', 'identificacion', 'role'];
    const firstRow = usersData[0];
    const missingColumns = requiredColumns.filter(col => !(col in firstRow));
    if (missingColumns.length > 0) {
      return res.status(400).json({ message: `Faltan columnas: ${missingColumns.join(', ')}` });
    }

    for (let i = 0; i < usersData.length; i++) {
      const data = usersData[i];

      if (!data.nombre || !data.apellido || !data.identificacion) {
        return res.status(400).json({ message: `Faltan datos necesarios en la fila ${i + 1}` });
      }

      let password = `${data.nombre.toLowerCase()}${i + 1}`;
      let hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        nombre: data.nombre,
        apellido: data.apellido,
        identificacion: data.identificacion.toString(),
        password: hashedPassword,
        email: data.email || '',
        role: data.role || 'usuario'
      };

      const existingUser = await Usuario.findOne({ identificacion: userData.identificacion });
      if (existingUser) {
        return res.status(400).json({ message: `El usuario con identificación ${userData.identificacion} ya existe.` });
      }
      // Generar correo si no tiene.usando la misma funciona para generar email 
      if (!userData.email) {
        userData.email = generateEmail(userData.nombre, userData.apellido);
      }
      let counter = 1;
      let generatedEmail = userData.email;
      let existingEmail = await Usuario.findOne({ email: generatedEmail });

      while (existingEmail) {
        generatedEmail = generateEmail(userData.nombre, userData.apellido, counter);
        existingEmail = await Usuario.findOne({ email: generatedEmail });
        counter++;
      }
      userData.email = generatedEmail;
      await Usuario.create(userData);
    }

    res.status(200).json({ message: 'Usuarios cargados exitosamente' });
  } catch (error) {
    res.status(500).json({ message: `Error al procesar el archivo de usuarios: ${error.message}` });
  }
};


module.exports = usuarioCtrl;