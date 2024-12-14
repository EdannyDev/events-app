const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/eventos', require('../backend/routes/eventos'));
app.use('/api/usuarios', require('../backend/routes/usuarios'));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));