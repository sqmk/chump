'use strict';

var Command = require('./Command');
var User    = require('../User');
var _       = require('lodash');

/**
 * Verify user command
 */
class VerifyUser extends Command {
  /**
   * Constructor for command
   *
   * @param {User} user User
   */
  constructor(user) {
    super();

    User.validateUser(user);

    this.user = user;
  }

  /**
   * Invoke command
   *
   * @param {Client} client Client
   *
   * @return {Promise} Promise for chaining
   */
  invoke(client) {
    let options = {
      'method': 'POST',
      'path':   'users/validate.json',
      'query': {
        'token': client.apiToken,
        'user': this.user.id
      }
    };

    if (!_.isEmpty(this.user.deviceName)) {
      options.query.device = this.user.deviceName;
    }

    return client.getTransport().sendRequest(options)
      .then(() => { return true; });
  }
}

module.exports = VerifyUser;
