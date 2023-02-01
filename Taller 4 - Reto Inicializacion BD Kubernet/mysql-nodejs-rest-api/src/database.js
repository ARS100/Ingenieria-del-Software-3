const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'proyecto_software',
    port: '3306',
});

mysqlConnection.connect(function (err){
    if(err) {
        console.log(err);
        return
    }else{
        console.log('La base de datos está conectada');
    }
});

module.exports = mysqlConnection;