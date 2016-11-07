var UserService = require('../../services/UserService');
var User        = require('../../models/user.model');

exports.login = login;
exports.me    = me;

function login(req, res) {
  return UserService.login(req.body.username, req.body.password)
    .then(function (token) {
      return res.status(200).json(token);
    })
    .catch(function (err) {
      return res.status(401).send(err);
    });
}

function me(req, res) {
  return User.find({
      where: {
        id: req.user.id
      },
      attributes: {
        exclude: ['password']
      }
    })
    .then(function (user) {
      return res.status(200).json(user);
    })
    .catch(function (err) {
      console.log('me error', err.stack);
      return res.status(500).send(err);
    });
}