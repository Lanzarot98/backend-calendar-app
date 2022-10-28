const express = require('express');
require('dotenv').config();

console.log( process.env );

// crear el servidor de express
const app = express();

//Directorio público
app.use( express.static('public') );

// Rutas
// app.get('/', (req, res) => {
    
//     res.json({
//         ok: true
//     })

// }); 

// escuchar peticiones
app.listen(  process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})