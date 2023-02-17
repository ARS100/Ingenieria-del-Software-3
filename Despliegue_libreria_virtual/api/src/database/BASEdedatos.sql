CREATE DATABASE libreria;
USE libreria

CREATE TABLE usuario(
	id_usuario INT NOT NULL AUTO_INCREMENT,
	correo VARCHAR(30),
	contraseña VARCHAR(30),
	codigo INT,
	PRIMARY KEY (id_usuario));
	
CREATE TABLE editorial(
	id_editorial INT NOT NULL AUTO_INCREMENT,
	direccion VARCHAR(30),
	codigoPostal INT,
	correo VARCHAR(30),
	PRIMARY KEY (id_editorial)
	);
	
CREATE TABLE libro(
	id_libro INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(30),
	sinopsis VARCHAR(30),
	fk_id_editorial INT,
	PRIMARY KEY (id_libro),
	FOREIGN KEY (fk_id_editorial) REFERENCES editorial(id_editorial));
	
CREATE TABLE reserva(
	id_reserva INT NOT NULL AUTO_INCREMENT,
	fechadeReserva DATE,
	fk_id_libro INT,
	fk_id_usuario INT,
	PRIMARY KEY (id_reserva),
	FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario),
	FOREIGN KEY (fk_id_libro) REFERENCES libro(id_libro));


DROP PROCEDURE IF EXISTS agregarActualizarUsuario;
DELIMITER $$
CREATE  PROCEDURE agregarActualizarUsuario(
	IN Nid_editorial INT,
	IN Ndireccion VARCHAR(30),
	IN Ncontraseña VARCHAR(30),
	IN Ncodigo INT
)
BEGIN 
	IF Nid_usuario = 0 then
		INSERT INTO Usuario(correo, contraseña, codigo)
		VALUES(Ncorreo, Ncontraseña, Ncodigo);
		SET `Nid_usuario` = LAST_INSERT_ID();
	ELSE
		UPDATE Usuario
		SET correo = Ncorreo, contraseña = Ncontraseña, codigo = Ncodigo
		WHERE id_usuario = Nid_usuario;

	END IF;
	SELECT Nid_usuario AS 'id_usuario';
END 
################

DROP PROCEDURE IF EXISTS agregarActualizarEditorial;
DELIMITER $$
CREATE  PROCEDURE agregarActualizarEditorial(
	IN Nid_editorial INT,
	IN Ndireccion VARCHAR(30),
	IN NcodigoPostal INT,
	IN Ncorreo VARCHAR(30)
)
BEGIN 
	IF Nid_editorial = 0 then
		INSERT INTO Editorial(direccion, codigoPostal, correo)
		VALUES(Ndireccion, NcodigoPostal, Ncorreo);
		SET `Nid_editorial` = LAST_INSERT_ID();
	ELSE
		UPDATE Editorial
		SET direccion = Ndireccion, codigoPostal = NcodigoPostal, correo = Ncorreo
		WHERE id_editorial = Nid_editorial;

	END IF;
	SELECT Nid_editorial AS 'id_editorial';
END 

#################

DROP PROCEDURE IF EXISTS agregarActualizarLibro;
DELIMITER $$
CREATE  PROCEDURE agregarActualizarLibro(
	IN Nid_libro INT,
	IN Nnombre VARCHAR(30),
	IN Nsinopsis VARCHAR(30)
)
BEGIN 
	IF Nid_libro = 0 then
		INSERT INTO Libro(nombre, sinopsis)
		VALUES(Nnombre, Nsinopsis);
		SET `Nid_libro` = LAST_INSERT_ID();
	ELSE
		UPDATE Libro
		SET nombre = Nnombre, sinopsis = Nsinopsis
		WHERE id_libro = Nid_libro;

	END IF;
	SELECT Nid_libro AS 'id_libro';
END 

#################

DROP PROCEDURE IF EXISTS agregarActualizarReserva;
DELIMITER $$
CREATE  PROCEDURE agregarActualizarReserva(
	IN Nid_reserva INT,
	IN NfechadeReserva VARCHAR(30)
)
BEGIN 
	IF Nid_reserva = 0 then
		INSERT INTO Reserva(fechadeReserva)
		VALUES(NfechadeReserva);
		SET `Nid_reserva` = LAST_INSERT_ID();
	ELSE
		UPDATE Reserva
		SET fechadeReserva = NfechadeReserva
		WHERE id_reserva = Nid_reserva;

	END IF;
	SELECT Nid_reserva AS 'id_reserva';
END 
