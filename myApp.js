let express = require('express');
let app = express();
require('dotenv').config();

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
  const word = req.params.word;
  const data = {
    echo: word
  };
  res.json(data);
});

// is exported to be used in servers.js
module.exports = app;
