const express = require('express');
const pool = require('../database/database'); // Asegúrate de que este sea el camino correcto al archivo de base de datos

module.exports = (io) => {
    const router = express.Router();

    // Función para manejar la inserción y emisión de un nuevo registro
    const registrarEstatus = async (req, res) => {
        const { num_folio, id_unico, curp, fullname, estatus, comentario } = req.body;

        try {
            // Inserta los datos en la base de datos
            const [result] = await pool.execute(
                'INSERT INTO tramites_verificacion (num_folio, id_unico, curp, fullname, tramite, comentario) VALUES (?, ?, ?, ?, ?, ?)',
                [num_folio, id_unico, curp, fullname, estatus, comentario]
            );

            // Obtener el registro recién insertado
            const [newRow] = await pool.execute(
                'SELECT num_folio, id_unico, curp, fullname, tramite, comentario FROM tramites_verificacion WHERE id = ?',
                [result.insertId]
            );

            // Emitir solo el nuevo registro a los clientes conectados
            io.emit('newRecord', newRow[0]);

            // Redirigir después de la inserción exitosa
            res.redirect('/');
        } catch (error) {
            console.error('Error al registrar el estatus:', error);
            res.status(500).send('Ocurrió un error al registrar el estatus.');
        }
    };

    // Ruta POST para insertar y emitir un nuevo registro
    router.post('/', registrarEstatus);

    // Ruta GET para obtener todos los registros actuales
    router.get('/api/tramites', async (req, res) => {
        try {
            const [rows] = await pool.execute('SELECT num_folio, id_unico, curp, fullname, tramite, comentario FROM tramites_verificacion');
            res.json(rows); // Devuelve los registros en formato JSON
        } catch (error) {
            console.error('Error al obtener los trámites:', error);
            res.status(500).send('Error al obtener los trámites');
        }
    });

    return router;
};
