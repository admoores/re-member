var express = require('express');
var path = require('path');


var app = express();

app.use(express.static(path.resolve('client')));

app.get('/api/resources', function(req, res) {

});

module.exports = {
  app: app
}