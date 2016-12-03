var db        = require('../config/db');
var sequelize = require('sequelize');
var User      = require('./user.model');

var Favorites = db.define('Favorites', {
  id: {
    primaryKey: true,
    type: sequelize.INTEGER,
    autoIncrement: true
  },
  userId: {
    type: sequelize.INTEGER,
    unique : 'userSerieIndex',
    references: {
      model : User,
      key : 'id'
    }
  },
  serieId : {
    type : sequelize.INTEGER,
    unique : 'userSerieIndex'
  }
});

Favorites.sync();

module.exports = Favorites;