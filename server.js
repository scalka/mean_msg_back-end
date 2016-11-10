//bringing express library
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // parsing json data 

//endpoint post 
app.post('/api/message', function(req, res){
	console.log(req.body);
	res.status(200); // postman for testing 
	
})

// start server and listen on port 5000, callback function
var server = app.listen(5000, function(){ // response if server started
	console.log('listening on port', server.address().port);
});
//