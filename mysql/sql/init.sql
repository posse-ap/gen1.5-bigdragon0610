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