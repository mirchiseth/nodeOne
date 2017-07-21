// Based on https://ict.swisscom.ch/2015/12/move-with-your-mongodb-node-js-into-the-cloud/

	var express = require('express'); // Webframework for nodejs, quite powerfull
	var app = express(); 
	var mongoClient = require('mongodb').MongoClient; // New MongoDB client
    var vcap_services = JSON.parse(process.env.VCAP_SERVICES); // Get Environment variables from your App ; more at https://docs.developer.swisscom.com/apps/deploy-apps/environment-variable.html
    var uri = vcap_services.mongodb[0].credentials.uri; // Get the URI with the credentials
 
    /*
 * Gather  all requests from / 
 */
app.get('/', function (req, res) { // telling nodeJs to get all commands from / into this function
    /* Connect to MongoDB */  	
	mongoClient.connect( uri , function(err, db) { // connect to the local Database
		res.writeHead(200,{"Content-Type" : "text/html"}); // write header
 
	  	res.write('<h1>How is the weather ? </h1>');
	  	if(err) { throw err; } // check if connection is ok, else output
 
	  	db.collection("weatherCOLL").findOne(function(err, output) {  // finds the first object/temperature
	    	res.write('Hello World! <br><hr> The weather is '+ output.temperature +' today'); 
		  	res.write('<br><hr><form action=\'/temp\'><h3>Change weather</h3><br><input type=text name=temp value=hot><br><input type=submit value=\'Change the weather...\'></form>'); // add a simple inputfield
			res.end();
			db.close(); // close the Database connection
	  	});
    });
});
 
/*
 * Gather all requests from /temp 
 */
app.get('/temp', function (req, res) { // telling nodeJs to get all commands from /temp into this function
 
 	/* Connect to MongoDB */
	mongoClient.connect( uri , function(err, db) { // connect to the local database
	  	if(err) { return console.dir(err); } // check if connection is ok, else output
 
	  	db.collection('weatherCOLL').drop(); // drop the collection if existing
  		db.collection('weatherCOLL').insert( {"temperature": req.query.temp } ) // add a new object with "temperature"
		res.send("done <hr> <a href=\'/\'>back</a>");
		res.end();
  		db.close(); // close the Database connection
  	});
});
	
	
	var port = process.env.PORT || 3000 // either use the port 3000 or a port which is in the "environment variable" - the cloud will deliver us such a port 
	app.listen(port); // tell nodejs to listen to this port and give response
	
	console.log('I am ready and listening on %d', port); // write something nice in the console, that the developer sees, it works
