const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde un archivo .env si es necesario

// Configurar el pool de conexiones
const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, // Límite máximo de conexiones en el pool
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Esperar por una conexión disponible en el pool si el límite se alcanza
    queueLimit: 0 // No hay límite para el número de conexiones en espera (0 significa ilimitado)
});

console.log('Conexión a la base de datos establecida correctamente');

// Exportar el pool de conexiones para que pueda ser utilizado en otros módulos
module.exports = pool.promise();
