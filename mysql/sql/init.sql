DROP SCHEMA IF EXISTS quizy;
CREATE SCHEMA quizy;
USE quizy;

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  place VARCHAR(255) NOT NULL
);

INSERT INTO questions SET place='東京';
INSERT INTO questions SET place='広島';

DROP TABLE IF EXISTS choices;
CREATE TABLE choices (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  place_id INT NOT NULL,
  true_false INT NOT NULL,
  choice VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS images;
CREATE TABLE images (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  place_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL
);