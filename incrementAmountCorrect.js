
  const sqlite3 = require("sqlite3").verbose();
  const dbFileName = "Flashcards.db";
  // makes the object that represents the database in our code
  //this is the interaction between the code and the database
  const db = new sqlite3.Database(dbFileName);
  function incrCorrect(req,res,next){
    let cardID = req.query.cardID;
    let userTag = req.user.userData.googleid;
    let stuff = 'UPDATE FlashCards SET correct = correct + 1 WHERE userid = ? AND malay = ?';
    db.run(stuff, userTag, cardID);
  }
exports.incrCorrect = incrCorrect;
