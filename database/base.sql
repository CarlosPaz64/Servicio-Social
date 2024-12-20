CREATE DATABASE IF NOT EXISTS verificacion;

USE verificacion;

CREATE TABLE IF NOT EXISTS usuario(
    id INT AUTO_INCREMENT PRIMARY KEY,
    colaborador VARCHAR(255) NOT NULL,
    modulo VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tramites_verificacion(
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_folio VARCHAR(255),
    id_unico VARCHAR(255),
    curp VARCHAR(100),
    fullname VARCHAR(255),
    tramite VARCHAR(255) NOT NULL,
    comentario LONGTEXT,
    turno VARCHAR(255),
    turno_habilitado TINYINT DEFAULT 0  -- Nueva columna sin especificar display width
);

-- DROP DATABASE verificacion;