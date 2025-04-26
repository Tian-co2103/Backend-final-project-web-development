const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const nombre = req.body.nombre || req.body.username;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    
    let roles = req.body.roles || [req.body.role] || [];
    if (!Array.isArray(roles)) {
      roles = [roles]; // fuerza a array
    }
    roles = roles.map(r => r.toLowerCase());

    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword,
      roles: roles.length > 0 ? roles : ['user']
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (err) {
    console.error('[ERROR EN REGISTRO]', err); 
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        roles: usuario.roles // 👈 aquí se agregan
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } });
  } catch (err) {
    console.error('[ERROR EN LOGIN]', err); 
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ roles: 'user' }).select('-password');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
