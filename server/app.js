var express = require('express');
var path = require('path');
var db = require('/dbinit');


var app = express();

app.use(express.static(path.resolve('client')));

app.get('/api/resources', function(req, res) {
  var fullList;
  var getCategories = db.Category.findAll().then(function(categoryList) {
    fullList.categories = categoryList;
  });
  var getResources = db.Resource.findAll().then(function(resourceList) {
    fullList.resources = resourceList;
  });
  Promise.all([getCategories, getResources]).then(function() {
    res.json(fullList);
    res.end();
  })
});

module.exports = {
  app: app
}