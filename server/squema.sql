CREATE DATABASE flightApp_database;

USE flightApp_database;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50)
);

CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origin VARCHAR(50),
    destiny VARCHAR(50),
    date VARCHAR(50),
    passengers INT(20),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert two users as example
INSERT INTO users (name, lastname, email, password) VALUES ('Alejandra', 'Campos', 'ale@correo.com', 'vvvvvv');
INSERT INTO users (name, lastname, email, password) VALUES ('Rodrigo', 'Fuentes', 'rod@correo.com', 'vvvvvv');

-- Insert two flights as example
INSERT INTO flights (origin, destiny, date, passengers, user_id) VALUES ('Baercelona - BCN', 'Chicago - ORD', 'September 12, 2024', 2, 1);
INSERT INTO flights (origin, destiny, date, passengers, user_id) VALUES ('Palermo - PMO', 'Toulouse - TLS', 'October 10, 2024', 1, 2);