'use strict';

var request = require('request');
var path    = require('path');
var _       = require('lodash');

const APP_LIMITS_MAP = {
  'x-limit-app-limit':     'limit',
  'x-limit-app-remaining': 'remaining',
  'x-limit-app-reset':     'reset',
};

class Transport {
  constructor(client) {
    this.client = client;
  }

  sendRequest(options) {
    var options = _.defaults(
      options,
      {
        'host':    this.client.options.host,
        'method': 'GET',
        'path':   '',
        'query':  {},
        'body':   {}
      }
    );

    return new Promise(
      (resolve, reject) => {
        request(
          {
            'method': options.method,
            'uri':    options.host + path.join('/' + this.client.options.version, options.path),
            'qs':     options.query,
            'form':   options.body
          },
          (error, response, body) => {
            if (error) {
              return reject(new Error('Failed to make the request'));
            }

            let result = JSON.parse(body);

            if (response.statusCode != 200) {
              return reject(new Error(result.errors[0]));
            }

            for (var i in APP_LIMITS_MAP) {
              if (_.has(response.headers, i)) {
                this.client.app[APP_LIMITS_MAP[i]] = response.headers[i];
              }
            }

            return resolve(result);
          }
        );
      }
    );
  }
}

module.exports = Transport;
