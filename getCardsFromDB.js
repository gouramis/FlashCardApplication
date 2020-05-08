//Created by Cameron Fitzpatrick 2019
//Modified 2020
const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
//this is the interaction between the code and the database
const db = new sqlite3.Database(dbFileName);
function getCards(req, res, next) {
  let userTag = req.user.userData.googleid;
  let stuff = 'SELECT * FROM Flashcards WHERE userid = ?';
  db.all(stuff, userTag, callBackFun);
  function callBackFun (err, arrayData) {
    if (err) {
      console.log(err);
    } else {
      if( typeof arrayData !== "undefined" ){
        //cards in db change state to review
        //arrayData.forEach(function (row) {console.log("got: ",row,"\n");});
        
        res.json({ cards : true, rows: arrayData });
      } else {
        //no cards in db change start to add
        console.log("not in db");
        res.json({ cards : false, rows: [] });
      }
    }
  }
}
exports.getCards = getCards;
