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

// Lectura y parseo del body

app.use( express.json());

// Carpeta publica 
app.use( express.static('public'));

// llamar a la base de datos
dbConnection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.use( '/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})