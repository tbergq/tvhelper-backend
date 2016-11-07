var db        = require('../config/db');
var sequelize = require('sequelize');


var User = db.define('Users', {
  id: {
    primaryKey: true,
    type: sequelize.INTEGER,
    autoIncrement: true
  },
  email: {
    type: sequelize.STRING,
    unique: true
  },
  password: {
    type: sequelize.STRING
  },
  username: {
    type: sequelize.STRING,
    unique: true
  }
});

User.sync();

module.exports = User;