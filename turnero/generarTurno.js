const pool = require('../database/database'); // Asegúrate de tener configurado el pool para la base de datos

const generarTurno = async () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let turno = '';
    let turnoExiste = true;

    // Repite hasta que se genere un turno único
    while (turnoExiste) {
        turno = '';
        for (let i = 0; i < 8; i++) {
            turno += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Verifica si el turno ya existe en la base de datos
        const [result] = await pool.execute('SELECT COUNT(*) AS count FROM tramites_verificacion WHERE turno = ?', [turno]);
        turnoExiste = result[0].count > 0;
    }

    return turno;
};

module.exports = generarTurno;
