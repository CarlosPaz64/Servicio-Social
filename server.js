const express = require("express");
const database = require("./database/database");
const path = require("path");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formularioEstatusRoute = require('./routes/formularioEstatus');



const app = express();

// Configuración del middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de cookie-parser
app.use(cookieParser());

// Configuración de DotEnv
dotenv.config();

// Configuración del puerto
const PORT = 3000;

// Sirviendo archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use('/formularioEstatus', formularioEstatusRoute);


// Redirigir a index.html cuando se acceda a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'principal', 'index.html'));
});

// Redirigir a index.html cuando se acceda a la carpeta del estatus
app.get('/formularioEstatus/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formularioEstatus', 'index.html'));
  });
  

// Iniciando el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
