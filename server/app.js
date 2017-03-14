var express = require('express');
var path = require('path');
var db = require('./dbinit');


var app = express();

app.use(express.static(path.resolve('client')));

app.get('/api/resources', function(req, res) {
  console.log('get to /api/resources');
  var fullList = {};
  var getCategories = db.getAllCategories().then(function(categoryList) {
    console.log('Got Category List!!');
    fullList.categories = categoryList;
  });
  var getResources = db.getAllResources().then(function(resourceList) {
    console.log('Got Resource List!!');
    fullList.resources = resourceList;
  });
  Promise.all([getCategories, getResources]).then(function() {
    res.json(fullList);
    res.end();
  });
});

module.exports = {
  app: app
}