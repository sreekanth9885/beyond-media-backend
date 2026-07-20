CREATE DATABASE IF NOT EXISTS beyond_media;

USE beyond_media;

CREATE TABLE users (

id INT AUTO_INCREMENT PRIMARY KEY,

name VARCHAR(100),

email VARCHAR(150) UNIQUE,

password VARCHAR(255),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO users(name,email,password)

VALUES(

'Admin',

'admin@beyondmedia.com',

'$2b$10$fx1gIOVR8FuCIJQptevhUOSYXsjVavB8YMp4g3mhFaPDE5bMoUcRO'
);