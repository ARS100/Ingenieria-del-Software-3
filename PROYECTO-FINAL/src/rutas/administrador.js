const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/administrador/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Administrador', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/administrador/:id_administrador', (req, res) =>{
    const {id_administrador} = req.params;
    mysqlConnection.query('SELECT * FROM Administrador WHERE id_administrador = ?', [id_administrador], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/administrador/', (req, res)=>{
    const {id_administrador, correo, contraseña} = req.body;
    const query =  `CALL agregarActualizarAdministrador(@id_administrador, @correo, @contraseña);`;
    mysqlConnection.query(query, [id_administrador, correo, contraseña], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Administrador guardado'});
        }else {
            console.log(err);
        }
    });
});

router.put('/administrador/:administrador', (req, res) => {
    const { correo, contraseña} = req.body;
    const { id_administrador } = req.params;
    const query =  `CALL agregarActualizarAdministrador(@id_administrador, @correo, @contraseña);`;
    mysqlConnection.query(query, [id_administrador, correo, contraseña], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Administrador actualizado'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/administrador/:administrador', (req, res) =>{
    const {id_administrador} = req.params;
    mysqlConnection.query('DELETE FROM Administrador WHERE id_administrador = ?', [id_administrador], (err, rows, fields) =>{
        if(!err) {
            res.json('Administrador eliminado');
            
        }else {
            console.log(err);
        }
    });
});
module.exports = router;