const express = require('express');
const router = express.Router();
const Evento = require('../models/evento');

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
    try {
        const { nombre, fecha, hora, descripcion, invitados, costo, ubicacion } = req.body;
        
        // Validación de ubicación
        if (!ubicacion || !ubicacion.type || !ubicacion.coordinates || ubicacion.coordinates.length !== 2) {
            return res.status(400).json({ mensaje: 'Ubicación no válida' });
        }

        const nuevoEvento = new Evento({
            nombre,
            fecha,
            hora,
            descripcion,
            invitados,
            costo,
            ubicacion,
            estado: 'activo'
        });

        await nuevoEvento.save();
        res.json({ mensaje: 'Evento creado correctamente' });
    } catch (error) {
        console.error('Error al crear evento:', error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Obtener un evento por su ID
router.get('/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }
        res.json(evento);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Actualizar un evento por su ID
router.put('/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }
        res.json({ mensaje: 'Evento actualizado correctamente', evento });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Eliminar un evento por su ID
router.delete('/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }
        res.json({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Obtener usuarios registrados en un evento
router.get('/:id/registrados', async (req, res) => {
    try {
      const evento = await Evento.findById(req.params.id).populate('usuariosRegistrados', 'nombre'); // 'nombre' es el campo que quieres mostrar del usuario
      if (!evento) {
        return res.status(404).json({ mensaje: 'Evento no encontrado' });
      }
      res.json(evento.usuariosRegistrados);
    } catch (error) {
      console.error('Error al obtener usuarios registrados:', error.message);
      res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Registrar un usuario en un evento
router.post('/:id/registrados', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }

        // Verificar si el usuario ya está registrado
        const userId = req.body.userId;
        if (evento.usuariosRegistrados.includes(userId)) {
            return res.status(400).json({ mensaje: 'El usuario ya está registrado en este evento' });
        }

        // Agregar el ID de usuario al array de usuariosRegistrados
        evento.usuariosRegistrados.push(userId);
        await evento.save();

        res.json({ mensaje: 'Usuario registrado correctamente en el evento' });
    } catch (error) {
        console.error('Error al registrar usuario en evento:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

// Eliminar un usuario de la lista de registrados en un evento
router.delete('/:id/registrados/:userId', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }

        // Filtrar el ID de usuario de la lista de usuariosRegistrados
        evento.usuariosRegistrados = evento.usuariosRegistrados.filter(userId => userId.toString() !== req.params.userId);
        await evento.save();

        res.json({ mensaje: 'Usuario eliminado correctamente del evento' });
    } catch (error) {
        console.error('Error al eliminar usuario de evento:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});

module.exports = router;