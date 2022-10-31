const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

console.log( process.env );

// crear el servidor de express
const app = express();

// Base de datos:
dbConnection();

//Directorio público
app.use( express.static('public') );

// lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth')); // ToDo auth // crear, login, renew


// todo crud: eventos

// escuchar peticiones
app.listen(  process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})