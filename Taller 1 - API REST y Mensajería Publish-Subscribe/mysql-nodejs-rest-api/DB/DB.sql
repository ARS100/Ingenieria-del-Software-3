CREATE DATABASE proyectoSPA;
USE proyectoSPA;

CREATE TABLE CLIENTE (
	id_cliente INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(20),
	correo VARCHAR(30),
	ciudad VARCHAR(15),
	direccion VARCHAR(25),
	PRIMARY KEY (id_cliente)
);

CREATE TABLE CIRCUITO (
	id_circuito INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(15),
	nombre VARCHAR(20),
	componentes VARCHAR(40),
	costo INT,
	PRIMARY KEY (id_circuito)
);

CREATE TABLE ENVIO (
	id_envio INT NOT NULL AUTO_INCREMENT,
	tcircuito INT,
	ncliente INT,
	cantidad INT,
	ciudad VARCHAR(20),
	fecha DATE,
	descripcion VARCHAR(30),
	costo INT,
	PRIMARY KEY(id_envio),
	FOREIGN KEY(tcircuito) REFERENCES CIRCUITO(id_circuito),
	FOREIGN KEY(ncliente) REFERENCES CLIENTE(id_cliente)
);


CREATE TABLE `estudiante`(
	id_estudiante INT NOT NULL auto_increment,
	nombre VARCHAR(20),
	codigo INT,
	facultad VARCHAR(20),
	carrera VARCHAR(20),
	PRIMARY KEY (id_estudiante)
);

CREATE  PROCEDURE agregarActualizarEstudiante(
	IN Nid_estudiante INT,
	IN Nnombre VARCHAR(20),
	IN Ncodigo INT,
	IN Nfacultad VARCHAR(20),
	IN Ncarrera VARCHAR(20)
)
BEGIN 
	IF Nid_estudiante = 0 then
		INSERT INTO `estudiante` (`nombre`, `codigo`, `facultad`, `carrera`)
		VALUES(Nnombre ,  Ncodigo,  Nfacultad, Ncarrera);
		SET `Nid_estudiante` = LAST_INSERT_ID();
	ELSE
		UPDATE `ESTUDIANTE`
		SET `nombre` = Nnombre, `codigo`= Ncodigo, `facultad`=Nfacultad, `carrera`=Ncarrera
		WHERE `id_estudiante` = Nid_estudiante;

	END IF;
	SELECT Nid_estudiante AS 'id_estudiante';
END $$
SELECT * FROM estudiante;
CALL agregarActualizarEstudiante(0, "Alejandra", 2183333, "Humanas", "Economia")