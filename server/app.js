var express = require('express');
var path = require('path');
var db = require('./dbinit');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(path.resolve('client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/resources', function(req, res) {
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
  db.Category.find({where: {name: req.body.category}}).then(function(currentCategory) {
    if (currentCategory === null) {
      return db.Category.create({name: req.body.category});
    } else {
      return new Promise(function(resolve) {
        resolve(currentCategory);
      });
    }
  })
  .then(function(currentCategory) {
    return db.Resource.create({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      categoryId: currentCategory.id
    });
  })
  .then(function(newResource) {
    res.json(newResource);
    res.end();
  }).catch(function(e) {
    res.status(500);
    res.end('Database confused. Please try again');
  });
});

module.exports = {
  app: app
}