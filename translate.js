const APIrequest = require('request');
const http = require('http');
const APIkey = "AIzaSyBtmGMsUOLVBJAE6tEZ3xvnH29vAYETnYk";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey;
let requestObject =
    {
	     "source": "en",
	     "target": "ms",
	     "q": [
	          "example phrase"
	     ]
    }
function translateHandler(req, res, next) {
    let url1 = req.url;
    console.log(url1.english);
    requestObject.q[0] = req.query.english;
    myfunc(res);
}
function myfunc(res){
  function APIcallback(err, APIresHead, APIresBody) {
  	if ((err) || (APIresHead.statusCode != 200)) {
  	    console.log("Got API error");
  	    console.log(APIresBody);
  	} else {
  	    if (APIresHead.error) {
  		      // API worked but is not giving you data
  		    console.log(APIresHead.error);
  	    } else {
   		res.json( { EnglishPhrase  : requestObject.q[0], InMalay : APIresBody.data.translations[0].translatedText } );
  	    }
  	}
  }
  APIrequest(
    	{ // HTTP header stuff
  	    url: url,
  	    method: "POST",
  	    headers: {"content-type": "application/json"},
  	    json: requestObject
      }, APIcallback
  );
}
exports.translateHandler = translateHandler;
