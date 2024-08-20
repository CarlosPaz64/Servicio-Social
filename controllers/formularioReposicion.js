const pool = require('../database/database'); // Importa el pool de conexiones

const registrarRepos = async (req, res) => {
    const { num_folio, id_unico, curp, fullname, estatus, comentario } = req.body;
    console.log(req.body);

    try {
        // Inserta los datos en la base de datos
        console.log("Datos a insertar: ", req.body);
         await pool.execute('INSERT INTO tramites_verificacion (num_folio, id_unico, curp, fullname, tramite, comentario) VALUES (?, ?, ?, ?, ?, ?)', [num_folio, id_unico, curp, fullname, estatus, comentario]);
        // Si el registro es exitoso, redirige a la vista deseada
        res.redirect('/');
    } catch (error) {
        // Maneja el error si ocurre
        console.error('Error al registrar la reposición:', error);
        res.status(500).send('Ocurrió un error al registrar el estatus.');
    }
};

module.exports = {
    registrarRepos
};

