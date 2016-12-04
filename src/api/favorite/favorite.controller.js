var Favorites   = require('../../models/favorites.model');
var http        = require('http');
var Promise     = require('promise');
var HttpService = require('../../services/HttpService');

exports.create     = create;
exports.destroy    = destroy;
exports.index      = index;
exports.isFavorite = isFavorite;

function create(req, res) {
  var favorite = {
    userId: req.user.id,
    serieId: req.body.serieId
  };
  return Favorites.create(favorite)
    .then(function (result) {
      return res.status(201).json(result);
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

function destroy(req, res) {
  return Favorites.destroy({
      where: {
        serieId: req.params.serieId,
        userId: req.user.id
      }
    })
    .then(function (result) {
      return res.status(204).send(null);
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}


function index(req, res) {
  console.log('testing');
  return Favorites.findAll({
      where: {
        userId: req.user.id
      }
    })
    .then(function (favorites) {
      var promises = [];

      for(var i = 0; i < favorites.length; i++) {
        promises.push(HttpService.call('api.tvmaze.com', '/shows/' + favorites[i].dataValues.serieId + '?embed[]=episodes'))
      }
      return Promise.all(promises);
    })
    .then(function (results) {
      return res.status(200).json(results);
    })
    .catch(function (err) {
      console.log('err', err.stack);
      return res.status(500).send(err);
    });
}

function isFavorite(req, res) {
  return Favorites.find({
      where: {
        userId: req.user.id,
        serieId: req.params.id
      }
    })
    .then(function (result) {

      var response = {
        isFavorite: result != null
      };
      console.log('is favorite', response);
      return res.status(200).json(response);
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}