//Created by Cameron Fitzpatrick 2019
//Modified 2020
/* 
   This file creates a SQLite3 DataBase
*/
//require sqlite3 and filesystem:
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
//filename:
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);
//Initialize table.
//If the table already exists, causes an error.
//Fix the error by removing or renaming Flashcards.db
//Creating a column userID to hold google ID
const cmdTable1 = 'CREATE TABLE Flashcards (userid TEXT, english TEXT, malay TEXT, seen INT, correct INT)';
const cmdTable2 = 'CREATE TABLE Users (googleid TEXT PRIMARY KEY, firstName TEXT, lastName TEXT)';
//run commands:
db.run(cmdTable1);
db.run(cmdTable2);
//Custom callback function to errcheck db call:
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
	db.close();
    }
}
