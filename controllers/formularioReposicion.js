const pool = require('../database/database'); // Asegúrate de que `pool` esté configurado correctamente

const registrarRepos = async (req, res) => {
    const { num_folio, id_unico, curp, fullname, tramite, comentario } = req.body;

    try {
        // Verifica si algún valor es undefined y establece un valor predeterminado o null
        const values = [
            num_folio || null,
            id_unico || null,
            curp || null,
            fullname || null,
            tramite || null,
            comentario || null
        ];

        // Inserta los datos en la base de datos
        const [result] = await pool.execute(
            'INSERT INTO tramites_verificacion (num_folio, id_unico, curp, fullname, tramite, comentario) VALUES (?, ?, ?, ?, ?, ?)',
            values
        );

        // Redirigir después de la inserción exitosa o manejar el éxito de alguna manera
        res.redirect('/');
    } catch (error) {
        console.error('Error al registrar la reposición:', error);
        res.status(500).send('Ocurrió un error al registrar la reposición.');
    }
};

module.exports = {
    registrarRepos
};
