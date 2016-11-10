//bringing express library
var express = require('express');
var app = express();

var mongo = require('mongodb').MongoClient;
var database;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // parsing json data 
/*XMLHttpRequest cannot load http://localhost:5000/api/message. Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access 
To solve this, we need to enable CORES, or Cross-Origin Resource Sharing with Express. Let's head back to our server.js and add the following custom middleware.
So I'll add it below our existing middleware. And again we'll use app.use and since it's custom, we need to define our own function callback for it which will have the following arguments: 
request, response, and next. 
And so we need to add a couple headers that will enable CORES, so we'll do that with response dot header, and we'll define key in value pairs.
The first key will be Access-Control-Allow-Origin, and we'll pass in a wild card, meaning we can allow access from any location. 
Let's copy this line and paste it. And now we have to specify which type of headers we will allow. So we'll change origin to headers and we'll allow any headers of content type and authorization.
And since this is custom middleware, we need to call next so that it does not freeze the middleware chain*/
app.use(function(req, res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, AUthorization");
	next();
})

//endpoint post 
app.post('/api/message', function(req, res){
	console.log(req.body);
	database.collection('messages').insertOne(req.body); // req.body - contains object we want to send to db
	res.status(200); // postman for testing 
	
})

mongo.connect("mongodb://localhost:27017/test", function(err, db){
	if(!err){
		console.log("connected to mongo");
		database = db;
	/*	db.collection('messages').insertOne({'msg': 'test'}); reference to our DB, so we can type in db.collection, and we'll create a new collection called Messages. And using the Insert One function, we can pass on an object, 
																which will have a property of message and a value of test*/
	}
})

// start server and listen on port 5000, callback function
var server = app.listen(5000, function(){ // response if server started
	console.log('listening on port', server.address().port);
});
//