'use strict';

let request = require('request');
let path    = require('path');
let _       = require('lodash');

const APP_LIMITS_MAP = {
  'x-limit-app-limit':     'limit',
  'x-limit-app-remaining': 'remaining',
  'x-limit-app-reset':     'reset',
};

/**
 * Transport
 */
class Transport {
  /**
   * Constructor for transport
   *
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Send request
   *
   * @param {object} options Request options
   *
   * @return {Promise} Promise for chaining
   */
  sendRequest(options) {
    var options = Object.assign(
      {},
      {
        host:    this.client.options.host,
        method: 'GET',
        path:   '',
        query:  {},
        body:   {}
      },
      options
    );

    return new Promise(
      (resolve, reject) => {
        request(
          {
            method: options.method,
            uri:    options.host + path.join('/' + this.client.options.version, options.path),
            qs:     options.query,
            form:   options.body
          },
          (error, response, body) => {
            if (error) {
              return reject(new Error('Failed to make the request: ' + error));
            }

            try {
              var result = JSON.parse(body);
            } catch (err) {
              return reject(new Error('Could not parse Pushover response'));
            }

            if (response.statusCode != 200) {
              return reject(new Error(result.errors[0]));
            }

            for (let i in APP_LIMITS_MAP) {
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
