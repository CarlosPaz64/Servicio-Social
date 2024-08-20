const express = require("express");
const pool = require("./database/database");
const path = require("path");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formularioEstatusRoute = require('./routes/formularioEstatus');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

// Pasar `io` al enrutador de `formularioEstatus`
const formularioEstatusRouteWithIo = formularioEstatusRoute(io);
app.use('/formularioEstatus', formularioEstatusRouteWithIo);

// Redirigir a index.html cuando se acceda a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'principal', 'index.html'));
});

// Redirigir a index.html cuando se acceda a la carpeta del estatus
app.get('/formularioEstatus/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formularioEstatus', 'index.html'));
});

// Redirigir a index.html cuando se acceda a la carpeta del estatus
app.get('/socket', (req, res) => {
  res.sendFile(path.join(__dirname, 'socket', 'index.html'));
});

// Emitir datos a los clientes cuando se conectan
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Función para emitir los datos de la base de datos
  const emitData = async () => {
      try {
          const [rows] = await pool.execute('SELECT num_folio, id_unico, curp, fullname, tramite, comentario FROM tramites_verificacion');
          socket.emit('updateTable', rows);
      } catch (error) {
          console.error('Error al obtener los datos:', error);
      }
  };

  emitData(); // Emitir los datos cuando un cliente se conecta

  // Escuchar un evento para actualizar los datos, si es necesario
  socket.on('refreshData', () => {
      emitData();
  });

  socket.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
});

// Iniciando el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
