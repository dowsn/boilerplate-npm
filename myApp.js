let express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello Express');
});

// console.log(app.get('/', res));

console.log('Hello World');

// is exported to be used in servers.js
module.exports = app;
