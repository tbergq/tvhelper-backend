'use strict';

var express     = require('express');
var controller  = require('./favorite.controller');
var UserService = require('../../services/UserService');

var router = express.Router();

router.get('/', UserService.isAuthenticated(), controller.index);
router.post('/', UserService.isAuthenticated(), controller.create);
router.get('/isFavorite/:id', UserService.isAuthenticated(), controller.isFavorite);
router.delete('/:serieId', UserService.isAuthenticated(), controller.destroy);


module.exports = router;