var express = require('express');
var path = require('path');


var app = express();

app.get('/', function(req, res) {
  console.log('heard a GET request');
  res.sendFile(path.resolve('client/index.html'));
  res.end();
});

app.listen(80, function() {
  console.log('listening on port 80');
});
