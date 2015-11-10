'use strict';

let Command = require('./Command');

/**
 * Cancel emergency command
 */
class CancelEmergency extends Command {
  /**
   * Constructor for command
   *
   * @param {string} receipt Receipt
   */
  constructor(receipt) {
    super();

    this.receipt = receipt;
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
      path:   `receipts/${this.receipt}/cancel.json`,
      query: {
        'token': client.apiToken
      }
    };

    return client.getTransport().sendRequest(options)
      .then(result => {
        return result.status ? true : false;
      });
  }
}

module.exports = CancelEmergency;
