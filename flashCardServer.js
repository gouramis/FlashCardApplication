//Created by Cameron Fitzpatrick 2019
//Modified 2020
/* 
   This is the express server code for the application.
   This uses Google translate API for translation,
   Google login API for user id's,
   SQLite3 for the database,
   and all database calls are singleton files.
*/
//use strict to prevent anything weird from happening:
"use strict"
//Globals
let username = '';
//using express:
const express = require('express')
//my port number for the linux server this is built to
//run on:
const port = 52559
//middleware functions:
const fs = require("fs");
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
const store = require('./storeFlashCard.js');
const translater = require('./translate.js');
const name = require('./getUsername.js');
const cards = require('./getCardsFromDB.js');
const incrementSeen = require('./incrementAmountSeen.js');
const incrementCorrect = require('./incrementAmountCorrect.js');
const sqlite3 = require("sqlite3").verbose();
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
//this is the interaction between the code and the database
const db = new sqlite3.Database(dbFileName);
//my client data from google api:
const googleLoginData = {
    clientID: '774968755251-4q36uu2hvu6acjj4nnkh0fca1rhm3ate.apps.googleusercontent.com',
    clientSecret: 'z708RWqLLnANSHcwja468Gfo',
    callbackURL: 'http://server162.site:52559/auth/redirect'
};
// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}
// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
    	console.log("Req.session:",req.session);
    	console.log("Req.user:",req.user);
	  next();
    } else {
	    res.redirect('/login.html');
    }
}

//function called during login, the second time passport.authenticate
//is called (in /auth/redirect/),
//once we actually have the profile data from Google.
function gotProfile(accessToken, refreshToken, profile, done) {
		//grab profile information for user:
    let dbRowID = String(profile.id);
    let fName = String(profile.name.givenName);
    let lName = String(profile.name.familyName);
		//check if user is in db, if not place in there:
    const cmdStr = 'INSERT INTO Users(googleid, firstName, lastName) VALUES (?,?,?) ';
    db.run( cmdStr , dbRowID, fName, lName, storeUserCallback)
    //error here has high probability of being user exists in table already:
    function storeUserCallback (err) {
        if (err) {console.log("account already in database, moving on");}
        else {console.log("inserted user into db");}
        //I set googleid as primary key so uniqueness is forced.
    }
    // some commands that may or may not be useful sometime:
    //'UPDATE Users SET seen = seen + 1 WHERE googleid = dbRowID'
    //UPDATE {Table} SET {Column} = {Column} + {Value} WHERE {Condition}
    done(null, profile.id);
}
//part of Server's sesssion set-up.
//the second operand of "done" becomes the input to deserializeUser
//on every subsequent HTTP request with this session's cookie.
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});
// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie.
// Where we should lookup user database info.
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    let stuff = 'SELECT * FROM Users WHERE googleid = ?';
    db.get(stuff, dbRowID, callBackFunSChION);
    function callBackFunSChION (err, rowData) {
      if (err) {
        console.log("idk");
        done(null, null);
      } else {
        console.log("alll good");
        let userData = {userData: rowData};
        done(null, userData);
        username = rowData.firstName;
      }
    }
});
//some middleware functions:
function translate (req,res,next) {
  translater.translateHandler(req,res,next);
}
function storeCard (req,res,next) {
  store.storeFlashCard(req, res,next);
}
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}
//put together the server pipeline
//Below code was given from Google,
//and modified by Cameron Fitzpatrick 2019
const app = express();
//tell passport we will be using login with Google
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );
//pipeline stage that just echos url, for debugging
app.use('/', printURL);
//Check validity of cookies at the beginning of pipeline
//will get cookies out of request, decrypt and check if
//session is still going on.
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']
}));
//Initializes request object for further handling by passport
app.use(passport.initialize());
//If there is a valid cookie, will call deserializeUser()
app.use(passport.session());
/Public static files
app.get('/*',express.static('public'));
//handler for url that starts login with Google.
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
app.get('/auth/redirect',
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	passport.authenticate('google'),
	function (req, res) {
	    console.log('redirecting')
	    res.redirect('/user/bahasaReact.html');
	});
// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in
	// serving files that start with /user from here gets them from ./
	express.static('.')
       );
//above code is given from Google, and modified by Cameron Fitzpatrick 2019
//more middleware functions:
function getName (req,res,next) {
  name.getFirstName(req,res,next);
}
function getCards (req, res, next) {
  cards.getCards(req, res, next);
}
function incSeen (req, res, next) {
  incrementSeen.incrSeen(req, res, next);
}
function incCorrect (req, res, next) {
  incrementCorrect.incrCorrect(req, res, next);
}
// next, all queries (like translate or store or get...
app.get('/', getName );
app.get('/user/check', getCards);
app.get('/user/incrementSeen', incSeen);
app.get('/user/incrementCorrect', incCorrect);
app.get('/user/translate', translate );
app.get('/user/store', storeCard);
app.use(fileNotFound );
app.listen(port, function (){console.log('Listening...');} )
