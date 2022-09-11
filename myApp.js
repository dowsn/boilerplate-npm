let express = require('express');
let bodyParser = require('body-parser')
let app = express();
require('dotenv').config();

// middleware must be here mounted before all the routes that depend on it.


//The middleware to handle URL encoded data is returned by this 

// To parse the data coming from POST requests, you must use \
// the body-parser package. 

// extended is a configuration option that tells body-parser 
// which parsing needs to be used.
// When extended=false it uses the classic encoding querystring 
// library. When extended=true it uses qs library for parsing.
app.use(bodyParser.urlencoded({extended: false})); 
// bodyParser returns middleware function with all three parameters like req, res, next, so I have to call only urlencoded method on bodyParser object and pass argument
  

// middleware function express.static(path) - interprets route handler and
// adds some information to it; app.use is just mounting this middle ware function
const stylesheet = __dirname + '/public';
// I need to specify path as the first argument because it would
// execute middleware for all requests
app.use('/public', express.static(stylesheet));


// Note: Express evaluates functions in the order they appear in the code. 
// This is true for middleware too. If you want it to work for all the routes, 
// it should be mounted before them. Here before getting html file

// in this case no path because we want to make it available everywhere to
// check the path
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// just for simply showing hello word in app as a message
// app.get('/', function (req, res) {
//   res.send('Hello Express');
// });

// __dirname is Node global variable to calculate the path like this

// will server a file
app.get('/', function (req, res) {
  const absolutePath = __dirname + '/views/index.html';

  console.log(absolutePath);
  res.sendFile(absolutePath);
});
  // adding configuration as a secret which influences response
const MESSAGE_STYLE = process.env.MESSAGE_STYLE

// route handler is the function within this method - function(req,res)
app.get('/json', function (req, res) {
  const helloJSON = 'Hello json';
  const message = MESSAGE_STYLE === 'uppercase' ? helloJSON.toUpperCase() : helloJSON;
  const data = {
    "message": message
  }
  res.json(data);
});

app.get('/now', function(req, res, next) {
  // this is middleware function that adds current time to the request object
  // int the req.time key
  req.time = new Date().toString();
  next();
}, function(req, res) {
  // final handler using edited req from middleware
  const data = {
    "time": req.time
  };
  // could be also res.json and I wouldn't have to type "time"
  res.send(data);
})

app.get('/:word/echo',function(req, res) {
  console.log(req.params);
  const word = req.params.word;
  const data = {
    echo: word
  };
  res.json(data);
});

// I can chain methods like this on route
app.route('/name')
  .get(function(req, res) {
  const first = req.query.first;
  const last = req.query.last;
  const data = {
    name: `${first} ${last}`
  };
  res.json(data);
})
  // for the form after hitting submit I have three keys in req
  // object and I can return them because I can parse body due
  // to library
  .post(function(req, res) {
    console.log(req.body);
    res.json({
      name: `${req.body.first} ${req.body.last}`
    })
  })



// is exported to be used in servers.js
module.exports = app;
