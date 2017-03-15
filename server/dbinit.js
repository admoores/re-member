var Sequelize = require('sequelize');

var sequelize = new Sequelize('remember', 'root', '4vxjvEo7t##UXVcm', {dialect: 'mysql'});

var Category = sequelize.define('category', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  name: Sequelize.STRING,
  userId: Sequelize.INTEGER
}, {timestamps: false, freezeTableName: true, tableName: 'categories'});

var Resource = sequelize.define('resource', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  title: Sequelize.STRING,
  link: Sequelize.STRING,
  description: Sequelize.STRING,
  categoryId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
}, {timestamps: true, freezeTableName: true, tableName: 'resources'});

var User = sequelize.define('user', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  name: {type: Sequelize.STRING, unique: true},
  hash: {type: Sequelize.STRING}
}, {timestamps: false, freezeTableName: true, tableName: 'users'});

User.hasMany(Category, {foreignKey: 'userId'});
Category.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

User.hasMany(Resource, {foreignKey: 'userId'});
Resource.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

Category.hasMany(Resource, {foreignKey: 'categoryId'});
Resource.belongsTo(Category, {foriegnKey: 'categoryId', targetKey: 'id'});

var initTables = function() {
  sequelize.sync({force: true}).then(function() {
    // Category.create({name: 'funstuff'}).then(function() {
    //   Category.find({where: {name: 'otherstuff'}}).then(function(currentCategory) {
    //     if (!currentCategory) {
    //       Category.create({name: 'otherstuff'}).then(function(currentCategory) {
    //         Resource.create({
    //           title: 'Fun Stuff Article',
    //           link: 'http://www.funstuff.com/article',
    //           description: 'This article has fun stuff!',
    //           categoryId: currentCategory.id
    //         });
    //       });
    //     } else {
    //       Resource.create({
    //         title: 'Fun Stuff Article',
    //         link: 'http://www.funstuff.com/article',
    //         description: 'This article has fun stuff!',
    //         categoryId: currentCategory.id
    //       });
    //     }
    //   });
    // });
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
  Resource: Resource,
  User: User
};
