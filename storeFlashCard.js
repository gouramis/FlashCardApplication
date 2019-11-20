const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
//this is the interaction between the code and the database
const db = new sqlite3.Database(dbFileName);
function storeFlashCard(req, res, next){
  let urlT = req.url;
  console.log(urlT.malay);
  //grab the english and translated text after user hits save button
  let malay = req.query.malay;
  let english = req.query.english;
  //get user from google
  let userfromajaxrequest = req.user.userData.googleid;
  //insert users flashcard into flashcard table in db, according to their id
  const cmdStr = 'INSERT into Flashcards(userid, english, malay, seen, correct) VALUES (?, @0, @1, 0, 0)';
  //serialize insertion to prevent sql injection
  db.run(cmdStr, userfromajaxrequest, english, malay, storeFlashCardCallback);
  //homemade error checking:
  function storeFlashCardCallback(err){
      if (err) {console.log("storeFlashCardCallback error: " + err);}
      res.json({ StoredCard : "true" });
  }
}
exports.storeFlashCard = storeFlashCard;
