// server.js
// where your node app starts

// init project
var moment = require ('moment');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api/timestamp/", (req, res) => {
  var dateObject = new Date();
  res.json({"unix": dateObject.valueOf(), "utc" : dateObject.toUTCString() });
});


app.get("/api/timestamp/:date_string", function (req, res) {
  var timeStamp;
  if( /^[0-9]*$/.test(req.params.date_string)) {
    timeStamp=moment.unix(req.params.date_string/1000);
  } else {
    timeStamp=moment(req.params.date_string); 
  }
  if (timeStamp.isValid()) {
    var dateObject=moment(timeStamp).toDate();
    res.json({"unix": dateObject.valueOf()*1, "utc" : dateObject.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });      
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});