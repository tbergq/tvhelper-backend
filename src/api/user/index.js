'use strict';

var express    = require('express');
var controller = require('./user.controller');
var UserService = require('../../services/UserService');

var router = express.Router();


router.post('/', controller.create);


module.exports = router;