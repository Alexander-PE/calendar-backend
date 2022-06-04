const express = require('express');
const cors = require("cors");
require("dotenv").config(); // variables de entorno en .env
const {dbConnection} = require("./database/config");


//Crear servidor express
const app = express();

// Base de datos MONGO
dbConnection();

//CORS
app.use(cors());


// directorio publico
app.use(express.static('public'));          // va a mostrar todo lo que esta en el directorio publico en "/"


// lectura y parseo del body
app.use(express.json());                // va a leer y parsear el body


// Rutas
app.use("/api/auth", require('./routes/auth')); // rutas de autenticacion | auth: create, login , renew
app.use("/api/events", require('./routes/events')); // rutas de eventos | events: get, create, update, delete


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto 4000');
})