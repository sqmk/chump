'use strict';

let Command = require('./Command');
let Message = require('../Message');
let _       = require('lodash');

/**
 * Send message command
 */
class SendMessage extends Command {
  /**
   * Constructor for command
   *
   * @param {Message} message Message
   */
  constructor(message) {
    super();

    Message.validateMessage(message);

    this.message = message;
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
      path:   'messages.json',
      query:  {
        'token': client.apiToken
      }
    };

    if (!_.isEmpty(this.message.user)) {
      options.query.user   = this.message.user.id;
      options.query.device = this.message.user.device;
    }

    // Add message options
    options.query = _(options.query)
      .assign({
        'message':   this.message.message,
        'html':      this.message.enableHtml,
        'title':     this.message.title,
        'url':       this.message.url,
        'url_title': this.message.urlTitle,
        'timestamp': this.message.timestamp
      })
      .omit(
        (value) => { return _.isUndefined(value) || _.isNull(value); }
      )
      .value()

    // Add priority options
    if (!_.isEmpty(this.message.priority)) {
      options.query = _.assign(options.query, this.message.priority.properties);
    }

    // Add sound options
    if (!_.isEmpty(this.message.sound)) {
      options.query.sound = this.message.sound.name;
    }

    return client.getTransport().sendRequest(options)
      .then(result => {
        return !_.isEmpty(result.receipt) ? result.receipt : null;
      });
  }
}

module.exports = SendMessage;
