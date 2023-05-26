// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', (req, res, next) => {

  // check if parameter exists
  if (req.params.date) {
    // check if date is a number
    if (/^[0-9]+$/.test(req.params.date)) {
      dateTest = new Date(+req.params.date)
    // if not parse parameter as object
    } else {
      dateTest = new Date(req.params.date)
    }

    // print error if date is invalid
    if (dateTest == "Invalid Date") {
      res.json({
        "error": "Invalid Date"
      })
    // print parsed date if parameter is valid
    } else {
      res.json({
        "unix": dateTest.getTime(),
        "utc": dateTest.toUTCString()
      })
    }
  // print actual date if parameter doesnt exist
  } else {
    res.json({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    })
  }
});
