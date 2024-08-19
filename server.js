const express = require("express");
const database = require("./database/database");
const path = require("path");

const app = express();

// Configuración del puerto
const PORT = 3000;

// Sirviendo archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir a index.html cuando se acceda a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'principal', 'index.html'));
});

// Redirigir a index.html cuando se acceda a la carpeta del estatus
app.get('/formularioEstatus/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formularioEstatus', 'index.html'));
  });

  app.get('/formulario-baja/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario-baja', 'index.html'));
  });
  
  app.get('/formulario-reposicion/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario-reposicion', 'index.html'));
  });

  app.get('/formulario-actualizaciondedatos/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario-actualizaciondedatos', 'index.html'));
  });

// Iniciando el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
