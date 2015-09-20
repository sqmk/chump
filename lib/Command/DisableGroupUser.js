'use strict';

let Command = require('./Command');
let Group   = require('../Group');
let User    = require('../User');
let _       = require('lodash');

/**
 * Disable group user command
 */
class DisableGroupUser extends Command {
  /**
   * Constructor for command
   *
   * @param {User}  user  User
   * @param {Group} group Group
   */
  constructor(user, group) {
    super();

    User.validateUser(user);
    Group.validateGroup(group);

    this.user  = user;
    this.group = group;
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
      'path':   `groups/${this.group.id}/disable_user.json`,
      'query':  {
        'token': client.apiToken,
        'user':  this.user.id
      }
    };

    return client.getTransport().sendRequest(options)
      .then((result) => {
        return true;
      });
  }
}

module.exports = DisableGroupUser;
