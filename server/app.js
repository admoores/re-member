var express = require('express');
var path = require('path');
var db = require('./dbinit');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(path.resolve('client')));
app.use(bodyParser.json());

app.get('/api/resources', function(req, res) {
  console.log('get to /api/resources');
  var fullList = {};
  var getCategories = db.Category.findAll().then(function(categoryList) {
    fullList.categories = categoryList;
  });
  var getResources = db.Resource.findAll().then(function(resourceList) {
    fullList.resources = resourceList;
  });
  Promise.all([getCategories, getResources]).then(function() {
    res.json(fullList);
    res.end();
  });
});

app.post('/api/resources', function(req, res) {
  console.log(req.body);
});

module.exports = {
  app: app
}