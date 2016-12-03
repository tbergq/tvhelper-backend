var compose      = require('composable-middleware');
var expressJwt   = require('express-jwt');
var jwt          = require('jsonwebtoken');
var passwordHash = require('password-hash');
var Users        = require('../models/user.model');
var secret       = process.env.sessionSecret || 'feafgea313rfwe';
var validateJwt  = expressJwt({secret: secret});

exports.createUser      = createUser;
exports.isAuthenticated = isAuthenticated;
exports.login           = login;

function createUser(user) {
  var hashedPassword = passwordHash.generate(user.password);
  user.password      = hashedPassword;
  return Users.create(user)
    .then(function (result) {
      return result;
    })
    .catch(function (err) {
      console.log('crate user failed->', err.stack);
      return err;
    });
}

function isAuthenticated() {
  return compose()
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well

      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }

      if (!req.headers.authorization)
        res.send(401, 'Unauthorized');

      validateJwt(req, res, next);
      return null;
    })
    // Attach user to request
    .use(function (req, res, next) {
      Users.findById(req.user.id)
        .then(function (user) {
          req.user = user;

          next();
          return null;
        })
        .catch(function (err) {
          if (err) return next(err);
          if (!user) return res.status(401).send('Unauthorized');
        });
    });
}

function login(username, password) {
  return Users.find({
      where: {
        username: username
      }
    })
    .then(function (user) {
      if (passwordHash.verify(password, user.password)) {
        return signToken(user.id);
      }
      else {
        throw new Error('Wrong username or password');
      }
    })
    .catch(function (err) {
      console.log('login failed->', err.stack);
      throw err;
    })
}

function signToken(id) {
  return jwt.sign({id: id}, secret, {expiresIn: '100h'});
}