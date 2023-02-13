// Importing the express module
const express = require('express');
const app = express();

// Initializing the data with the following string
var data = "¡Bienvenido!"


// Configuración
app.set('port', process.env.PORT || 3000 );
// Middlewares (Funciones ejecutadas antes de las rutas)
app.use(express.json());

// Sending the response for '/' path
const cors = require('cors')
app.use(cors())

// Rutas

app.use(require('./rutas/administrador'));
app.use(require('./rutas/cliente'));
app.use(require('./rutas/usuario'));
app.use(require('./rutas/reserva'));
app.use(require('./rutas/habitacion'));
app.use(require('./rutas/index'));

// Iniciar el servidor
app.listen(app.get('port'), () =>{
    console.log('Server en el puerto', app.get('port'));
});

