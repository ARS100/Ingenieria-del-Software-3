const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/reserva/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Reserva', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/reserva/:id_reserva', (req, res) =>{
    const {id_reserva} = req.params;
    mysqlConnection.query('SELECT * FROM Reserva WHERE id_reserva = ?', [id_reserva], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/reserva/', (req, res)=>{
    const {id_reserva, fecha} = req.body;
    const query =  ` CALL agregarActualizarReserva(@id_reserva, @fecha);`;
    mysqlConnection.query(query, [id_reserva, fecha], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Reserva guardada'});
        }else {
            console.log(err);
        }
    });
});

router.put('/reserva/:reserva', (req, res) => {
    const { fecha} = req.body;
    const { id_reserva } = req.params;
    const query =  `CALL agregarActualizarReserva(@id_reserva, @fecha);`;
    mysqlConnection.query(query, [id_reserva, fecha], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Reserva actualizada'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/reserva/:reserva', (req, res) =>{
    const {id_administrador} = req.params;
    mysqlConnection.query('DELETE FROM Reserva WHERE id_reserva = ?', [id_reserva], (err, rows, fields) =>{
        if(!err) {
            res.json('Reserva eliminada');
            
        }else {
            console.log(err);
        }
    });
});
module.exports = router;