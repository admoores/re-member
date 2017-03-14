var Sequelize = require('sequelize');
var dummyData = require('./dummydata')

var sequelize = new Sequelize('remember', 'root', '4vxjvEo7t##UXVcm', {dialect: 'mysql'});

var Category = sequelize.define('category', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  name: {type: Sequelize.STRING, unique: true}
}, {timestamps: false, freezeTableName: true, tableName: 'categories'});

var Resource = sequelize.define('resource', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  title: {type: Sequelize.STRING},
  link: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
}, {timestamps: true, freezeTableName: true, tableName: 'resources'});

Category.hasMany(Resource);
Resource.belongsTo(Category);

var initTables = function() {
  sequelize.sync().then(function(err) {
    dummyData();
  });
};

sequelize.authenticate().then(function(err) {
  if(err) {
    console.log('SQL authenticate error:', err);
  } else {
    console.log('connected to DB');
    initTables();
  }
});

module.exports = {
  db: sequelize,
  Category: Category,
  Resource: Resource
};
