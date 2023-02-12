const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/habitacion/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Habitacion', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/habitacion/:id_habitacion', (req, res) =>{
    const {id_habitacion} = req.params;
    mysqlConnection.query('SELECT * FROM Habitacion WHERE id_habitacion = ?', [id_habitacion], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/habitacion/', (req, res)=>{
    const {id_habitacion, ubicacion, descripcion} = req.body;
    const query =  `
    SET @id_habitacion = ?;
	SET @ubicacion = ?;
    SET @descripcion= ?;

    CALL agregarActualizarHabitacion(@id_habitacion, @ubicacion, @descripcion);`;
    mysqlConnection.query(query, [id_habitacion, ubicacion, descripcion], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Habitacion guardada'});
        }else {
            console.log(err);
        }
    });
});

router.put('/habitacion/:habitacion', (req, res) => {
    const { ubicacion, descripcion} = req.body;
    const { id_habitacion } = req.params;
    const query =  `
    SET @id_habitacion = ?;
	SET @ubicacion = ?;
    SET @descripcion= ?;

    CALL agregarActualizarHabitacion(@id_habitacion, @ubicacion, @descripcion);`;
    mysqlConnection.query(query, [id_habitacion, ubicacion, descripcion], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Habitacion actualizada'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/habitacion/:habitacion', (req, res) =>{
    const {id_administrador} = req.params;
    mysqlConnection.query('DELETE FROM Habitacion WHERE id_habitacion = ?', [id_habitacion], (err, rows, fields) =>{
        if(!err) {
            res.json('Habitacion eliminada');
            
        }else {
            console.log(err);
        }
    });
});
module.exports = router;