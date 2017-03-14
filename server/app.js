var express = require('express');
var path = require('path');
var db = require('./dbinit');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(path.resolve('client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  db.Category.find({where: {name: req.body.category}}).then(function(currentCategory) {
    console.log('********************* currentCategory:', currentCategory, 'req.body.category', req.body.category);
    if (!currentCategory) {
      return db.Category.create({name: req.body.category});
    } else {
      return new Promise(function(resolve) {
        resolve(currentCategory);
      })
    }
  })
  .then(function(currentCategory) {
    db.Resource.create({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      categoryId: currentCategory.id
    });
  });

  res.end();
});

module.exports = {
  app: app
}