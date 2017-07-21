
	var express = require('express'); // Webframework for nodejs, quite powerfull
	var app = express(); 
	
	app.get('/', function (req, res) { // telling nodeJs to get all commands from / into this function
	  res.send('Node One says Hello!'); // give a Hello World back, if a request comes in 
	});
	
	
	var port = process.env.PORT || 3000 // either use the port 3000 or a port which is in the "environment variable" - the cloud will deliver us such a port 
	app.listen(port); // tell nodejs to listen to this port and give response
	
	console.log('I am ready and listening on %d', port); // write something nice in the console, that the developer sees, it works
