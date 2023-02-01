const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/envio/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM ENVIO', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/envio/:id_envio', (req, res) =>{
    const {id_envio} = req.params;
    mysqlConnection.query('SELECT * FROM envio WHERE id_envio = ?', [id_envio], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/envio/', (req, res)=>{
    const {id_envio, tcircuito, ncliente, cantidad, ciudad,fecha,descripcion,costo} = req.body;
    const query =  `
    SET @id_envio = ?;
	SET @tcircuito = ?;
	SET @ncliente = ?;
	SET @cantidad = ?;
	SET @ciudad = ?;
  SET @fecha = ?;
  SET @descripcion = ?;
  SET @costo = ?;
    CALL agregarActualizarEnvio( @id_envio, @tcircuito,@ncliente,@cantidad, @ciudad, @fecha, @descripcion, @costo);`;
    mysqlConnection.query(query, [id_envio, tcircuito, ncliente, cantidad, ciudad,fecha,descripcion,costo], (err, rows, fields) => {
        if(!err){
            res.json({status: 'envios guardados'});
        }else {
            console.log(err);
        }
    });
});

router.put('/envio/:id_envio', (req, res) => {
    const { tcircuito, ncliente, cantidad, ciudad,fecha,descripcion,costo } = req.body;
    const { id_envio } = req.params;
    const query = `
  SET @id_envio = ?;
  SET @tcircuito = ?;
  SET @ncliente = ?;
  SET @cantidad = ?;
  SET @ciudad = ?;
  SET @fecha = ?;
  SET @descripcion = ?;
  SET @costo = ?;
    CALL agregarActualizarEnvio(@id_envio,@tcircuito, @ncliente, @cantidad, @ciudad, @fecha, @descripcion, @costo);`;
    mysqlConnection.query(query, [id_envio, tcircuito, ncliente, cantidad, ciudad,fecha,descripcion,costo], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'envios actualizados'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/envio/:id_envio', (req, res) =>{
    const {id_envio} = req.params;
    mysqlConnection.query('DELETE FROM CIRCUITO WHERE id_envio = ?', [id_envio], (err, rows, fields) =>{
        if(!err) {
            res.json('Circuito eliminado');

        }else {
            console.log(err);
        }
    });
});
module.exports = router;
