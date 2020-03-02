This project was created by Cameron Fitzpatrick 2019  

This is a flashcard web application that translates user input  
(English) into Malay.  

## Technologies used  
This application uses sqlite3 as the database, and queries are  
sent to the server via JavaScript. The front end was built using  
ReactJs and the back end using nodeJs and expressJs.  
The login is handled via Google login API. This is a dhtml app  
created using ReactJs, a single html and css.  

## Server pipeline  
Upon hiting enter or clicking enter the application sends a request  
via AJAX (HTTP with xmlHTTP) to the server, the server then sends a  
request to the Google translate API and waits for a response.  Once   
receiveing a response the server sends back a JSON. The middleware  
extracts the JSON data, turns it into an object (firstly) and puts  
the data on the browsers by creating the DOM elements. In this  
case the DOM elements are virtual because I am using React. Upon  
a setstate call, the elements will be put into the browser DOM  
accordingly. For more information see the React documentation. 
