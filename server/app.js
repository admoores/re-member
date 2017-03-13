var express = require('express');
var path = require('path');


var app = express();

app.use(express.static(path.resolve('client')));

module.exports = {
  app: app
}