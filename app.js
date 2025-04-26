require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyToken = require('./auth/verifyToken');
const verifyRole = require('./auth/verifyRole');
const authRoutes = require('./routes/auth.routes')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Error al conectar MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta protegida por login y rol
app.get('/api/admin', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ mensaje: `Hola Admin ${req.user.nombre} 👑` });
});

// Ruta protegida solo por login
app.get('/api/user', verifyToken, (req, res) => {
  res.json({ mensaje: `Hola ${req.user.nombre}, bienvenido a tu dashboard 🚀` });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
