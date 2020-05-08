//Created by Cameron Fitzpatrick 2019
//Modified 2020
export function createAJAXRequest(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);  // call its open method
    return xhr;
}

function getUrlVars() {
let vars = {};
let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
function(m,key,value) {
  vars[key] = value;
});
return vars;
}
//above function from internet, all over forgot exactly where... think SO or something - it just helps me get the urlT
//this is the only thing I brought in from an outside source

export function makeTranslateRequest(word = getUrlVars()(["english"])) {
    let url1 = "/user/translate?english=";
    //let fType = getUrlVars()["english"];
    let url2 = url1 + word;
    let xhr = createAJAXRequest('GET', url2);
	//checking for errors
    if (!xhr) {
	     alert('CORS not supported');
	     return;
    }
    xhr.onload = function() {
	     let responseStr = xhr.responseText;  // get the JSON string
	     let object = JSON.parse(responseStr);  // turn it into an object
	     document.getElementById("outputGoesHere").textContent = object.InMalay;
    }
    xhr.send();
}
export function makeGetNameRequest(){
    let xhr = createAJAXRequest('GET', '/');
    xhr.onload = function() {
	     let responseStr = xhr.responseText;  // get the JSON string
       //console.log(responseStr);
	     let object = JSON.parse(responseStr);  // turn it into an object
       //place the name from the db onto the screen
       document.getElementById('username').textContent = object.username;
	     console.log(object);
    }
    xhr.send();
}
export function makeIncrementSeenRequest(card){
  let base = '/user/incrementSeen?cardID=';
  let url = base + card
  let xhr = createAJAXRequest('GET', url);
  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    console.log(responseStr);
  }
  xhr.send();
}
export function makeIncrementCorrectRequest(card){
  let base = '/user/incrementCorrect?cardID=';
  let url = base + card
  let xhr = createAJAXRequest('GET', url);
  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    console.log(responseStr);
  }
  xhr.send();
}
export function makeCheckStatusRequest(){
  let url = '/user/check?Status=user';
  let xhr = createAJAXRequest('GET', url);
  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    console.log(responseStr);
    let object = JSON.parse(responseStr);
    console.log(object + "OBJECT AT makeCheckStatusRequest");
    console.log(object.cards);
  }
  xhr.send();
}
export function makeStoreRequest(word = getUrlVars()["english"], translation = getUrlVars()["malay"]) {
    let url1 = "store?english=";
    let url2 = url1 + word + "&malay=" + translation;
    let xhr = createAJAXRequest('GET', url2);
    //checking if browser does CORS
    if (!xhr) {
	     alert('CORS not supported');
	     return;
    }
    xhr.send();
}
export function sbm(){
  //grab input and make request because the user has clicked "enter"
    let id = document.getElementById("inputEng").value;
    makeTranslateRequest(id);
}
export function save(){
    let id = document.getElementById("inputEng").value;
    let malay = document.getElementById("outputGoesHere").textContent;
	makeStoreRequest(id, malay);
}
export function seen(card){
  makeIncrementSeenRequest(card);
  console.log(card);
}
export function correct(card){
  makeIncrementCorrectRequest(card);
  console.log(card);
}
