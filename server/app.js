var express = require('express');
var path = require('path');
var db = require('./dbinit');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');


var app = express();

app.use(express.static(path.resolve('client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/resources', function(req, res) {
  var token = req.headers['x-access-token'];
  var user;
  var userId;
  var tokenCheck = new Promise(function(resolve, reject) {
    if (!token) {
      res.status(401);
      res.end('Invalid User Token');
      reject();
    } else {
      user = jwt.decode(token, 'the secretest');
      resolve();
    }
  }).then(function() {
    db.User.find({where: {name: user.name}}).then(function(currentUser) {
      if (!currentUser) {
        res.status(401);
        res.end();
      } else {
        userId = currentUser.id;
        var fullList = {};
        var getCategories = db.Category.findAll({where: {userId: userId}}).then(function(categoryList) {
          fullList.categories = categoryList;
        });
        var getResources = db.Resource.findAll({where: {userId: userId}}).then(function(resourceList) {
          fullList.resources = resourceList;
        });
        Promise.all([getCategories, getResources]).then(function() {
          res.json(fullList);
          res.end();
        });
      }
    });
  });
});

app.get('/api/userExists', function(req, res) {
  var token = req.headers['x-access-token'];
  var user;
  var userId;
  var tokenCheck = new Promise(function(resolve, reject) {
    if (!token) {
      res.status(401);
      res.end('Invalid User Token');
      reject();
    } else {
      user = jwt.decode(token, 'the secretest');
      resolve();
    }
  }).then(function() {
    db.User.find({where: {name: user.name}}).then(function(currentUser) {
      if (currentUser) {
        res.json({exists: true});
      } else {
        res.json({exists: false});
      }
      res.end();
    });
  });
});

app.post('/api/resources', function(req, res) {
  var token = req.headers['x-access-token'];
  var user;
  var userId;
  var tokenCheck = new Promise(function(resolve, reject) {
    if (!token) {
      res.status(401);
      res.end('Invalid User Token');
      reject();
    } else {
      user = jwt.decode(token, 'the secretest');
      resolve();
    }
  }).then(function() {
    db.User.find({where: {name: user.name}}).then(function(currentUser) {
      if (!currentUser) {
        res.status(401);
        res.end('User not found');
      } else {
        userId = currentUser.id;
      }
    }).then(function() {
      db.Category.find({where: {name: req.body.category, userId: userId}}).then(function(currentCategory) {
        if (currentCategory === null) {
          return db.Category.create({name: req.body.category, userId: userId});
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
          categoryId: currentCategory.id,
          userId: userId
        });
      })
      .then(function(newResource) {
        res.json(newResource);
        res.end();
      }).catch(function(e) {
        res.status(500);
        res.end('Database confused. Please try again');
      });
    })
  });
});

app.post('/api/auth', function(req, res) {
  var user = req.body.user;
  db.User.find({where: {name: user.name}}).then(function(currentUser) {
    if (!currentUser) {
      return db.User.create({name: user.name, hash: bcrypt.hashSync(user.password)});
    } else {
      var auth = bcrypt.compareSync(user.password, currentUser.hash);
      console.log('AUTHENTICATED:', auth);
      return new Promise(function(resolve, reject) {
        if (auth) {
          resolve(currentUser);
        } else {
          reject();
        }
      });
    }
  })
  .then(function(currentUser) {
    var token = jwt.encode(user, 'the secretest');
    res.json({token: token});
    res.end();
  }).catch(function(e) {
    console.log(e);
    res.status(500);
    res.end();
  });
});

module.exports = {
  app: app
}