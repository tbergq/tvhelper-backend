var Sequelize = require('sequelize');
var dbUrl = process.env.CLEARDB_DATABASE_URL || require('./dbUrl');
var db = new Sequelize(dbUrl);

module.exports = db;