var http    = require('http');
var Promise = require('promise');

exports.call = call;

function call(host, path) {
  return new Promise(function (resolve, reject) {
    http.request({
        host: host,
        path: path
      },
      function (response) {
        var responseString = '';

        response.on('data', function (chunk) {
          responseString += chunk
        });

        response.on('end', function () {
          resolve(JSON.parse(responseString));
        })
      })
      .end();
  });
}

