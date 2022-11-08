const express = require('express');
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000 );
// Middlewares (Funciones ejecutadas antes de las rutas)
app.use(express.json());

//Arregla un error a futuro:
const cors = require('cors')
app.use(cors())

// Rutas

app.use(require('./rutas/estudiantes'));
// Iniciar el servidor
app.listen(app.get('port'), () =>{
    console.log('Server en el puerto', app.get('port'));
});