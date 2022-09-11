let express = require('express');
let app = express();

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

// middleware function express.static(path) - interprets route handler and
// adds some information to it; app.use is just mounting this middle ware function
const stylesheet = __dirname + '/public';
// I need to specify path as the first argument because it would
// execute middleware for all requests
app.use('/public', express.static(stylesheet));

// console.log(app.get('/', res));
console.log('Hello World');

const messageStyle = process.env.MESSAGE_STYLE;

// route handler is the function within this method - function(req,res)
app.get('/json', function (req, res) {
  if (messageStyle === 'uppercase') {
    res.json({ message: 'HELLO JSON' });
  } else {
    res.json({ message: 'Hello json' });
  }
});

// is exported to be used in servers.js
module.exports = app;
