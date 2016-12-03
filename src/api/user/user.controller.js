'use strict';

var userService = require('../../services/UserService');


exports.create = create;

function create(req, res) {
  return userService.createUser(req.body)
    .then(function (result) {
      delete result.dataValues.password;
      return res.status(201).json(result);
    })
    .catch(function(err) {
      console.log('err', err.stack);
      console.log(err);
      return res.status(500).send(err);
    });
};