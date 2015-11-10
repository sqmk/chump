'use strict';

let Command = require('./Command');
let Group   = require('../Group');
let User    = require('../User');

/**
 * Get group details command
 */
class GetGroupDetails extends Command {
  /**
   * Constructor for command
   *
   * @param {Group} group Group
   */
  constructor(group) {
    super();

    Group.validateGroup(group);

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
      method: 'GET',
      path:   `groups/${this.group.id}.json`,
      query:  {
        'token': client.apiToken
      }
    };

    return client.getTransport().sendRequest(options)
      .then(result => {
        let group = new Group(this.group.id);
        group.name = result.name;
        group.users = [];

        for (let i of result.users) {
          let user      = new User(i.user, i.device);
          user.memo     = i.memo;
          user.disabled = i.disabled;

          group.users.push(user);
        }

        return group;
      });
  }
}

module.exports = GetGroupDetails;
