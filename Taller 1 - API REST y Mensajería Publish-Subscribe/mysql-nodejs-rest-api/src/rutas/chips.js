const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/circuitos/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM CIRCUITO', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/circuitos/:id_circuito', (req, res) =>{
    const {id_circuito} = req.params;
    mysqlConnection.query('SELECT * FROM CIRCUITO WHERE id_circuito = ?', [id_circuito], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/circuitos/', (req, res)=>{
    const {id_circuito, tipo, link, nombre, componentes, costo} = req.body;
    const query =  `
    SET @id_circuito = ?;
	SET @tipo = ?;
    SET @link= ?;
	SET @nombre = ?;
	SET @componentes = ?;
	SET @costo = ?;
    CALL agregarActualizarCircuito(@id_circuito, @tipo, @link, @nombre, @componentes, @costo);`;
    mysqlConnection.query(query, [id_circuito, tipo, link, nombre, componentes, costo], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Circuitos guardados'});
        }else {
            console.log(err);
        }
    });
});

router.put('/circuitos/:id_circuito', (req, res) => {
    const { tipo, link, nombre, componentes, costo } = req.body;
    const { id_circuito } = req.params;
    const query =  `
    SET @id_circuito = ?;
	SET @tipo = ?;
    SET @link= ?;
	SET @nombre = ?;
	SET @componentes = ?;
	SET @costo = ?;
    CALL agregarActualizarCircuito(@id_circuito, @tipo, @link, @nombre, @componentes, @costo);`;
    mysqlConnection.query(query, [id_circuito, tipo, link, nombre, componentes, costo], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Circuitos actualizados'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/circuitos/:id_circuito', (req, res) =>{
    const {id_circuito} = req.params;
    mysqlConnection.query('DELETE FROM CIRCUITO WHERE id_circuito = ?', [id_circuito], (err, rows, fields) =>{
        if(!err) {
            res.json('Circuito eliminado');
            
        }else {
            console.log(err);
        }
    });
});
module.exports = router;