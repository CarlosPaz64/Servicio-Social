const express = require('express');
const router = express.Router();

module.exports = (io) => {
    const pool = require('../database/database'); // Asegúrate de que `pool` esté configurado correctamente

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

    router.post('/', registrarEstatus);

    return router;
};
