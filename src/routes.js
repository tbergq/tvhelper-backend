/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/favorites', require('./api/favorite'));


  //app.use('/auth', require('./auth'));


  // All other routes should redirect to the index.html

};
