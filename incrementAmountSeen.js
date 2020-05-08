//Created by Cameron Fitzpatrick 2019
//Modified 2020
/* 
   This singleton file operation will increment
   the amount seen field in the database.
   It finds the correct user with the name found
   in the server file. This uses SQLite3
   and JavaScript to make the db call.   
*/
//make sure we have sqlite3:
const sqlite3 = require("sqlite3").verbose();
//grab the db be the file name:
const dbFileName = "Flashcards.db";
//make the object that represents the database in our code
//this is the interaction between the code and the database
const db = new sqlite3.Database(dbFileName);
//This function does the increment operation:
function incrSeen(req,res,next){
  //grab the correct card and user:
  let cardID = req.query.cardID;
  let userTag = req.user.userData.googleid;
  //here is the actual db command:
  let dbcall = 'UPDATE FlashCards SET seen = seen + 1 WHERE userid = ? AND malay = ?';
  //using db.run because this is a singleton operation
  //however, userid and cardid are placed in the query
  db.run(dbcall, userTag, cardID);
}
exports.incrSeen = incrSeen;
