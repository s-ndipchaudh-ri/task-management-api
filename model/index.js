var Sequelize = require("sequelize");
var sequelize = require("../dbConfig").sequelize;

module.exports = {
  task: require('./task')(Sequelize, sequelize, Sequelize.DataTypes),
  user: require('./user')(Sequelize, sequelize, Sequelize.DataTypes)
}