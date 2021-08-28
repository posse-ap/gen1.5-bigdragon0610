DROP SCHEMA IF EXISTS quizy;
CREATE SCHEMA quizy;
USE quizy;

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  choice1 VARCHAR(255) NOT NULL,
  choice2 VARCHAR(255) NOT NULL,
  choice3 VARCHAR(255) NOT NULL
);

INSERT INTO questions SET choice1='たかわ', choice2='たかなわ', choice3='こうわ';
INSERT INTO questions SET choice1='かめいど', choice2='かめど', choice3='かめと';