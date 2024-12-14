const crypto = require('crypto');

// Generar un secreto JWT seguro de longitud 32 bytes (256 bits)
const generarJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

console.log(generarJWTSecret());