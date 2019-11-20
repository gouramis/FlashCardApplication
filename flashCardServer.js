"use strict"
// Globals
let username = '';
const express = require('express')
const port = 52559 // you need to put your port number here
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
      // send response telling Browser to go to login page
    }
}


// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate.
// The callback "done" at the end of each one resumes Passport's
// internal process.

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google.
function gotProfile(accessToken, refreshToken, profile, done) {

    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there.
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.
/*
    if(profile.id) {
      let dbRowID = profile.id;
    } else {
      let dbRowID = 1;
    }
*/
    let dbRowID = String(profile.id);
    let fName = String(profile.name.givenName);
    let lName = String(profile.name.familyName);
    const cmdStr = 'INSERT INTO Users(googleid, firstName, lastName) VALUES (?,?,?) ';
    db.run( cmdStr , dbRowID, fName, lName, storeUserCallback);

    //homemade error checking, error here has high probability of being user exists in table already:
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

// Part of Server's sesssion set-up.
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie.
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
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object.
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
// put together the server pipeline
const app = express();
// Strategy configuration.
// Tell passport we will be using login with Google, and
// give it our data for registering us with Google.
// The gotProfile callback is for the server's HTTPS request
// to Google for the user's profile information.
// It will get used much later in the pipeline.
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );
// pipeline stage that just echos url, for debugging
app.use('/', printURL);
// Check validity of cookies at the beginning of pipeline
// Will get cookies out of request, decrypt and check if
// session is still going on.
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']
}));
// Initializes request object for further handling by passport
app.use(passport.initialize());
// If there is a valid cookie, will call deserializeUser()
app.use(passport.session());
// Public static files
app.get('/*',express.static('public'));
// next, handler for url that starts login with Google.
// The app (in public/login.html) redirects to here (not an AJAX request!)
// Kicks off login process by telling Browser to redirect to
// Google. The object { scope: ['profile'] } says to ask Google
// for their user profile information.
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
// passport.authenticate sends off the 302 response
// with fancy redirect URL containing request for profile, and
// client ID string to identify this app.

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other.
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the
	// temporary key we got in the request.
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done"
	// will come back here to send back the response
	// ...with a cookie in it for the Browser!
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
/*
function translate (req,res,next) {
 translater.translateHandler(req,res,next);
}
function storeCard (req,res,next) {
 store.storeFlashCard(req, res,next);
}
*/
// next, all queries (like translate or store or get...
app.get('/', getName );
app.get('/user/check', getCards);
app.get('/user/incrementSeen', incSeen);
app.get('/user/incrementCorrect', incCorrect);
app.get('/user/translate', translate );
app.get('/user/store', storeCard);
app.use(fileNotFound );
app.listen(port, function (){console.log('Listening...');} )
