'use strict';

var express    = require('express');
var controller = require('./auth.controller');
var UserService = require('../../services/UserService');

var router = express.Router();


router.post('/', controller.login);
router.get('/me', UserService.isAuthenticated(), controller.me);

module.exports = router;