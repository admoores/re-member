var db = require('./dbinit')

module.exports = function() {
  var dummyCategory = db.Category.build({name: 'funstuff'}).save();
  dummyCategory.then(function() {
    db.Resource.create({
      title: 'Fun Stuff Article',
      description: 'this article has fun stuff',
      category: 'funstuff'
    });
  });
}