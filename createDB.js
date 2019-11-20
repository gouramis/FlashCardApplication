// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
//creating a column userID to hold google ID
const cmdStr = 'CREATE TABLE Flashcards (userid TEXT, english TEXT, malay TEXT, seen INT, correct INT)';
const cmdStr1 = 'CREATE TABLE Users (googleid TEXT PRIMARY KEY, firstName TEXT, lastName TEXT)';
/*
||userID|firstName|lastName|english|malay|seen|correct||
*/
db.run(cmdStr);
db.run(cmdStr1);
// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
	db.close();
    }
}
