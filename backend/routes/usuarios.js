const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si ya existe un usuario con el mismo email
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        usuario = new Usuario({
            nombre,
            email,
            password
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        // Guardar usuario en la base de datos
        await usuario.save();

        res.json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Iniciar sesión de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const esMatch = await bcrypt.compare(password, usuario.password);

        if (!esMatch) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Generar el token de acceso
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token, userId: usuario.id }); // Devolver también el userId
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

module.exports = router;