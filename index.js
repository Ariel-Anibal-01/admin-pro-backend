require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
// usario y contraseña de mongodb compas 
// para la bases de datos hospital db

//DB_CNN=mongodb+srv://anibal02:aaNv1thLWvQ0hrui@cluster0.vyw7rtv.mongodb.net/hospitaldb

// usuario: anibal02
// password: aaNv1thLWvQ0hrui
const app = express();

// configurar cors
app.use( cors());

// llamar a la base de datos
dbConnection();

// Rutas
app.get( '/', (req, res) =>{
  
    req.json({
        ok: true,
        msg: 'Hola mundo'
    })
} );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})