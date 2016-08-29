var express = require('express');
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://kante:marco@ds055495.mlab.com:55495/fermi';

var app = express();

app.use(express.static('public'));


MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
	}

	db = database;
	collection = db.collection('fermi');
})

var server = app.listen((process.env.PORT || 5000), function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/cerca', function (req, res) {
   res.sendFile( __dirname + "/" + "cerca.html" );
})
app.get('/database', function (req, res) {
   res.sendFile( __dirname + "/" + "database.html" );
})
app.get('/get_database', function (req, res) {
  collection.find().toArray(function(err, results) {
  res.send(results);
  
	})
})

app.get('/get_data', function (req, res) {
    var query = {};
    console.log(req.query.retribution);
	if(req.query.field!=-1 )
	{
		query["field"] = req.query.field;
	}
	if(req.query.period!=-1)
	{
		query["period"] = req.query.period;
	}
	if(req.query.retribution!=-1)
	{
		query["retribution"] = req.query.retribution;
	}
	console.log(query)
    collection.find(query).toArray(function (err, result) {
      if (err) {
        res.end(err);
      } else if (result.length) {
        res.send(result);
      } else {
        res.end('Nessun risultato trovato con questi criteri');
      }      
    });

  }
);
