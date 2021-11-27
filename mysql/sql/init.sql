DROP SCHEMA IF EXISTS webapp;
CREATE SCHEMA webapp;
USE webapp;

DROP TABLE IF EXISTS languages;
CREATE TABLE languages (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  language VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL
);

INSERT INTO languages (language, color) VALUES ("JavaScript", "0346EC"), ("CSS", "1071BD"), ("PHP", "20BEDE"), ("HTML", "3CCEFE"), ("Laravel", "B29EF3"), ("SQL", "6D46EC"), ("SHELL", "4A18EF"), ("情報システム基礎知識(その他)", "3105C0");

DROP TABLE IF EXISTS contents;
CREATE TABLE contents (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL
);

INSERT INTO contents (content, color) VALUES ("ドットインストール", "0346EC"), ("N予備校", "1071BD"), ("POSSE課題", "20BEDE");

DROP TABLE IF EXISTS records;
CREATE TABLE records (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  record_date DATE,
  language_id TINYINT,
  content_id TINYINT,
  studytime TINYINT
);