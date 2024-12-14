const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    invitados: {
        type: [String]
    },
    costo: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: {
            type: String,
            enum: ['Point'], // Tipo de dato de la ubicación (Point para coordenadas)
            required: true
        },
        coordinates: {
            type: [Number], // Arreglo de números para las coordenadas [longitud, latitud]
            required: true
        }
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'cancelado', 'concluido'],
        default: 'activo'
    },
    usuariosRegistrados: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }]
});

EventoSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Evento', EventoSchema);