const express = require('express');
const redis = require('redis')

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})

app.get('/a', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is: ' + visits + 1)
        client.set('visits', parseInt(visits) + 1)
    })
})

const app = express();

// Configuración
app.set('port', process.env.PORT || 3000 );
// Middlewares (Funciones ejecutadas antes de las rutas)
app.use(express.json());

//Arregla un error a futuro:
const cors = require('cors')
app.use(cors())

// Rutas
app.use(require('./rutas/chips'));
app.use(require('./rutas/clientes'));
app.use(require('./rutas/envio'));
app.use(require('./rutas/estudiantes'));
// Iniciar el servidor
app.listen(app.get('port'), () =>{
    console.log('Server en el puerto', app.get('port'));
});