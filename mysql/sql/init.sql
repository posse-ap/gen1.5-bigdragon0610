DROP SCHEMA IF EXISTS webapp;
CREATE SCHEMA webapp;
USE webapp;

DROP TABLE IF EXISTS languages;
CREATE TABLE languages (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  language VARCHAR(255) NOT NULL
);

INSERT INTO languages (language) VALUES ("JavaScript"), ("CSS"), ("PHP"), ("HTML"), ("Laravel"), ("SQL"), ("SHELL"), ("情報システム基礎知識(その他)");

DROP TABLE IF EXISTS contents;
CREATE TABLE contents (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  content VARCHAR(255) NOT NULL
);

INSERT INTO contents (content) VALUES ("ドットインストール"), ("N予備校"), ("POSSE課題");

DROP TABLE IF EXISTS records;
CREATE TABLE records (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  record_date DATE,
  language_id TINYINT,
  content_id TINYINT
);