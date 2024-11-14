// routes/habilitarTurno.js
const express = require('express');
const router = express.Router();

module.exports = (io) => {
    const pool = require('../database/database'); // Asegúrate de que pool esté configurado correctamente

    // Ruta para habilitar turno
    router.post('/habilitar-turno/:id', async (req, res) => {
        const { id } = req.params;

        try {
            // Habilitar el turno en la base de datos (actualiza turno_habilitado a 1)
            const [result] = await pool.execute('UPDATE tramites_verificacion SET turno_habilitado = 1 WHERE id = ?', [id]);

            if (result.affectedRows === 1) {
                // Obtener el turno habilitado
                const [turnoResult] = await pool.execute('SELECT turno FROM tramites_verificacion WHERE id = ?', [id]);

                if (turnoResult.length > 0) {
                    const turno = turnoResult[0].turno;

                    // Emitir el turno habilitado a todos los clientes conectados
                    io.emit('turnoHabilitado', turno);

                    res.json({ success: true, turno });
                } else {
                    res.status(404).json({ success: false, message: 'Turno no encontrado' });
                }
            } else {
                res.status(404).json({ success: false, message: 'Registro no encontrado o ya habilitado' });
            }
        } catch (error) {
            console.error('Error al habilitar el turno:', error);
            res.status(500).json({ success: false, message: 'Error al habilitar el turno' });
        }
    });

    return router;
};