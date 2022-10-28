const express = require('express');
require('dotenv').config();

console.log( process.env );

// crear el servidor de express
const app = express();

//Directorio público
app.use( express.static('public') );

// lectura y parseo del body
app.use( express.json() );

// Rutas
// ToDo auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));


// todo crud: eventos

// escuchar peticiones
app.listen(  process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})