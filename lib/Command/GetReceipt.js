'use strict';

let Command = require('./Command');
let Receipt = require('../Receipt');

/**
 * Get receipt command
 */
class GetReceipt extends Command {
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
      'method': 'GET',
      'path':   `receipts/${this.receipt}.json`,
      'query':  {
        'token': client.apiToken
      }
    };

    return client.getTransport().sendRequest(options)
      .then((result) => {
        return new Receipt(this.receipt, result);
      });
  }
}

module.exports = GetReceipt;
