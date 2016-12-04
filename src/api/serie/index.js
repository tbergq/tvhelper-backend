'use strict';

var express    = require('express');
var controller = require('./serie.controller');


var router = express.Router();

router.get('/search/:searchText', controller.search);
router.get('/:serieId', controller.show);
router.get('/:serieId/episodes', controller.episodes);


module.exports = router;