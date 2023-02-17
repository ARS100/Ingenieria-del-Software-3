const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1501',
    port: '3306',
    database: 'libreria'
})

conexion.connect((error)=>{
    if(error){
        console.error('El error de conexion es: '+ error);
        return
    }
    console.log('Ya está conectado a la BD');
})


module.exports= conexion;