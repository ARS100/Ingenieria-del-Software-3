const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/clientes/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM CLIENTE', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/clientes/:id_cliente', (req, res) =>{
    const {id_cliente} = req.params;
    mysqlConnection.query('SELECT * FROM CLIENTE WHERE id_cliente = ?', [id_cliente], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

//post
router.post('/clientes', (req, res)=>{
    const {id_cliente, nombre, correo, ciudad, direccion} = req.body;
    const query =  `
    SET @id_cliente = ?;
	SET @nombre = ?;
	SET @correo = ?;
	SET @ciudad = ?;
	SET @direccion = ?;
    CALL agregarActualizarCliente(@id_cliente, @nombre, @correo, @ciudad, @direccion);`;
    mysqlConnection.query(query, [id_cliente, nombre, correo, ciudad, direccion], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Cliente guardado'});
        }else {
            console.log(err);
        }
    });
});


//put
router.put('/clientes/:id_cliente', (req, res) => {
    const { nombre, correo, ciudad, direccion} = req.body;
    const { id_cliente } = req.params;
    const query = `
    SET @id_cliente = ?;
	SET @nombre = ?;
	SET @correo = ?;
	SET @ciudad = ?;
	SET @direccion = ?;
    CALL agregarActualizarCliente(@id_cliente, @nombre, @correo, @ciudad, @direccion);`;
    mysqlConnection.query(query, [id_cliente, nombre, correo, ciudad, direccion], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Cliente actualizado'});
      } else {
        console.log(err);
      }
    });
  });


//delete

router.delete('/clientes/:id_cliente', (req, res) =>{
    const {id_cliente} = req.params;
    mysqlConnection.query('DELETE FROM CLIENTE WHERE id_cliente = ?', [id_cliente], (err, rows, fields) =>{
        if(!err) {
            res.json('Cliente eliminado');

        }else {
            console.log(err);
        }
    });
});
module.exports = router;
