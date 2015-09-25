'use strict';

let Command = require('./Command');
let User    = require('../User');
let Group   = require('../Group');
let _       = require('lodash');

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

    validateUserOrGroup(user);

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
      .then(() => {
        return true;
      });
  }
}

/**
 * Validate user or group
 *
 * @param {mixed} user User or group
 */
function validateUserOrGroup(user) {
  if (user instanceof User) {
    return;
  }

  if (user instanceof Group) {
    return;
  }

  throw new Error('Expecting type user or group');
}

module.exports = VerifyUser;
