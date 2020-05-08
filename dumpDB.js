//Created by Cameron Fitzpatrick 2019
//Modified 2020
/* 
   This file dumps the db:
*/
const sqlite3 = require("sqlite3").verbose(); 
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);
function dumpDB(){
    db.all ( 'SELECT * FROM flashcards', dataCallback);
    function dataCallback( err, data ) {console.log(data)}
}
dumpDB();
