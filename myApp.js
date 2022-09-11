let express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello Express');
});

// __dirname is Node global variable to calculate the path like this
const absolutePath = __dirname + /views/index.html;

// will server a file
app.get('/', res.sendFile(absolutePath));

// console.log(app.get('/', res));
console.log('Hello World');

// is exported to be used in servers.js
module.exports = app;
