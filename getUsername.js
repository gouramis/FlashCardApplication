//Created by Cameron Fitzpatrick 2019
const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Flashcards.db";
//makes the object that represents the database in our code
//this is the interaction between the code and the database
const db = new sqlite3.Database(dbFileName);
function getFirstName(req, res, next) {
  let userTag = req.user.userData.googleid;
  let stuff = 'SELECT * FROM Users WHERE googleid = ?';
  db.get(stuff, userTag, callBackFunSChION);
  function callBackFunSChION (err, rowData) {
    if (err) {
      console.log(err);
    } else {
      let userData = {userData: rowData};
      username = rowData.firstName;
      res.json({ username : username });
    }
  }
}
exports.getFirstName = getFirstName;
