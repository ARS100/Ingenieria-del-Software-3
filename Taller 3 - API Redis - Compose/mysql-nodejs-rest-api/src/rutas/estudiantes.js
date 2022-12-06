const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/estudiantes/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM ESTUDIANTE', (err, rows, fields) =>{
         if(!err) {
             res.json(rows);
         }else {
             console.log(err);
         }
    });
});

router.get('/estudiantes/:id_estudiante', (req, res) =>{
    const {id_estudiante} = req.params;
    mysqlConnection.query('SELECT * FROM ESTUDIANTE WHERE id_estudiante = ?', [id_estudiante], (err, rows, fields) =>{
        if(!err) {
            res.json(rows[0]);
        }else {
            console.log(err);
        }
    });
});

router.post('/estudiantes/', (req, res)=>{
    const {id_estudiante, nombre, codigo, facultad, carrera} = req.body;
    const query =  `CALL agregarActualizarEstudiante(?, ?, ?, ?, ?);`;
   
    mysqlConnection.query(query, [id_estudiante, nombre, codigo, facultad, carrera], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Estudiantes guardados'});
        }else {
            console.log(err);
        }
    });
});


module.exports = router;
