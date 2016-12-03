var Favorites = require('../../models/favorites.model');

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
  return Favorites.findAll({
      where: {
        userId: req.user.id
      }
    })
    .then(function (result) {
      return res.status(201).json(result);
    })
    .catch(function (err) {
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