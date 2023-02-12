const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'proyectois3',
    port: '3306',
});

mysqlConnection.connect(function (err){
    if(err) {
        console.log(err);
        return
    }else{
        console.log('¡CONEXIÓN CON BASE DE DATOS EN CURSO!');
    }
});

module.exports = mysqlConnection;