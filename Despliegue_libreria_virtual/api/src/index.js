const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

app.set('view engine', 'ejs');

app.use('/', require('./router'));

app.use('/public', express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// Configuración
app.set('port', process.env.PORT || 8080 );
// Middlewares (Funciones ejecutadas antes de las rutas)
app.use(express.json());

//Arregla un error a futuro:
const cors = require('cors')
app.use(cors())

// Rutas
//app.use(require('./rutas/chips'));
//app.use(require('./rutas/clientes'));
//app.use(require('./rutas/envio'));
//app.use(require('./rutas/estudiantes'));
// Iniciar el servidor
app.listen(app.get('port'), () =>{
    console.log('Server en el puerto', app.get('port'));
});