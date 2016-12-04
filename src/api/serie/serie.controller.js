'use strict';

var http        = require('http');
var Promise     = require('promise');
var HttpService = require('../../services/HttpService');
var HOST        = 'api.tvmaze.com';

exports.episodes = episodes;
exports.search   = search;
exports.show     = show;


function episodes(req, res) {
  return HttpService.call(HOST, '/shows/' + req.params.serieId + '/episodes')
    .then(function (result) {
      return res.status(200).json(result);
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

function search(req, res) {
  console.log('search is ', encodeURI(req.params.searchText));
  return HttpService.call(HOST, '/search/shows?q=' + encodeURI(req.params.searchText))
    .then(function (result) {
      return res.status(200).json(result);
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

function show(req, res) {
  return HttpService.call(HOST, '/shows/' + req.params.serieId + '?embed[]=episodes')
    .then(function (result) {
      return res.status(200).json(result);
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

