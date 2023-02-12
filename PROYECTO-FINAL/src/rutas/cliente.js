const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/cliente/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Cliente', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/cliente/:id_cliente', (req, res) =>{
    const {id_cliente} = req.params;
    mysqlConnection.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id_cliente], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/cliente/', (req, res)=>{
    const {id_cliente, correo, contraseña, nombre, apellidos} = req.body;
    const query =  `
    SET @id_cliente = ?;
	SET @correo = ?;
    SET @contraseña= ?;
    SET @nombre= ?;
    SET @apellidos = ?;

    CALL agregarActualizarCliente(@id_cliente, @correo, @contraseña, @nombre, @apellidos);`;
    mysqlConnection.query(query, [id_cliente, correo, contraseña, nombre, apellidos], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Cliente guardado'});
        }else {
            console.log(err);
        }
    });
});

router.put('/cliente/:cliente', (req, res) => {
    const { correo, contraseña, nombre, apellidos} = req.body;
    const { id_cliente } = req.params;
    const query =  `
    SET @id_cliente = ?;
	SET @correo = ?;
    SET @contraseña= ?;
    SET @nombre = ?;
    SET @apellidos = ?;

    CALL agregarActualizarCliente(@id_cliente, @correo, @contraseña, @nombre, @apellidos);`;
    mysqlConnection.query(query, [id_cliente, correo, contraseña, nombre, apellidos], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Cliente actualizado'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/cliente/:cliente', (req, res) =>{
    const {id_cliente} = req.params;
    mysqlConnection.query('DELETE FROM Cliente WHERE id_cliente = ?', [id_cliente], (err, rows, fields) =>{
        if(!err) {
            res.json('Cliente eliminado');
            
        }else {
            console.log(err);
        }
    });
});
module.exports = router;