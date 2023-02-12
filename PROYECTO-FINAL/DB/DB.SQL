#-------------------------------------#

CREATE DATABASE ProyectoIS3;
USE ProyectoIS3;

CREATE TABLE Habitacion(
	id_habitacion INT AUTO_INCREMENT,
	ubicacion VARCHAR(30),
	descripcion VARCHAR(30),
	PRIMARY KEY (id_habitacion)
)

CREATE TABLE Usuario(
	id_usuario INT AUTO_INCREMENT,
	correo VARCHAR(30),
	contraseña VARCHAR(30),
	PRIMARY KEY (id_usuario)
)

CREATE TABLE Reserva(
	id_reserva INT AUTO_INCREMENT,
	fecha DATE,
	fk_id_usuario INT,
	fk_id_habitacion INT,
		PRIMARY KEY (id_reserva),
	FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (fk_id_habitacion) REFERENCES Habitacion(id_habitacion)
)

CREATE TABLE Administrador(
	id_administrador INT AUTO_INCREMENT,
	correo VARCHAR(30),
	contraseña VARCHAR(30),
	fk_id_usuario INT,
	PRIMARY KEY (id_administrador),
	FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario)
)

CREATE TABLE Cliente(
	id_cliente INT AUTO_INCREMENT,
	correo VARCHAR(30),
	contraseña VARCHAR(30),
	nombre VARCHAR(30),
	apellidos VARCHAR(30),
	fk_id_usuario INT,
	PRIMARY KEY (id_cliente),
	FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario)
)

