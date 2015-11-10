'use strict';

let Command = require('./Command');
let Group   = require('../Group');

/**
 * Rename group command
 */
class RenameGroup extends Command {
  /**
   * Constructor for command
   *
   * @param {Group}  group Group
   * @param {string} name  Name
   */
  constructor(group, name) {
    super();

    Group.validateGroup(group);

    this.group = group;
    this.name  = name;
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
      method: 'POST',
      path:   `groups/${this.group.id}/rename.json`,
      query:  {
        'token': client.apiToken,
        'name': this.name
      }
    };

    return client.getTransport().sendRequest(options)
      .then(result => {
        return true;
      });
  }
}

module.exports = RenameGroup;
