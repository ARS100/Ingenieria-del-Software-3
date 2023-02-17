const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/usuario/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Usuario', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/usuario/:usuario', (req, res) =>{
    const {id_usuario} = req.params;
    mysqlConnection.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id_usuario], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/usuario/', (req, res)=>{
    const {id_usuario, correo, contraseña} = req.body;
    const query =  `CALL agregarActualizarUsuario(@id_usuario, @correo, @contraseña);`;
    mysqlConnection.query(query, [id_usuario, correo, contraseña], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Usuario guardado'});
        }else {
            console.log(err);
        }
    });
});

router.put('/usuario/:usuario', (req, res) => {
    const { correo, contraseña} = req.body;
    const { id_usuario } = req.params;
    const query =  `CALL agregarActualizarUsuario(@id_usuario, @correo, @contraseña);`;
    mysqlConnection.query(query, [id_usuario, correo, contraseña], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Usuario actualizado'});
      } else {
        console.log(err);
      }
    });
  });

  router.delete('/usuario/:usuario', (req, res) =>{
    const {id_administrador} = req.params;
    mysqlConnection.query('DELETE FROM Usuario WHERE id_usuario = ?', [id_usuario], (err, rows, fields) =>{
        if(!err) {
            res.json('Usuario eliminado');
            
        }else {
            console.log(err);
        }
    });
});
module.exports = router;