//Created by Cameron Fitzpatrick 2019
//Modified 2020
/* 
   This singleton file operation will increment
   the amount correct field in the database.
   It finds the correct user with the name found
   in the server file. This uses SQLite3
   and JavaScript to make the db call.   
*/
const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
//this is the interaction between the code and the database
const db = new sqlite3.Database(dbFileName);
//This function does the increment operation:
function incrCorrect(req,res,next){
  //grab user and card:
  let cardID = req.query.cardID;
  let userTag = req.user.userData.googleid;
  //here is the db command, userid and malay are set
  //in db.run
  let sdbcall = 'UPDATE FlashCards SET correct = correct + 1 WHERE userid = ? AND malay = ?';
  //run the singleton command using db.run:
  db.run(dbcall, userTag, cardID);
}
exports.incrCorrect = incrCorrect;
