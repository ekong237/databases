

CREATE DATABASE chat;

USE chat;
--
-- CREATE TABLE messages (
--   /* Describe your table here.*/
--   ID int NOT NULL AUTO_INCREMENT,
--   message VARCHAR(50) NOT NULL,
--   userID int NOT NULL
--   RoomID int NOT NULL
--   PRIMARY KEY (ID)
-- );
--
-- CREATE TABLE user  (
--
-- );
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 CREATE TABLE room_names (
 id  INT AUTO_INCREMENT NOT NULL,
 Name VARCHAR(20) ,
 PRIMARY KEY (id)
 );

 CREATE TABLE user (
 id  INT AUTO_INCREMENT NOT NULL,
 user CHAR(20) ,
 PRIMARY KEY (id)
 );

 CREATE TABLE messages (
 id  INT AUTO_INCREMENT NOT NULL,
 message CHAR(20) ,
 createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
 userID INT ,
 roomID INT ,
 PRIMARY KEY (id),
 FOREIGN KEY (userID) REFERENCES user (id),
 FOREIGN KEY (roomID) REFERENCES room_names (id)
 );
