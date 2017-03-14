var Sequelize = require('sequelize');

var sequelize = new Sequelize('remember', 'root', '4vxjvEo7t##UXVcm', {dialect: 'mysql'});


var Category = sequelize.define('Category', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  name: {type: Sequelize.STRING, unique: true}
});

var Resource = sequelize.define('Resource', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  DateCreated: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW}
});

var testTable = sequelize.define('asdf', {
  something: Sequelize.STRING
});

Category.hasMany(Resource);
Resource.belongsTo(Category);

var initTables = function() {

  sequelize.sync().then(function(err) {
    if (err) {
      console.log('Create Table Error:', err)
    } else {
      console.log('tables created successfully');
    }
  })
};

sequelize.authenticate().then(function(err) {
  if(err) {
    console.log('SQL authenticate error:', err);
  } else {
    console.log('connected to DB');
    initTables();
    module.exports = {
      db: sequelize,
      categories: Category,
      resources: Resource
    };
  }
});

