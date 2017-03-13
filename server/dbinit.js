var Sequelize = require('sequelize');

var sequelize = new Sequelize('remember', 'root', '4vxjvEo7t##UXVcm', {dialect: mysql});


var initTables = function() {
  var Category = sequelize.define('Category', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequalize.STRING, unique: true}
  });

  var Resource = sequelize.define('Resource', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    title: {type: Sequelize.STRING},
    description: {type: Sequelize.STRING},
    DateCreated: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    category:
  });

  Category.hasMany(Resource);
  Resource.belongsTo(Category);
};

sequalize.authenticate().complete(function(err) {
  if(err) {
    console.log('SQL authenticate error:', err);
  } else {
    console.log('connected to DB');
    initTables();
  }
});
