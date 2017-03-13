var express = require('express');
var app = express();

app.get('/', function(req, res) {
  console.log('heard a GET request');
  res.sendFile('../client/index.html', {root: __dirname});
  res.end();
});

app.listen(80, function() {
  console.log('listening on port 80');
});
